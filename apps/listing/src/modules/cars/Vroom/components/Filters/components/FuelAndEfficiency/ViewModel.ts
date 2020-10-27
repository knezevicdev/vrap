import { CarsStore } from 'src/modules/cars/store';

class EngineAndDrivetrainViewModel {
  private readonly carsStore: CarsStore;

  readonly fuelTypeLabel: string = 'Fuel';
  readonly minimumFuelEfficiency: string = 'Minimum Fuel Efficiency';

  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  showCylindersFilter = (): boolean => {
    return this.carsStore.cylinderFilterExperiment?.assignedVariant === 1;
  };
}

export default EngineAndDrivetrainViewModel;
