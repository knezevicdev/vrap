import { CarsStore } from 'src/modules/cars/store';
import { sanitize } from 'src/modules/cars/utils/filter';
import { addMake, removeMakeOrModel } from 'src/modules/cars/utils/navigation';
import { ALL_KEY, Filters } from 'src/modules/cars/utils/types';

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
      removeMakeOrModel(this.make, model);
    }
  };

  getModelInfo = (model: string): { display: string; isSelected: boolean } => {
    const sModel = sanitize(model);
    const sMake = sanitize(this.make);
    const key = Filters.MAKE_AND_MODELS;
    const filtersData = this.carsStore.filtersData;
    const cars = (filtersData && filtersData[key]) || undefined;

    const isSelected =
      (cars && cars[sMake] && cars[sMake].includes(sModel)) || false;

    const selectAllTitle = isSelected ? 'Unselect All' : 'Select All';
    const display = sModel === ALL_KEY ? selectAllTitle : model;

    return { display, isSelected };
  };
}

export default ModelsViewModel;
