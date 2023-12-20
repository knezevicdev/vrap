import { isErrorResponse } from '@vroom-web/networking';
import { isEqual } from 'lodash';
import { create } from 'zustand';

import { Verification } from '../../../networking/models/Price';
import {
  getOfferDetails,
  getVerificationDetails,
  postVerification,
} from '../../../networking/request';
import getVehiclePhotos from '../utils/getVehiclePhotos';
import createDocumentsVerificationSlice, {
  DocumentsVerificationState,
} from './documentsVerification';
import createLoanVerificationSlice, {
  LoanVerificationState,
} from './loanVerification';
import createOwnerVerificationSlice, {
  OwnerVerificationState,
} from './ownerVerification';
import createPaymentSlice, { PaymentState } from './payment';
import createPhotosVerificationSlice, {
  PhotosVerificationState,
} from './photosVerification';
import createPickupVerificationSlice, {
  PickupVerificationState,
} from './pickupVerification';

export type VerificationState = OwnerVerificationState &
  PickupVerificationState &
  LoanVerificationState &
  DocumentsVerificationState &
  PhotosVerificationState &
  PaymentState & {
    priceId: string;
    vin: string;
    offerFirstName: string;
    offerLastName: string;
    offerPhone: string;
    offerEmail: string;
    offer: number;
    offerZip: string;
    offerGrade: string;
    formState: number;
    completed: boolean;
    finalPayment: number | null;
    offerPrice: number;
    verificationEmail: string;
    loadState: (priceId: string) => Promise<boolean>;
    isLoading: boolean;
    setLoading(loading: boolean): void;
  };

const yesNoOrEmptyString = (value: null | boolean) => {
  if (value === null) return '';
  return value ? 'Yes' : 'No';
};

const useVerificationStore = create<VerificationState>()((...a) => ({
  ...createOwnerVerificationSlice(...a),
  ...createPickupVerificationSlice(...a),
  ...createLoanVerificationSlice(...a),
  ...createDocumentsVerificationSlice(...a),
  ...createPhotosVerificationSlice(...a),
  ...createPaymentSlice(...a),
  priceId: '',
  vin: '',
  offerFirstName: '',
  offerLastName: '',
  offerPhone: '',
  offerEmail: '',
  offer: 0,
  offerZip: '',
  offerGrade: '',
  formState: 0,
  completed: false,
  finalPayment: null,
  offerPrice: 0,
  verificationEmail: '',
  isLoading: false,
  setLoading: (loading: boolean) => {
    const set = a[0];
    set({ isLoading: loading });
  },
  loadState: async (priceId: string) => {
    const set = a[0];

    const offerDetailsResponse = await getOfferDetails(priceId);
    if (isErrorResponse(offerDetailsResponse)) return false;
    const offerDetails = offerDetailsResponse.data.data?.[0];
    if (!offerDetails) return false;

    const offerExpirationTime = new Date(offerDetails.Good_Until__c).getTime();
    if (offerExpirationTime < new Date().getTime()) return false;

    let verificationDetails: Verification | undefined;
    const vin = offerDetails?.VIN__c;

    set((state) => ({
      ...state,
      priceId,
      vin,
      offerFirstName: offerDetails.first_name,
      offerLastName: offerDetails.last_name,
      offerPhone: offerDetails.phone,
      offerEmail: offerDetails.user_email,
      offer: offerDetails.Price__c,
      offerZip: offerDetails.zipcode,
      offerGrade: offerDetails.grade,
    }));

    try {
      const [verificationDetailsResponse, vehiclePhotos] = await Promise.all([
        getVerificationDetails(priceId),
        getVehiclePhotos(vin, priceId),
      ]);
      if (!isErrorResponse(verificationDetailsResponse)) {
        verificationDetails = verificationDetailsResponse.data.data;
      } else {
        const errorMessage =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          verificationDetailsResponse?.error?.response?.data?.error?.details[0]
            ?.message;

        if (errorMessage === 'form not found') {
          const postRes = await postVerification(priceId);
          if (!isErrorResponse(postRes)) return true;
        }
        return false;
      }

      set((state) => ({
        ...state,
        photosDriverSide: vehiclePhotos.driverSideExterior || '',
        photosPassengerSide: vehiclePhotos.passengerSideExterior || '',
        photosFront: vehiclePhotos.front || '',
        photosBack: vehiclePhotos.back || '',
        photosDash: vehiclePhotos.dashCluster || '',
        photosFrontSeat: vehiclePhotos.driverSideFrontSeat || '',
      }));
    } catch (e) {
      return false;
    }

    if (!verificationDetails) return true;

    if (verificationDetails.form_state >= 4) {
      set((state) => ({
        ...state,
        completed: true,
        finalPayment: verificationDetails?.poq?.final_payment || null,
        offerPrice: verificationDetails?.offer_price || 0,
      }));
      return true;
    }

    const loanState = localStorage.getItem('whereIsVehicleRegistered') || '';

    let secondOwnerConfirmation = '';
    if (verificationDetails.owners_on_title > 0) {
      secondOwnerConfirmation =
        verificationDetails.owners_on_title > 1 ? 'Yes' : 'No';
    }

    const localPriceId = localStorage.getItem('priceId');
    if (localPriceId !== priceId || !verificationDetails.payment_submitted) {
      localStorage.removeItem('paymentSubmittedType');
    }
    if (localPriceId !== priceId) {
      localStorage.removeItem('lastFourSSN');
    }

    let paymentSubmittedType =
      localStorage.getItem('paymentSubmittedType') || '';
    const lastFourSSN = localStorage.getItem('lastFourSSN') || '';

    if (!paymentSubmittedType && verificationDetails.payment_submitted) {
      paymentSubmittedType = 'Payment method submitted';
    }

    const isSecondOwnerAddressSameAsFirstOwner =
      Object.values(verificationDetails.owner_mailing_address).filter((v) => v)
        .length >= 4 &&
      isEqual(
        verificationDetails.owner_mailing_address,
        verificationDetails.second_owner_mailing_address
      );

    set((state) => {
      if (!verificationDetails) return state;

      return {
        ...state,
        formState: verificationDetails.form_state,
        firstOwnerState: verificationDetails.owner_mailing_address.state || '',
        firstOwnerZip: verificationDetails.owner_mailing_address.zipcode || '',
        firstOwnerCity: verificationDetails.owner_mailing_address.city || '',
        firstOwnerApt:
          verificationDetails.owner_mailing_address.address_2 || '',
        firstOwnerAddress:
          verificationDetails.owner_mailing_address.address_1 || '',
        firstOwnerFirstName: verificationDetails.owner_first_name,
        firstOwnerMiddleName: verificationDetails.owner_middle_name || '',
        firstOwnerLastName: verificationDetails.owner_last_name,
        firstOwnerPhoneNumber: verificationDetails.owner_phone_number,
        firstOwnerEmail: verificationDetails.owner_email_address,
        firstOwnerConfirmation: yesNoOrEmptyString(
          verificationDetails.is_owner
        ),
        secondOwnerConfirmation,
        secondOwnerState:
          verificationDetails.second_owner_mailing_address.state || '',
        secondOwnerZip:
          verificationDetails.second_owner_mailing_address.zipcode || '',
        secondOwnerCity:
          verificationDetails.second_owner_mailing_address.city || '',
        secondOwnerApt:
          verificationDetails.second_owner_mailing_address.address_2 || '',
        secondOwnerAddress:
          verificationDetails.second_owner_mailing_address.address_1 || '',
        secondOwnerFirstName: verificationDetails.second_owner_first_name || '',
        secondOwnerMiddleName:
          verificationDetails.second_owner_middle_name || '',
        secondOwnerLastName: verificationDetails.second_owner_last_name || '',
        secondOwnerPhoneNumber:
          verificationDetails.second_owner_phone_number || '',
        secondOwnerEmail: verificationDetails.second_owner_email_address || '',
        isSecondOwnerAddressSameAsFirstOwner,
        pickupAddressConfirmation: yesNoOrEmptyString(
          verificationDetails.same_mailing_address
        ),
        pickupContactConfirmation: yesNoOrEmptyString(
          verificationDetails.same_contact_as_owner
        ),
        pickupState: verificationDetails.pickup_address.state || '',
        pickupZip: verificationDetails.pickup_address.zipcode || '',
        pickupCity: verificationDetails.pickup_address.city || '',
        pickupApt: verificationDetails.pickup_address.address_2 || '',
        pickupAddress: verificationDetails.pickup_address.address_1 || '',
        pickupContactFirstName: verificationDetails.pickup_contact_first_name,
        pickupContactLastName: verificationDetails.pickup_contact_last_name,
        pickupContactPhoneNumber:
          verificationDetails.pickup_contact_phone_number,
        pickupContactEmail: verificationDetails.pickup_contact_email,
        loanConfirmation: yesNoOrEmptyString(
          verificationDetails.current_payments
        ),
        loanInstitution: verificationDetails.lien_financial_institution_name,
        loanPhoneNumber: verificationDetails.financial_institution_phone,
        loanAccountNumber: verificationDetails.lien_account_number || '',
        loanLastFourDigits: lastFourSSN,
        loanInstitutionId: verificationDetails.lender_id || '',
        loanName: verificationDetails.lender_name || '',
        loanState: verificationDetails.loan_state || loanState,
        loanAcknowledgement: verificationDetails.acknowledgement_of_terms,
        documentDriverLicenseFront:
          verificationDetails.front_of_driver_license_file_id || '',
        documentDriverLicenseBack:
          verificationDetails.back_of_driver_license_file_id || '',
        documentSecondDriverLicenseFront:
          verificationDetails.second_owner_front_of_driver_license_file_id ||
          '',
        documentSecondDriverLicenseBack:
          verificationDetails.second_owner_back_of_driver_license_file_id || '',
        documentVehicleRegistration:
          verificationDetails.current_registration_file_id || '',
        documentTitleFront:
          verificationDetails.front_of_title_lien_file_id || '',
        documentTitleBack: verificationDetails.back_of_title_lien_file_id || '',
        documentReleaseLetter:
          verificationDetails.lien_release_letter_file_id || '',
        documentOdometer: verificationDetails.mileage_file_id || '',
        documentMileageValue: verificationDetails.exact_mileage || 0,
        verificationEmail: verificationDetails?.email || '',
        paymentSubmittedType,
      };
    });

    return true;
  },
}));

export default useVerificationStore;
