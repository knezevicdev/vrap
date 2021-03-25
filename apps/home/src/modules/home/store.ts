import { Experiment } from '@vroom-web/experiment-sdk';
import { makeObservable } from 'mobx';
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
    makeObservable(this);
  }
}

export const HomeStoreContext = createContext<HomeStore>(new HomeStore());
