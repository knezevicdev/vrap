import {
  Filters,
  MaxAndMin,
  resetFilter,
  setPrice,
} from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

class PriceViewModel {
  private readonly carsStore: CarsStore;
  private readonly currencyFormatter: Intl.NumberFormat;

  readonly errorLabel: string;
  readonly resetButtonLabel: string = 'Reset';
  readonly range: MaxAndMin = { min: 4000, max: 125000 };
  readonly step = 1000;

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
    this.currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const minPriceLabel = this.currencyFormatter.format(this.range.min);
    const maxPriceLabel = this.currencyFormatter.format(this.range.max);
    this.errorLabel = `Please enter prices within ${minPriceLabel} - ${maxPriceLabel}`;
  }

  getPrice = (): MaxAndMin | undefined => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return undefined;
    }
    const filtersDataPrice = filtersData[Filters.PRICE];
    return filtersDataPrice;
  };

  private updateFiltersDataPrice = (value: MaxAndMin | undefined): void => {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = value
      ? setPrice(value, filtersData)
      : resetFilter(Filters.PRICE, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  };

  handleMaxAndMinInputsChange = (value?: MaxAndMin): void => {
    this.updateFiltersDataPrice(value);
  };

  isResetButtonDisabled = (): boolean => {
    const filtersData = this.carsStore.filtersData;
    if (!filtersData) {
      return true;
    }
    const filtersDataPrice = filtersData[Filters.PRICE];
    if (!filtersDataPrice) {
      return true;
    }
    return false;
  };

  handleResetClick(): void {
    const filtersData = this.carsStore.filtersData;
    const updatedFiltersData = resetFilter(Filters.PRICE, filtersData);
    this.carsStore.updateFiltersData(updatedFiltersData);
  }
}

export default PriceViewModel;
