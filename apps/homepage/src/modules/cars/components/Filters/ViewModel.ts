import { action } from 'mobx';

import { Store } from '../../store';
import { FilterState } from '../../store/util';

class FiltersViewModel {
  private readonly store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  getFilterInfo = (key: string): FilterState => {
    return this.store.filters[key];
  };

  getFilterKeys = (): string[] => {
    return Object.keys(this.store.filters);
  };

  @action
  setFilterState = (key: string) => {
    this.store.filters[key].open = !this.store.filters[key].open;
  };
}

export default FiltersViewModel;
