import { Filters, FiltersData } from '@vroom-web/catalog-url-integration';

import { Sort } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

class SortViewModel {
  private readonly carsStore: CarsStore;

  readonly nonSortDisplay = 'Recommended';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getActiveSortValue(): string {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return this.nonSortDisplay;
    }
    const filtersDataSort = filtersData[Filters.SORT];
    if (!filtersDataSort) {
      return this.nonSortDisplay;
    }
    const matchingSort = this.carsStore.sorts.find(
      (s) =>
        s.filtersDataByValue === filtersDataSort.by &&
        s.filtersDataDirectionValue === filtersDataSort.direction
    );
    if (!matchingSort) {
      return this.nonSortDisplay;
    }
    return matchingSort.display;
  }

  getSorts(): Sort[] {
    return this.carsStore.sorts;
  }

  handleChange(sort?: Sort): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.SORT]: sort
        ? {
            by: sort.filtersDataByValue,
            direction: sort.filtersDataDirectionValue,
          }
        : undefined,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default SortViewModel;
