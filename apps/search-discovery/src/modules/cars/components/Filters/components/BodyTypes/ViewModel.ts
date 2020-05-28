import { CarsStore } from 'src/modules/cars/store';
import {
  addToList,
  removeFromList,
  resetFilter,
} from 'src/modules/cars/utils/navigation';
import { BodyType, Filters, FiltersData } from 'src/modules/cars/utils/types';

class BodyTypesViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  handleClick = (bodyType: BodyType, isSelected: boolean) => (): void => {
    const url = bodyType.url;
    const filtersData = this.carsStore.filtersData;
    isSelected
      ? removeFromList(Filters.BODY_TYPES, url, filtersData as FiltersData)
      : addToList(Filters.BODY_TYPES, url, filtersData);
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    resetFilter(Filters.BODY_TYPES, filtersData as FiltersData);
  };

  getItemInformation = (
    url: string
  ): { isSelected: boolean; fontWeight: string } => {
    const filtersData = this.carsStore.filtersData;
    const urlData =
      filtersData && filtersData[Filters.BODY_TYPES]
        ? filtersData[Filters.BODY_TYPES]
        : undefined;
    const isSelected = urlData ? urlData.includes(url) : false;
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
}

export default BodyTypesViewModel;
