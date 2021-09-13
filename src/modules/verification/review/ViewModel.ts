import { Networker } from 'src/networking/Networker';
import Store from 'src/store';

export default class VerificationReviewSectionViewModel {
  readonly title: string = 'transaction summary';
  readonly submitBtn: string = 'SUBMIT MY INFORMATION';
  constructor(private store: Store, private network: Networker) {}

  async getVerificationDetail(priceId: string): Promise<void> {
    try {
      const response = await this.network.getVerificationDetails(priceId);
      this.store.verification.getVerificationDetail(response.data.data);
    } catch (e) {
      console.log('error in verfication');
    }
  }
}
