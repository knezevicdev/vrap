import { observable } from 'mobx';
import { createContext } from 'react';

export interface HomeStoreState {
  deviceType: string;
  fitHomepageSelltradeExperimentVariant: number;
}

export class HomeStore {
  @observable deviceType = '';
  @observable fitHomepageSelltradeExperimentVariant = 0;

  constructor(initialState?: HomeStoreState) {
    if (initialState) {
      this.deviceType = initialState.deviceType;
      this.fitHomepageSelltradeExperimentVariant =
        initialState.fitHomepageSelltradeExperimentVariant;
    }
  }
}

export const HomeStoreContext = createContext<HomeStore>(new HomeStore());
