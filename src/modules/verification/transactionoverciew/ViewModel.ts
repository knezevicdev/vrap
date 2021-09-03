import { Networker } from 'src/networking/Networker';
import Store from 'src/store';

export default class TransactionOverviewViewModel {
  readonly title: string = 'transaction summary';
  constructor(private store: Store, private network: Networker) {}

  async getVerificationDetail(priceId: string): Promise<void> {
    try {
      const data = await this.network.getVerificationDetails(priceId);
      console.log('data ', data);
    } catch (e) {
      console.log('error ', e);
    }
  }
}
