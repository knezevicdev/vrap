import { isErrorResponse } from '@vroom-web/networking';

import { getVerificationDetails } from 'src/networking/request';
import Store from 'src/store';

export default class VerificationReviewSectionViewModel {
  readonly title: string = 'review your information';
  readonly submitBtn: string = 'SUBMIT MY INFORMATION';
  readonly reviewVerification: string =
    'I acknowledge that all information provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate.';
  readonly verificationWarning: string =
    'By clicking "Submit My Information," you acknowledge that all the information you provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate.';
  constructor(private store: Store) {}

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
