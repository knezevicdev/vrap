import { Store } from '../../../../store';
import { Filter } from '../../../../store/util';
import { Filters } from '../../../../util';

class ColorViewModel {
  private store: Store;
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

  constructor(store: Store) {
    this.store = store;
  }

  handleClick = (color: string, isSelected: boolean) => (): void => {
    isSelected
      ? this.store.removeFromList(Filters.COLORS, color)
      : this.store.addToList(Filters.COLORS, color);
  };

  reset = (): void => {
    this.store.resetFilter(Filters.COLORS);
  };

  getItemInformation = (
    url: string
  ): {
    isSelected: boolean;
    fontWeight: string;
    hasBorder: boolean;
    isMetallic: boolean;
  } => {
    const urlData = this.store.filters[Filter.COLOR].urlData as string[];
    const isSelected = urlData ? urlData.includes(url) : false;
    const fontWeight = isSelected ? 'fontWeightMedium' : 'fontWeightLight';
    const hasBorder = url === 'white';
    const isMetallic = url === 'silver' || url === 'gold';
    return { isSelected, fontWeight, hasBorder, isMetallic };
  };

  isResetDisabled = (): boolean => {
    const urlData = this.store.filters[Filter.COLOR].urlData as string[];
    return !urlData;
  };
}

export default ColorViewModel;
