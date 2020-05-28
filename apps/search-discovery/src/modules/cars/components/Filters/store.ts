import { action, IObservableArray, observable } from 'mobx';

import { Filter } from 'src/modules/cars/utils/types';

class FiltersStore {
  readonly filters: IObservableArray<{
    display: Filter;
    open: boolean;
  }> = observable([
    {
      display: Filter.MAKE_AND_MODEL,
      open: true,
    },
    {
      display: Filter.BODY_TYPE,
      open: false,
    },
    {
      display: Filter.COLOR,
      open: false,
    },
    {
      display: Filter.YEAR,
      open: false,
    },
    {
      display: Filter.PRICE,
      open: false,
    },
    {
      display: Filter.MILES,
      open: false,
    },
    {
      display: Filter.ENGINE_AND_DRIVETRAIN,
      open: false,
    },
  ]);

  @action
  toggleVisibility = (display: Filter): void => {
    const filter = this.filters.find(f => f.display === display);
    if (filter) {
      filter.open = !filter.open;
    }
  };
}

export default FiltersStore;
