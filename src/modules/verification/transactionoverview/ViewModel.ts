import { Networker } from 'src/networking/Networker';
import Store from 'src/store';

export default class TransactionOverviewViewModel {
  readonly title: string = 'transaction summary';
  constructor(private store: Store, private network: Networker) {}

  async getOfferDetail(priceId: string): Promise<void> {
    try {
      const response = await this.network.getOfferDetails(priceId);
      const data = response.data.data[0];
      const offerDetailData = {
        make: data.Make__c,
        model: data.Model__c,
        price: data.Price__c,
        trim: data.Trim__c,
        year: data.Year__c,
        miles: data.miles,
      };
      this.store.offer.getOfferDetail(offerDetailData);
      this.store.offer.setLoading(false);
    } catch (e) {
      console.log('error offer detail');
    }
  }
}
