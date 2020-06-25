import { CarsStore } from 'src/modules/cars/store';
import {
  addMake,
  ALL_KEY,
  Filters,
  removeMakeOrModel,
} from 'src/modules/cars/utils/url';

class ModelsViewModel {
  private readonly carsStore: CarsStore;
  private readonly make: string;
  private readonly models: string[];

  constructor(make: string, models: string[], carsStore: CarsStore) {
    this.make = make;
    this.models = models;
    this.carsStore = carsStore;
  }

  onClick = (model: string, isSelected: boolean | undefined) => (): void => {
    const filtersData = this.carsStore.filtersData;
    if (!isSelected) {
      addMake(this.make, model, this.models.length, filtersData);
    } else {
      removeMakeOrModel(this.make, model, filtersData);
    }
  };

  getModelInfo = (model: string): { display: string; isSelected: boolean } => {
    const key = Filters.MAKE_AND_MODELS;
    const filtersData = this.carsStore.filtersData;
    const cars = (filtersData && filtersData[key]) || undefined;

    const isSelected =
      (cars && cars[this.make] && cars[this.make].includes(model)) || false;

    const selectAllTitle = isSelected ? 'Unselect All' : 'Select All';
    const display = model === ALL_KEY ? selectAllTitle : model;

    return { display, isSelected };
  };
}

export default ModelsViewModel;
