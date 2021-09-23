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
    const { verificationDetail } = this.store.verification;
    const firstName = verificationDetail?.owner_first_name || '';
    const email = verificationDetail?.owner_email_address || '';
    this.analyticsHandler.trackVerificationSubmitted(email, firstName);
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
    console.log('verificationResponse ', verificationResponse);
  };
  async getVerificationDetail(priceId: string): Promise<void> {
    try {
      const response = await getVerificationDetails(priceId);
      if (isErrorResponse(response)) throw response;

      this.store.verification.getVerificationDetail(response.data.data);
    } catch (e) {
      console.log('error in verfication');
    }
  }
}
