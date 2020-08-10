import { CarsStore } from 'src/modules/cars/store';

class TopSectionViewModel {
  readonly buttonLabel: string = `Filters`;

  private readonly carsStore: CarsStore;

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  areFiltersClosed = (): boolean => {
    return !this.carsStore.areFiltersOpen;
  };

  toggleAreFiltersClosed = (): void => {
    this.carsStore.toggleAreFiltersOpen();
  };
}

export default TopSectionViewModel;
