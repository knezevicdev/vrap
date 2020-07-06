import {
  addColor,
  Color as FiltersDataColor,
  Filters,
  removeColor,
  resetFilter,
} from '@vroom-web/catalog-url-integration';

import { Color } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

class ColorViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getColors = (): Color[] => {
    return this.carsStore.colors;
  };

  getItemInformation = (
    filtersDataValue: FiltersDataColor
  ): {
    isSelected: boolean;
    fontWeight: string;
    hasBorder: boolean;
    isMetallic: boolean;
  } => {
    const filtersData = this.carsStore.filtersData;
    const filtersDataColors =
      filtersData && filtersData[Filters.COLORS]
        ? filtersData[Filters.COLORS]
        : undefined;
    const isSelected = filtersDataColors
      ? filtersDataColors.includes(filtersDataValue)
      : false;
    const fontWeight = isSelected ? 'fontWeightMedium' : 'fontWeightLight';
    const hasBorder = filtersDataValue === FiltersDataColor.WHITE;
    const isMetallic =
      filtersDataValue === FiltersDataColor.SILVER ||
      filtersDataValue === FiltersDataColor.GOLD;
    return { isSelected, fontWeight, hasBorder, isMetallic };
  };

  handleListItemClick = (
    filtersDataValue: FiltersDataColor,
    isSelected: boolean
  ) => (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = isSelected
      ? removeColor(filtersDataValue, filtersData)
      : addColor(filtersDataValue, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  isResetDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return true;
    }
    const filtersDataColors = filtersData[Filters.COLORS];
    if (!filtersDataColors) {
      return true;
    }
    return false;
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilter(Filters.COLORS, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default ColorViewModel;
