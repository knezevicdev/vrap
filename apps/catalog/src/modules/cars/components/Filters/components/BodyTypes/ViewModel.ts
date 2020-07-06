import {
  addBodyType,
  BodyType as FiltersDataBodyType,
  Filters,
  removeBodyType,
  resetFilter,
} from '@vroom-web/catalog-url-integration';

import { BodyType } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

class BodyTypesViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getBodyTypes = (): BodyType[] => {
    return this.carsStore.bodyTypes;
  };

  handleListItemClick = (
    filtersDataValue: FiltersDataBodyType,
    isSelected: boolean
  ) => (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = isSelected
      ? removeBodyType(filtersDataValue, filtersData)
      : addBodyType(filtersDataValue, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  getItemInformation = (
    filtersDataValue: FiltersDataBodyType
  ): { isSelected: boolean; fontWeight: string } => {
    const filtersData = this.carsStore.filtersData;
    const filtersDataBodyTypes =
      filtersData && filtersData[Filters.BODY_TYPES]
        ? filtersData[Filters.BODY_TYPES]
        : undefined;
    const isSelected = filtersDataBodyTypes
      ? filtersDataBodyTypes.includes(filtersDataValue)
      : false;
    const fontWeight = isSelected ? 'fontWeightMedium' : 'fontWeightLight';
    return { isSelected, fontWeight };
  };

  isResetDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    const urlData =
      filtersData && filtersData[Filters.BODY_TYPES]
        ? filtersData[Filters.BODY_TYPES]
        : undefined;
    return !urlData;
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilter(Filters.BODY_TYPES, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default BodyTypesViewModel;
