import { isErrorResponse } from '@vroom-web/networking';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { submitPaymentOption } from 'src/modules/options/store';
import { PatchReview } from 'src/networking/models/Verification';
import {
  getVerificationDetails,
  postPlaidPayment,
} from 'src/networking/request';
import { patchVerification } from 'src/networking/request';
import Store from 'src/store';

export default class VerificationReviewSectionViewModel {
  readonly title: string = 'review your information';
  readonly submitBtn: string = 'SUBMIT MY INFORMATION';
  readonly reviewVerification: string =
    'I acknowledge that all information provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate.';
  readonly verificationWarning: string =
    'By clicking "Submit My Information," you acknowledge that all the information you provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate.';
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

  constructor(private store: Store) {}

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

  async submitPayment(): Promise<void> {
    const { payment } = this.store;
    const values = payment.values || this.defaultValues;
    const priceId = payment.priceId || '';
    const address = payment.address || this.mailAddress;
    await submitPaymentOption(values, priceId, address);

    if (payment.values?.paymentOption !== 'Check by Mail') {
      payment.setSubmitType('Manual ACH');
      this.analyticsHandler.trackManualACHSelected();
    } else {
      payment.setSubmitType('Check');
      this.analyticsHandler.trackCheckSelected();
    }
    const submittedType = payment.submittedType || '';
    this.analyticsHandler.trackPaymentOptionsSubmitted(submittedType);
  }

  async handlePlaidSubmit(): Promise<void> {
    const mutationInput = this.store.deposit.mutationInput || {
      Account: {
        Id: '',
        Mask: '',
        Name: '',
        Subtype: '',
        Type: '',
      },
      Email: '',
      Institution: {
        Id: '',
        Name: '',
      },
      PublicToken: '',
      ReferenceId: '',
      Source: '',
    };
    try {
      const plaidPaymentRes = await postPlaidPayment(mutationInput);
      if (isErrorResponse(plaidPaymentRes)) {
        this.store.option.setPlaidSubmitting(false);
        throw plaidPaymentRes;
      }
      this.analyticsHandler.trackPaymentOptionsSubmitted('Plaid ACH');
      this.analyticsHandler.trackPlaidACHSelected();
      localStorage.removeItem('linkToken');
      localStorage.removeItem('priceId');
    } catch (err) {
      this.store.option.setPlaidSubmitting(false);
      console.log(JSON.stringify(err));
    }
  }

  async verificationSubmit(): Promise<void> {
    const { deposit } = this.store;
    const payload = this.createVerificationPayload();
    const data = {
      source: 'vroom.com',
      version: '1',
      timestamp: new Date().toISOString(),
      payload,
    };
    const verificationResponse = await patchVerification(data);
    if (isErrorResponse(verificationResponse)) throw verificationResponse;

    if (this.isPaymentRequireExp() && deposit.mutationInput) {
      await this.handlePlaidSubmit();
    }
    if (this.isPaymentRequireExp() && !deposit.mutationInput) {
      await this.submitPayment();
    }

    const responseData = verificationResponse.data.data;
    const {
      owner_email_address,
      owner_first_name,
      offer_price,
      poq,
    } = responseData;

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
    if (this.isPaymentRequireExp()) {
      window.location.href = '/appraisal/congratulations';
      return;
    }

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
  }

  setWhereIsVehicleRegistered(value: string): void {
    this.store.verification.setWhereIsVehicleRegistered(value);
  }

  isPaymentRequireExp = (): boolean => {
    return this.store.absmart.isInExperiment('ac-payment-required');
  };

  async getVerificationDetails(
    priceId: string,
    lastFourSSN: string
  ): Promise<void> {
    try {
      const response = await getVerificationDetails(priceId);
      if (isErrorResponse(response)) throw response;
      this.store.verification.setLastFourSSN(lastFourSSN);
      this.store.verification.getVerificationDetail(
        response.data.data,
        lastFourSSN
      );
    } catch (e) {
      console.log('error in verfication');
    }
  }
}
