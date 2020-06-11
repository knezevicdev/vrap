import { observable } from 'mobx';
import { createContext } from 'react';

export interface HomeStoreState {
  deviceType: string;
}

export class HomeStore {
  @observable deviceType = '';

  constructor(initialState?: HomeStoreState) {
    if (initialState) {
      this.deviceType = initialState.deviceType;
    }
  }
}

export const HomeStoreContext = createContext<HomeStore>(new HomeStore());
