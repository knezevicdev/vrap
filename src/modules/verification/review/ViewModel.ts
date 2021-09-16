import { isErrorResponse } from '@vroom-web/networking';

import { getVerificationDetails } from 'src/networking/request';
import Store from 'src/store';

export default class VerificationReviewSectionViewModel {
  readonly title: string = 'transaction summary';
  readonly submitBtn: string = 'SUBMIT MY INFORMATION';
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
