import { Store } from '../../../../store';
import { Filters } from '../../../../util';

export const range = { min: 2000, max: 2020 };
const key = Filters.YEAR;

class YearViewModel {
  private store: Store;
  readonly resetButtonLabel: string = 'Reset';

  constructor(store: Store) {
    this.store = store;
  }

  onDone = (years: number[]): void => {
    this.store.updateMinAndMax(key, { min: years[0], max: years[1] })
  };

  reset = (): void => {
    this.store.resetFilter(Filters.YEAR);
  };

  getStates = (): {
    inputsState: string[] | undefined;
    sliderState: number[];
  } => {
    const urlFilters = this.store.filtersDataFromUrl;
    const yearsFromFilters = urlFilters && urlFilters[key];

    const inputsState = yearsFromFilters
      ? [yearsFromFilters.min.toString(), yearsFromFilters.max.toString()]
      : undefined;

    const sliderState = yearsFromFilters
      ? [yearsFromFilters.min, yearsFromFilters.max]
      : [range.min, range.max];

    return { inputsState, sliderState };
  };
}

export default YearViewModel;
