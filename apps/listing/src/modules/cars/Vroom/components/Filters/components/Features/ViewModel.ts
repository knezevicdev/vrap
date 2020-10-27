import { FiltersData } from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';
class FeaturesViewModel {
  private readonly carsStore: CarsStore;
  readonly resetButtonLabel: string = 'Reset';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getFiltersData = (): FiltersData | undefined => {
    return this.carsStore.filtersData;
  };
}

export default FeaturesViewModel;
