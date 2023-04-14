import { isErrorResponse } from '@vroom-web/networking';
import { create } from 'zustand';

import { Verification } from '../../../../networking/models/Price';
import {
  getOfferDetails,
  getVerificationDetails,
  postVerification,
} from '../../../../networking/request';
import getVehiclePhotos from '../utils/getVehiclePhotos';
import handleVerificationCompleted from '../utils/handleVerificationCompleted';
import createDocumentsVerificationSlice, {
  DocumentsVerificationState,
} from './documentsVerification';
import createLoanVerificationSlice, {
  LoanVerificationState,
} from './loanVerification';
import createOwnerVerificationSlice, {
  OwnerVerificationState,
} from './ownerVerification';
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
  PhotosVerificationState & {
    priceId: string;
    vin: string;
    formState: number;
    loadState: (priceId: string) => Promise<boolean>;
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
  priceId: '',
  vin: '',
  formState: 0,
  loadState: async (priceId: string) => {
    const set = a[0];

    const response = await getOfferDetails(priceId);
    if (isErrorResponse(response)) return false;

    const offerExpirationTime = new Date(
      response.data.data?.[0].Good_Until__c
    ).getTime();
    if (offerExpirationTime < new Date().getTime()) return false;

    let verificationDetails: Verification | undefined;
    const vin = response.data.data?.[0].VIN__c;

    set((state) => ({
      ...state,
      priceId,
      vin,
    }));

    try {
      const [response, vehiclePhotos] = await Promise.all([
        getVerificationDetails(priceId),
        getVehiclePhotos(vin, priceId),
      ]);
      if (!isErrorResponse(response)) {
        verificationDetails = response.data.data;
      } else {
        const errorMessage =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          response?.error?.response?.data?.error?.details[0]?.message;
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

    if (verificationDetails.form_state === 5) {
      handleVerificationCompleted(
        verificationDetails.poq?.final_payment || null,
        verificationDetails.offer_price,
        priceId
      );
      return true;
    }

    const loanState = localStorage.getItem('whereIsVehicleRegistered') || '';

    let secondOwnerConfirmation = '';
    if (verificationDetails.owners_on_title > 0) {
      secondOwnerConfirmation =
        verificationDetails.owners_on_title > 1 ? 'Yes' : 'No';
    }

    set((state) => {
      if (!verificationDetails) return state;

      return {
        ...state,
        formState: verificationDetails.form_state,
        firstOwnerState: verificationDetails.owner_mailing_address.state,
        firstOwnerZip: verificationDetails.owner_mailing_address.zipcode,
        firstOwnerCity: verificationDetails.owner_mailing_address.city,
        firstOwnerApt: verificationDetails.owner_mailing_address.address_2,
        firstOwnerAddress: verificationDetails.owner_mailing_address.address_1,
        firstOwnerFirstName: verificationDetails.owner_first_name,
        firstOwnerLastName: verificationDetails.owner_last_name,
        firstOwnerPhoneNumber: verificationDetails.owner_phone_number,
        firstOwnerEmail: verificationDetails.owner_email_address,
        firstOwnerConfirmation: yesNoOrEmptyString(
          verificationDetails.is_owner
        ),
        secondOwnerConfirmation,
        secondOwnerState:
          verificationDetails.second_owner_mailing_address.state,
        secondOwnerZip:
          verificationDetails.second_owner_mailing_address.zipcode,
        secondOwnerCity: verificationDetails.second_owner_mailing_address.city,
        secondOwnerApt:
          verificationDetails.second_owner_mailing_address.address_2,
        secondOwnerAddress:
          verificationDetails.second_owner_mailing_address.address_1,
        secondOwnerFirstName: verificationDetails.second_owner_first_name,
        secondOwnerLastName: verificationDetails.second_owner_last_name,
        secondOwnerPhoneNumber: verificationDetails.second_owner_phone_number,
        secondOwnerEmail: verificationDetails.second_owner_email_address,
        pickupAddressConfirmation: yesNoOrEmptyString(
          verificationDetails.same_mailing_address
        ),
        pickupContactConfirmation: yesNoOrEmptyString(
          verificationDetails.same_contact_as_owner
        ),
        pickupState: verificationDetails.pickup_address.state,
        pickupZip: verificationDetails.pickup_address.zipcode,
        pickupCity: verificationDetails.pickup_address.city,
        pickupApt: verificationDetails.pickup_address.address_2,
        pickupAddress: verificationDetails.pickup_address.address_1,
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
        loanLastFourDigits: verificationDetails.last_four_ssn || '',
        loanInstitutionId: verificationDetails.lender_id || '',
        loanName: verificationDetails.lender_name || '',
        loanState,
        loanAcknowledgement: verificationDetails.acknowledgement_of_terms,
        documentDriverLicenseFront:
          verificationDetails.front_of_driver_license_file_id || '',
        documentSecondDriverLicenseFront:
          verificationDetails.second_owner_front_of_driver_license_file_id ||
          '',
        documentVehicleRegistration:
          verificationDetails.current_registration_file_id || '',
        documentTitleFront:
          verificationDetails.front_of_title_lien_file_id || '',
        documentTitleBack: verificationDetails.back_of_title_lien_file_id || '',
        documentReleaseLetter:
          verificationDetails.lien_release_letter_file_id || '',
        documentOdometer: verificationDetails.mileage_file_id || '',
        documentMileageValue: verificationDetails.exact_mileage || 0,
      };
    });

    return true;
  },
}));

export default useVerificationStore;
