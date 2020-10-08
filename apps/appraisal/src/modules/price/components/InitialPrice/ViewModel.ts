import { PriceStore } from 'src/modules/price/store';

class InitialPriceViewModel {
  readonly yourPrice: string = 'your price';
  readonly continuePrice: string = 'continue';
  readonly offerExpPreDate: string = 'This price expires on ';
  readonly offerExpPostDate: string = ' or upon hitting ';
  readonly miles: string = '250 miles';
  readonly price: number = 0;
  readonly goodUntil: string = '';

  constructor(initialPriceState: PriceStore) {
    this.price = initialPriceState.price;
    this.goodUntil = initialPriceState.goodUntil;
  }
}

export default InitialPriceViewModel;
