import { PriceStoreState } from 'src/modules/price/store';

class PriceViewModel {
  readonly yourPrice: string = 'your price';
  readonly continuePrice: string = 'continue';
  readonly offerExpPreDate: string = 'This price expires on ';
  readonly offerExpPostDate: string = ' or upon hitting ';
  readonly miles: string = '250 miles';

  constructor(initialState: PriceStoreState) {
    this.priceStatus = initialState.priceStatus;
    this.price = initialState.price;
  }
}

export default PriceViewModel;
