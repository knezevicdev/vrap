import { isErrorResponse } from '@vroom-web/networking';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PatchReviewData } from 'src/networking/models/Verification';
import { getVerificationDetails } from 'src/networking/request';
import { patchVerification } from 'src/networking/request';
import Store from 'src/store';

export default class VerificationReviewSectionViewModel {
  readonly title: string = 'review your information';
  readonly submitBtn: string = 'SUBMIT MY INFORMATION';
  readonly reviewVerification: string =
    'I acknowledge that all information provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate.';
  readonly verificationWarning: string =
    'By clicking "Submit My Information," you acknowledge that all the information you provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate.';
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(private store: Store) {}

  onPageLoad = (): void => {
    this.analyticsHandler.trackVerificationReviewViewed();
  };

  createVerificationPayload = (reqBody: PatchReviewData): any => {
    const payload = {};
    const documents = reqBody.documents || [];

    // eslint-disable-next-line @typescript-eslint/camelcase
    payload.form_state = reqBody.formState;
    payload.offer_id = reqBody.offer_id;

    if (reqBody.ownerInfo) {
      let ownersOnTitle = 1;
      if (reqBody.ownerInfo.secondaryOwner === 'Yes') ownersOnTitle++;
      payload.is_owner =
        reqBody.ownerInfo.primaryOwner !== ''
          ? reqBody.ownerInfo.primaryOwner === 'Yes'
          : undefined;
      payload.owner_first_name = reqBody.ownerInfo.primaryFirst;
      payload.owner_last_name = reqBody.ownerInfo.primaryLast;

      if (!reqBody.ownerInfo.primaryAddress) {
        payload.owner_mailing_address = {
          city: reqBody.ownerInfo.primaryCity,
          state: reqBody.ownerInfo.primaryState,
          zipcode: reqBody.ownerInfo.primaryZip,
          address_1: reqBody.ownerInfo.primaryAddress,
          address_2: reqBody.ownerInfo.primaryApartment,
        };
      }

      payload.owner_phone_number = reqBody.ownerInfo.primaryPhone;
      payload.owner_email_address = reqBody.ownerInfo.primaryEmail;
      payload.owners_on_title = ownersOnTitle;
      payload.second_owner_first_name = reqBody.ownerInfo.secondaryFirst;
      payload.second_owner_last_name = reqBody.ownerInfo.secondaryLast;

      if (!reqBody.ownerInfo.secondaryAddress) {
        payload.second_owner_mailing_address = {
          city: reqBody.ownerInfo.secondaryCity,
          state: reqBody.ownerInfo.secondaryState,
          zipcode: reqBody.ownerInfo.secondaryZip,
          address_1: reqBody.ownerInfo.secondaryAddress,
          address_2: reqBody.ownerInfo.secondaryApartment,
        };
      }

      payload.second_owner_phone_number = reqBody.ownerInfo.secondaryPhone;
      payload.second_owner_email_address = reqBody.ownerInfo.secondaryEmail;
    }

    if (reqBody.pickupInfo) {
      payload.same_mailing_address =
        reqBody.pickupInfo.primaryPickup !== ''
          ? reqBody.pickupInfo.primaryPickup === 'Yes'
          : undefined;

      if (!reqBody.pickupInfo.pickupAddress) {
        payload.pickup_address = {
          city: reqBody.pickupInfo.pickupCity,
          state: reqBody.pickupInfo.pickupState,
          zipcode: reqBody.pickupInfo.pickupZip,
          address_1: reqBody.pickupInfo.pickupAddress,
          address_2: reqBody.pickupInfo.pickupApartment,
        };
      }

      payload.same_contact_as_owner =
        reqBody.pickupInfo.poc !== ''
          ? reqBody.pickupInfo.poc === 'Yes'
          : undefined;
      payload.pickup_contact_first_name = reqBody.pickupInfo.pocFirst;
      payload.pickup_contact_last_name = reqBody.pickupInfo.pocLast;
      payload.pickup_contact_phone_number = reqBody.pickupInfo.pocPhone;
      payload.pickup_contact_email = reqBody.pickupInfo.pocEmail;
    }

    if (reqBody.payoffInfo) {
      payload.current_payments =
        reqBody.payoffInfo.currentPayments !== ''
          ? reqBody.payoffInfo.currentPayments === 'Yes'
          : undefined;

      const { bankName, lienFinancialInstitutionName } = reqBody.payoffInfo;
      if (bankName && bankName.value !== 'Other') {
        payload.lien_financial_institution_name = bankName.value;
      } else {
        payload.lien_financial_institution_name = lienFinancialInstitutionName;
      }

      payload.financial_institution_phone = reqBody.payoffInfo.bankPhoneNumber;
      payload.lien_account_number = reqBody.payoffInfo.loanAccountNumber;
      payload.last_four_ssn = reqBody.payoffInfo.lastFourSSN;
      payload.acknowledgement_of_terms = reqBody.payoffInfo.termsCheckbox;
    }

    payload.exact_mileage = reqBody.exactMileage;

    const odo = documents.find(
      (doc) => doc.fileType === 'odometer-information'
    );
    const titleFront = documents.find(
      (doc) => doc.fileType === 'title-information-front'
    );
    const titleBack = documents.find(
      (doc) => doc.fileType === 'title-information-back'
    );
    const driverFront = documents.find(
      (doc) => doc.fileType === 'drivers-license-front'
    );
    const driverBack = documents.find(
      (doc) => doc.fileType === 'drivers-license-back'
    );
    const secondDriverFront = documents.find(
      (doc) => doc.fileType === 'second-drivers-license-front'
    );
    const secondDriverBack = documents.find(
      (doc) => doc.fileType === 'second-drivers-license-back'
    );
    const reg = documents.find((doc) => doc.fileType === 'registration');
    const lienRelease = documents.find(
      (doc) => doc.fileType === 'lien-release-letter'
    );

    if (odo) {
      payload.mileage_file_id = odo.id;
    }

    if (titleFront) {
      payload.front_of_title_lien_file_id = titleFront.id;
    }

    if (titleBack) {
      payload.back_of_title_lien_file_id = titleBack.id;
    }

    if (driverFront) {
      payload.front_of_driver_license_file_id = driverFront.id;
    }

    if (driverBack) {
      payload.back_of_driver_license_file_id = driverBack.id;
    }

    if (secondDriverFront) {
      payload.second_owner_front_of_driver_license_file_id =
        secondDriverFront.id;
    }

    if (secondDriverBack) {
      payload.second_owner_back_of_driver_license_file_id = secondDriverBack.id;
    }

    if (reg) {
      payload.current_registration_file_id = reg.id;
    }

    if (lienRelease) {
      payload.lien_release_letter_file_id = lienRelease.id;
    }

    return payload;
  };

  verificationSubmit = async (): Promise<void> => {
    const payload = {
      ownerInfo: this.store.verification.ownerInfo,
      pickupInfo: this.store.verification.pickupInfo,
      payoffInfo: this.store.verification.payoffInfo,
      documents: this.store.verification.documents,
      exactMileage: this.store.verification.exactMileage,
      formState: 5,
      // eslint-disable-next-line @typescript-eslint/camelcase
      offer_id: this.store.verification.offerId,
    };
    // const convertData = this.createVerificationPayload(payload);
    const verificationResponse = await patchVerification(payload);
    if (isErrorResponse(verificationResponse)) throw verificationResponse;

    const responseData = verificationResponse.data;
    const finalPayment = responseData.poq.final_payment || {};
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { owner_email_address, owner_first_name } = responseData;
    this.analyticsHandler.trackVerificationSubmitted(
      owner_email_address,
      owner_first_name
    );
    const priceId =
      this.store.verification.priceId || localStorage.getItem('priceId');
    const offerDetail = this.store.offer.offerDetail;
    if (finalPayment !== null) {
      if (finalPayment > 0) {
        window.location.href = `/appraisal/paymentmethod?priceId=${priceId}`;
      } else {
        window.location.href = '/appraisal/congratulations';
      }
    } else {
      if (offerDetail && offerDetail.price > 0) {
        window.location.href = `/appraisal/paymentmethod?priceId=${priceId}`;
      } else {
        window.location.href = '/appraisal/congratulations';
      }
    }
  };

  setWhereIsVehicleRegistered(value: string): void {
    this.store.verification.setWhereIsVehicleRegistered(value);
  }

  async getVerificationDetails(priceId: string): Promise<void> {
    try {
      const response = await getVerificationDetails(priceId);
      if (isErrorResponse(response)) throw response;

      this.store.verification.getVerificationDetail(response.data.data);
    } catch (e) {
      console.log('error in verfication');
    }
  }
}
