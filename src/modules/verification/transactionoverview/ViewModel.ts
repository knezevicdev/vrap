import { isErrorResponse } from '@vroom-web/networking';

import { Prices } from 'src/networking/models/Price';
import { getOfferDetails } from 'src/networking/request';
import Store from 'src/store';

const defaultOfferData = {
  make: '',
  model: '',
  price: 0,
  trim: '',
  year: 0,
  miles: 0,
  offerExpiration: '',
  vin: '',
};

export default class TransactionOverviewViewModel {
  readonly title: string = 'transaction summary';
  constructor(private store: Store) {}

  async getOfferDetail(priceId: string): Promise<void> {
    try {
      const response = await getOfferDetails(priceId);

      if (isErrorResponse(response)) throw response;

      const data: Prices = response.data;
      const offerDetail = data.data[0];

      const offerDetailData = {
        make: offerDetail.Make__c,
        model: offerDetail.Model__c,
        price: offerDetail.Price__c,
        trim: offerDetail.Trim__c,
        year: offerDetail.Year__c,
        miles: offerDetail.miles,
        offerExpiration: offerDetail.Good_Until__c,
        vin: offerDetail.VIN__c,
      };

      this.store.offer.getOfferDetail(offerDetailData);
      this.store.offer.setLoading(false);
    } catch (e) {
      this.store.offer.getOfferDetail(defaultOfferData);
      this.store.offer.setLoading(false);
    }
  }
}
