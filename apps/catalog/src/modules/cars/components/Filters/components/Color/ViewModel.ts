import { Color } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';
import {
  Color as FiltersDataColor,
  Filters,
  FiltersData,
} from 'src/modules/cars/utils/url';

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

  private removeFiltersDataColor = (
    filtersDataValue: FiltersDataColor,
    filtersDataColors?: FiltersDataColor[]
  ): FiltersDataColor[] | undefined => {
    if (!filtersDataColors) {
      return undefined;
    }
    if (!filtersDataColors.includes(filtersDataValue)) {
      return undefined;
    }
    const updatedFiltersDataColors = filtersDataColors.filter(
      (c) => c !== filtersDataValue
    );
    return updatedFiltersDataColors.length > 0
      ? updatedFiltersDataColors
      : undefined;
  };

  private addFiltersDataColor = (
    filtersDataValue: FiltersDataColor,
    filtersDataColors?: FiltersDataColor[]
  ): FiltersDataColor[] | undefined => {
    if (!filtersDataColors) {
      return [filtersDataValue];
    }
    if (filtersDataColors.includes(filtersDataValue)) {
      return filtersDataColors;
    }
    return [...filtersDataColors, filtersDataValue];
  };

  private getUpdatedFiltersDataColors(
    filtersDataValue: FiltersDataColor,
    isSelected: boolean,
    filtersDataColors?: FiltersDataColor[]
  ): FiltersDataColor[] | undefined {
    if (isSelected) {
      return this.removeFiltersDataColor(filtersDataValue, filtersDataColors);
    }
    return this.addFiltersDataColor(filtersDataValue, filtersDataColors);
  }

  handleListItemClick = (
    filtersDataValue: FiltersDataColor,
    isSelected: boolean
  ) => (): void => {
    const filtersData = this.carsStore.filtersData;
    const filtersDataColors = filtersData
      ? filtersData[Filters.COLORS]
      : undefined;
    const updatedFiltersDataColors = this.getUpdatedFiltersDataColors(
      filtersDataValue,
      isSelected,
      filtersDataColors
    );
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.COLORS]: updatedFiltersDataColors,
    };
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
    if (!filtersData) {
      return;
    }
    const filtersDataColors = filtersData[Filters.COLORS];
    if (!filtersDataColors) {
      return;
    }
    const updatedFiltersData: FiltersData = {
      ...filtersData,
      [Filters.COLORS]: undefined,
    };
    this.carsStore.updateFiltersData(updatedFiltersData);
  };
}

export default ColorViewModel;
