//import { Filters } from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

class LandingBannerViewModel {
  private readonly carsStore: CarsStore;
  readonly test: string = 'blah blah blah';
  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getFilterData(): void {
    const filtersData = this.carsStore.filtersData;
    console.log(filtersData);
  }
}

export default LandingBannerViewModel;
