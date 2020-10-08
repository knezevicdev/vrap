import { CarsStore } from 'src/modules/cars/store';

class CountViewModel {
  private readonly carsStore: CarsStore;

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  getCount(): string | undefined {
    const count = this.carsStore.inventoryData?.hits.total;
    if (!count || count < 1) {
      return;
    }
    return count.toLocaleString();
  }

  getCountMessage(): string | undefined {
    if (!this.getCount()) return;
    if (Number(this.getCount()) === 1) return 'Vehicle Found';
    else return 'Vehicles Found';
  }
}

export default CountViewModel;
