import { createContext } from 'react';

export interface HomeStoreState {
  query: { [key: string]: string };
}

export class HomeStore {
  query: { [key: string]: string } = {};

  constructor(initialState?: HomeStoreState) {
    if (initialState) {
      this.query = initialState.query;
    }
  }
}

export const HomeStoreContext = createContext<HomeStore>(new HomeStore());
