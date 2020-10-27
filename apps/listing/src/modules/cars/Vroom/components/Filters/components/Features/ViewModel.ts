import {
  addPopularFeature,
  Filters,
  PopularFeatures as FiltersDataPopularFeatures,
  removePopularFeature,
} from '@vroom-web/catalog-url-integration';

import { PopularFeature } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

class FeaturesViewModel {
  private readonly carsStore: CarsStore;

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getPopularFeatures = (): PopularFeature[] => {
    return this.carsStore.popularFeatures;
  };

  isChecked = (popularFeature: PopularFeature): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return false;
    }
    const filtersDataDriveType = filtersData[Filters.POPULAR_FEATURES];
    if (!filtersDataDriveType) {
      return false;
    }
    return filtersDataDriveType.includes(popularFeature.filtersDataValue);
  };

  handleCheckboxChange(
    filtersDataValue: FiltersDataPopularFeatures,
    checked: boolean
  ): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = checked
      ? addPopularFeature(filtersDataValue, filtersData)
      : removePopularFeature(filtersDataValue, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default FeaturesViewModel;
