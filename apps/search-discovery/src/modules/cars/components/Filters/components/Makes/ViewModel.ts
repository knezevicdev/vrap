import { CarsStore } from '../../../../store';
import MakesStore from './store';

import { ALL_KEY } from 'src/modules/cars/utils/types';

class MakesViewModel {
  private readonly carsStore: CarsStore;
  private readonly makesStore: MakesStore;

  constructor(carsStore: CarsStore, makesStore: MakesStore) {
    this.carsStore = carsStore;
    this.makesStore = makesStore;
  }

  getMakes = (): string[] => {
    if (this.carsStore.makeAndModelsData) {
      const makes = Object.keys(this.carsStore.makeAndModelsData);
      return this.makesStore.showMore ? makes : makes.slice(0, 10);
    } else {
      return [];
    }
  };

  getMakeData = (make: string): { isSelected: boolean; models: string[] } => {
    if (this.carsStore.makeAndModelsData) {
      const isSelected = this.makesStore.makesVisibility.indexOf(make) > -1;
      const models = this.carsStore.makeAndModelsData[make].slice().sort();
      const allModelIndex = models.findIndex(m => m.toLowerCase() === ALL_KEY);
      if (allModelIndex !== 0) {
        const allModel = models[allModelIndex];
        models.splice(allModelIndex, 1);
        models.splice(0, 0, allModel);
      }
      return { isSelected, models };
    } else {
      return { isSelected: false, models: [] };
    }
  };

  getShowMoreLabel = (): string => {
    return this.makesStore.showMore ? 'Show Less' : 'Show More';
  };

  setShowMore = (): void => {
    this.makesStore.setShowMore();
  };

  setMakesVisibility = (make: string): void => {
    this.makesStore.setMakesVisibility(make);
  };
}

export default MakesViewModel;
