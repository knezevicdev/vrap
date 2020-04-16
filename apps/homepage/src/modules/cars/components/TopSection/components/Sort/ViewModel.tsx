import { SortValue } from '../../../../util';

import { Store } from 'src/modules/cars/store';

class SortViewModel {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  getActiveState(): SortValue {
    const sort = this.store.filtersDataFromUrl?.sort;
    return sort ? sort : SortValue.DEFAULT;
  }

  getValues(): SortValue[] {
    return Object.values(SortValue);
  }

  updateURL(value: SortValue): void {
    this.store.updateSort(value);
  }
}

export default SortViewModel;
