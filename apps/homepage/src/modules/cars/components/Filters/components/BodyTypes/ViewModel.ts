import { Store } from '../../../../store';
import { Filter } from '../../../../store/util';
import { Filters } from '../../../../util';
import { BodyType } from './types';

class BodyTypesViewModel {
  private store: Store;
  readonly resetButtonLabel: string = 'Reset';

  constructor(store: Store) {
    this.store = store;
  }

  handleClick = (bodyType: BodyType, isSelected: boolean) => (): void => {
    const url = bodyType.url;
    isSelected
      ? this.store.removeFromList(Filters.BODY_TYPES, url)
      : this.store.addToList(Filters.BODY_TYPES, url);
  };

  reset = (): void => {
    this.store.resetFilter(Filters.BODY_TYPES);
  };

  getItemInformation = (
    url: string
  ): { isSelected: boolean; fontWeight: string } => {
    const urlData = this.store.filters[Filter.BODY_TYPE].urlData as string[];
    const isSelected = urlData ? urlData.includes(url) : false;
    const fontWeight = isSelected ? 'fontWeightMedium' : 'fontWeightLight';

    return { isSelected, fontWeight };
  };

  isResetDisabled = (): boolean => {
    const urlData = this.store.filters[Filter.BODY_TYPE].urlData as string[];
    return !urlData;
  };
}

export default BodyTypesViewModel;
