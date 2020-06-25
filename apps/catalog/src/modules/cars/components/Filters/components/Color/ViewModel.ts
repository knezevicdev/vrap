import { CarsStore } from 'src/modules/cars/store';
import {
  addToList,
  Filters,
  FiltersData,
  removeFromList,
  resetFilter,
} from 'src/modules/cars/utils/url';

class ColorViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';
  readonly colors = [
    {
      displayName: 'White',
      url: 'white',
      background: '#ffffff',
    },
    {
      displayName: 'Black',
      url: 'black',
      background: '#041022',
    },
    {
      displayName: 'Grey',
      url: 'grey',
      background: '#6c717a',
    },
    {
      displayName: 'Silver',
      url: 'silver',
      background: '#d6d7da',
    },
    {
      displayName: 'Red',
      url: 'red',
      background: '#e7131a',
    },
    {
      displayName: 'Orange',
      url: 'orange',
      background: '#f26900',
    },
    {
      displayName: 'Brown',
      url: 'brown',
      background: '#914915',
    },
    {
      displayName: 'Gold',
      url: 'gold',
      background: '#F3D482',
    },
    {
      displayName: 'Yellow',
      url: 'yellow',
      background: '#ffd400',
    },
    {
      displayName: 'Green',
      url: 'green',
      background: '#308406',
    },
    {
      displayName: 'Blue',
      url: 'blue',
      background: '#1960d0',
    },
    {
      displayName: 'Purple',
      url: 'purple',
      background: '#8C3EA7',
    },
  ];

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  handleClick = (color: string, isSelected: boolean) => (): void => {
    const filtersData = this.carsStore.filtersData;
    isSelected
      ? removeFromList(Filters.COLORS, color, filtersData as FiltersData)
      : addToList(Filters.COLORS, color, filtersData);
  };

  reset = (): void => {
    const filtersData = this.carsStore.filtersData;
    resetFilter(Filters.COLORS, filtersData as FiltersData);
  };

  getItemInformation = (
    url: string
  ): {
    isSelected: boolean;
    fontWeight: string;
    hasBorder: boolean;
    isMetallic: boolean;
  } => {
    const filtersData = this.carsStore.filtersData;
    const urlData =
      filtersData && filtersData[Filters.COLORS]
        ? filtersData[Filters.COLORS]
        : undefined;
    const isSelected = urlData ? urlData.includes(url) : false;
    const fontWeight = isSelected ? 'fontWeightMedium' : 'fontWeightLight';
    const hasBorder = url === 'white';
    const isMetallic = url === 'silver' || url === 'gold';
    return { isSelected, fontWeight, hasBorder, isMetallic };
  };

  isResetDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    const urlData =
      filtersData && filtersData[Filters.COLORS]
        ? filtersData[Filters.COLORS]
        : undefined;
    return !urlData;
  };
}

export default ColorViewModel;
