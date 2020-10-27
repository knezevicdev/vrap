import {
  addPopularFeature,
  Filters,
  PopularFeatures as FiltersDataPopularFeatures,
  removePopularFeature,
  resetFilters,
} from '@vroom-web/catalog-url-integration';

import { PopularFeature } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

class FeaturesViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';
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

  isResetButtonDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return true;
    }
    const filtersDataPopularFeatures = filtersData[Filters.POPULAR_FEATURES];
    return !filtersDataPopularFeatures;
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilters(
      [Filters.POPULAR_FEATURES],
      filtersData
    );
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default FeaturesViewModel;
