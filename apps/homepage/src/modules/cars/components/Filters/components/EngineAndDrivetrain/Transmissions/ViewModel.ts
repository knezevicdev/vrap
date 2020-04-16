import { Store } from '../../../../../store';
import { Filters, Transmission } from '../../../../../util';

class TransmissionsViewModel {
  readonly resetButtonLabel: string = 'Reset';
  readonly values = [Transmission.ALL, Transmission.AUTO, Transmission.MANUAL];
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  getActiveTransmission = (): string => {
    /*
      TODO
      Add to filters state and update that way. 
     */
    return this.store.filtersDataFromUrl &&
      (this.store.filtersDataFromUrl[Filters.TRANSMISSION] === 0 ||
        this.store.filtersDataFromUrl[Filters.TRANSMISSION] === 1)
      ? (this.store.filtersDataFromUrl[Filters.TRANSMISSION] as number) === 0
        ? Transmission.AUTO
        : Transmission.MANUAL
      : Transmission.ALL;
  };

  handleClick = (transmission: Transmission): void => {
    this.store.updateTransmission(transmission);
  };
}

export default TransmissionsViewModel;
