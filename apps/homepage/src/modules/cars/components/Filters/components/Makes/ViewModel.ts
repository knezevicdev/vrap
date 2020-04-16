import { MakeAndModels } from '../../../../util';
import { ALL_KEY } from '../../../util';

import { Store } from 'src/modules/cars/store';

interface State {
  [make: string]: boolean;
}

class MakesViewModel {
  private readonly makes: string[];
  private readonly data: MakeAndModels;

  constructor(store: Store) {
    const data = store.makeAndModelsData as MakeAndModels;
    this.makes = Object.keys(data);
    this.data = data;
  }

  getInitialState = (): State => {
    return this.makes.reduce((current: State, make: string) => {
      current[make] = false;
      return current;
    }, {});
  };

  getMakes = (showMore: boolean): string[] => {
    return showMore ? this.makes : this.makes.slice(0, 10);
  };

  getMakeData = (
    make: string,
    makesStates: State
  ): { isSelected: boolean; models: string[] } => {
    const isSelected = makesStates[make];
    const models = this.data[make].slice().sort();
    const allModelIndex = models.findIndex(m => m.toLowerCase() === ALL_KEY);
    if (allModelIndex !== 0) {
      const allModel = models[allModelIndex];
      models.splice(allModelIndex, 1);
      models.splice(0, 0, allModel);
    }
    return { isSelected, models };
  };

  getShowMoreLabel = (showMore: boolean): string => {
    return showMore ? 'Show Less' : 'Show More';
  };
}

export default MakesViewModel;
