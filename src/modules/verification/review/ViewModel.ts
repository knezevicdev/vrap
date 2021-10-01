import { isErrorResponse } from '@vroom-web/networking';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
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
