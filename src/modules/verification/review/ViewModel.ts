import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';
import { isErrorResponse } from '@vroom-web/networking';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PatchReview } from 'src/networking/models/Verification';
import {
  getOfferDetails,
  getVerificationDetails,
} from 'src/networking/request';
import { patchVerification } from 'src/networking/request';
import Store from 'src/store';

export default class VerificationReviewSectionViewModel {
  readonly defaultValues = {
    paymentOption: '',
    routingNumber: '',
    bankAccountNumber: '',
    isPrimaryAddress: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipcode: '',
  };
  readonly mailAddress = {
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zipcode: '',
  };
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(private store: Store, private absmartly: ABSmartlyContextValue) {}

  onPageLoad(): void {
    this.analyticsHandler.trackVerificationReviewViewed();
  }

  getAnalyticHandler(): AnalyticsHandler {
    return this.analyticsHandler;
  }

  createVerificationPayload = (): PatchReview => {
    const { verificationDetail } = this.store.verification;

    const payload: PatchReview = {
      form_state: 5,
      offer_id: verificationDetail?.offer_id,
      is_owner: verificationDetail?.is_owner,
      owner_first_name: verificationDetail?.owner_first_name,
      owner_last_name: verificationDetail?.owner_last_name,
      owner_mailing_address: verificationDetail?.owner_mailing_address,
      owner_phone_number: verificationDetail?.owner_phone_number,
      owner_email_address: verificationDetail?.owner_email_address,
      owners_on_title: verificationDetail?.owners_on_title,
      second_owner_first_name: verificationDetail?.second_owner_first_name,
      second_owner_last_name: verificationDetail?.second_owner_last_name,
      second_owner_mailing_address:
        verificationDetail?.second_owner_mailing_address,
      second_owner_phone_number: verificationDetail?.second_owner_phone_number,
      second_owner_email_address:
        verificationDetail?.second_owner_email_address,
      same_mailing_address: verificationDetail?.same_mailing_address,
      pickup_address: verificationDetail?.pickup_address,
      same_contact_as_owner: verificationDetail?.same_contact_as_owner,
      pickup_contact_first_name: verificationDetail?.pickup_contact_first_name,
      pickup_contact_last_name: verificationDetail?.pickup_contact_last_name,
      pickup_contact_phone_number:
        verificationDetail?.pickup_contact_phone_number,
      pickup_contact_email: verificationDetail?.pickup_contact_email,
      current_payments: verificationDetail?.current_payments,
      lien_financial_institution_name:
        verificationDetail?.lien_financial_institution_name,
      financial_institution_phone:
        verificationDetail?.financial_institution_phone,
      lien_account_number: verificationDetail?.lien_account_number,
      last_four_ssn: verificationDetail?.last_four_ssn,
      acknowledgement_of_terms: verificationDetail?.acknowledgement_of_terms,
      exact_mileage: verificationDetail?.exact_mileage,
      mileage_file_id: verificationDetail?.mileage_file_id,
      front_of_title_lien_file_id:
        verificationDetail?.front_of_title_lien_file_id,
      back_of_title_lien_file_id:
        verificationDetail?.back_of_title_lien_file_id,
      front_of_driver_license_file_id:
        verificationDetail?.front_of_driver_license_file_id,
      back_of_driver_license_file_id:
        verificationDetail?.back_of_driver_license_file_id,
      second_owner_front_of_driver_license_file_id:
        verificationDetail?.second_owner_front_of_driver_license_file_id,
      second_owner_back_of_driver_license_file_id:
        verificationDetail?.second_owner_back_of_driver_license_file_id,
      current_registration_file_id:
        verificationDetail?.current_registration_file_id,
      lien_release_letter_file_id:
        verificationDetail?.lien_release_letter_file_id,
    };

    return payload;
  };

  async verificationSubmit(): Promise<void> {
    const payload = this.createVerificationPayload();
    const data = {
      source: 'vroom.com',
      version: '1',
      timestamp: new Date().toISOString(),
      payload,
    };
    try {
      const verificationResponse = await patchVerification(data);
      if (isErrorResponse(verificationResponse)) throw verificationResponse;

      const responseData = verificationResponse.data.data;
      const { owner_email_address, owner_first_name, offer_price, poq } =
        responseData;

      const finalPayment =
        poq !== null && poq.final_payment ? poq.final_payment : null;

      this.analyticsHandler.trackVerificationSubmitted(
        owner_email_address,
        owner_first_name
      );

      localStorage.removeItem('review_payment_values');
      localStorage.removeItem('review_payment_type');

      const priceId =
        this.store.verification.priceId || localStorage.getItem('priceId');

      if (finalPayment !== null) {
        if (finalPayment > 0) {
          window.location.href = `/appraisal/paymentmethod?priceId=${priceId}`;
        } else {
          window.location.href = '/appraisal/congratulations';
        }
      } else {
        if (offer_price && offer_price > 0) {
          window.location.href = `/appraisal/paymentmethod?priceId=${priceId}`;
        } else {
          window.location.href = '/appraisal/congratulations';
        }
      }
    } catch (err) {
      this.store.verification.setLoading(false);
    }
  }

  setWhereIsVehicleRegistered(value: string): void {
    this.store.verification.setWhereIsVehicleRegistered(value);
  }

  isVehiclePhotosExp = (): boolean => {
    return this.absmartly.isInExperiment(
      'verification-form-vehicle-photo-upload'
    );
  };

  async getVerificationDetails(
    priceId: string,
    lastFourSSN: string
  ): Promise<void> {
    try {
      const [verificationDetailsResponse, offerDetailsResponse] =
        await Promise.all([
          getVerificationDetails(priceId),
          getOfferDetails(priceId),
        ]);
      if (isErrorResponse(verificationDetailsResponse))
        throw verificationDetailsResponse;
      if (isErrorResponse(offerDetailsResponse)) throw offerDetailsResponse;
      this.store.verification.setLastFourSSN(lastFourSSN);
      this.store.verification.getVerificationDetail(
        {
          ...verificationDetailsResponse.data.data,
          vin: offerDetailsResponse.data.data[0].VIN__c,
        },
        lastFourSSN
      );
    } catch (e) {
      console.log('error in verfication');
    }
  }
}
