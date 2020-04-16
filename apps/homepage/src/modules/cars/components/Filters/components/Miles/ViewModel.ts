import { Store } from '../../../../store';
import { Filters, MaxAndMin } from '../../../../util';

export const range = { min: 0, max: 200000 };
const key = Filters.MILES;

class MilesViewModel {
  readonly resetButtonLabel: string = 'Reset';
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  onDone = (miles: MaxAndMin | undefined): void => {
    miles
      ? this.store.updateMinAndMax(key, miles)
      : this.store.resetFilter(Filters.MILES);
  };

  reset = (): void => {
    this.store.resetFilter(Filters.MILES);
  };

  getMilesFromUrl = (): { miles: string | undefined } => {
    const urlFilters = this.store.filtersDataFromUrl;
    const milesFromUrl =
      urlFilters && urlFilters[key] ? urlFilters[key] : undefined;
    const miles = milesFromUrl ? milesFromUrl.max.toString() : undefined;

    return { miles };
  };
}

export default MilesViewModel;
