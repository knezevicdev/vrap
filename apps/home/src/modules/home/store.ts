import { createContext } from 'react';
import { Experiment } from 'vroom-abtesting-sdk/types';

export interface HomeStoreState {
  experiments: Experiment[] | undefined;
  query: { [key: string]: string };
}

export class HomeStore {
  experiments: Experiment[] | undefined = undefined;
  query: { [key: string]: string } = {};

  constructor(initialState?: HomeStoreState) {
    if (initialState) {
      this.experiments = initialState.experiments;
      this.query = initialState.query;
    }
  }
}

export const HomeStoreContext = createContext<HomeStore>(new HomeStore());
