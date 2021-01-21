import { Experiment } from '@vroom-web/experiment-sdk';
import { createContext } from 'react';

export interface HomeStoreState {
  query: { [key: string]: string };
  experiments: Experiment[];
}

export class HomeStore {
  query: { [key: string]: string } = {};
  experiments: Experiment[] = [];

  constructor(initialState?: HomeStoreState) {
    if (initialState) {
      this.query = initialState.query;
      this.experiments = initialState.experiments;
    }
  }
}

export const HomeStoreContext = createContext<HomeStore>(new HomeStore());
