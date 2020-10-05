import { PriceStoreState } from 'src/modules/price/store';

class PriceViewModel {
  readonly yourPrice: string = 'your price';
  readonly continuePrice: string = 'continue';

  readonly priceStatus: string;
  readonly price: number;

  constructor(initialState: PriceStoreState) {
    this.priceStatus = initialState.priceStatus;
    this.price = initialState.price;
  }
}

export default PriceViewModel;
