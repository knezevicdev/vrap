import { BodyType } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';
import {
  BodyType as FiltersDataBodyType,
  Filters,
  FiltersData,
} from 'src/modules/cars/utils/url';

class BodyTypesViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getBodyTypes = (): BodyType[] => {
    return this.carsStore.bodyTypes;
  };

  private removeFiltersDataBodyTypes = (
    filtersDataValue: FiltersDataBodyType,
    filtersDataBodyTypes?: FiltersDataBodyType[]
  ): FiltersDataBodyType[] | undefined => {
    if (!filtersDataBodyTypes) {
      return undefined;
    }
    if (!filtersDataBodyTypes.includes(filtersDataValue)) {
      return undefined;
    }
    const updatedFiltersDataBodyTypes = filtersDataBodyTypes.filter(
      (bt) => bt !== filtersDataValue
    );
    return updatedFiltersDataBodyTypes.length > 0
      ? updatedFiltersDataBodyTypes
      : undefined;
  };

  private addFiltersDataBodyTypes = (
    filtersDataValue: FiltersDataBodyType,
    filtersDataBodyTypes?: FiltersDataBodyType[]
  ): FiltersDataBodyType[] | undefined => {
    if (!filtersDataBodyTypes) {
      return [filtersDataValue];
    }
    if (filtersDataBodyTypes.includes(filtersDataValue)) {
      return filtersDataBodyTypes;
    }
    return [...filtersDataBodyTypes, filtersDataValue];
  };

  private getUpdatedFiltersDataBodyTypes(
    filtersDataValue: FiltersDataBodyType,
    isSelected: boolean,
    filtersDataBodyTypes?: FiltersDataBodyType[]
  ): FiltersDataBodyType[] | undefined {
    if (isSelected) {
      return this.removeFiltersDataBodyTypes(
        filtersDataValue,
        filtersDataBodyTypes
      );
    }
    return this.addFiltersDataBodyTypes(filtersDataValue, filtersDataBodyTypes);
  }

  handleListItemClick = (
    filtersDataValue: FiltersDataBodyType,
    isSelected: boolean
  ) => (): void => {
    const filtersData = this.carsStore.filtersData;
    const filtersDataBodyTypes = filtersData
      ? filtersData[Filters.BODY_TYPES]
      : undefined;
    const updatedFiltersDataBodyTypes = this.getUpdatedFiltersDataBodyTypes(
      filtersDataValue,
      isSelected,
      filtersDataBodyTypes
    );
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.BODY_TYPES]: updatedFiltersDataBodyTypes,
    };
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
    if (!filtersData) {
      return;
    }
    const filtersDataBodyTypes = filtersData[Filters.BODY_TYPES];
    if (!filtersDataBodyTypes) {
      return;
    }
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.BODY_TYPES]: undefined,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default BodyTypesViewModel;
