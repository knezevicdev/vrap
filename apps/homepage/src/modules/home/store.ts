import { observable } from 'mobx';
import { createContext } from 'react';

import { Networker } from 'src/networking/Networker';
import { Status } from 'src/networking/types';

export interface InitialHomeStoreState {
  inventoryCount?: number;
  inventoryCountStatus: Status;
}

export async function getInitialHomeStoreState(): Promise<
  InitialHomeStoreState
> {
  const initialState: InitialHomeStoreState = {
    inventoryCountStatus: Status.INITIAL,
  };
  const networker = new Networker();
  try {
    const response = await networker.getInventoryCount();
    const inventoryCount = response.data.data;
    initialState.inventoryCount = inventoryCount;
    initialState.inventoryCountStatus = Status.SUCCESS;
  } catch {
    initialState.inventoryCountStatus = Status.ERROR;
  }
  return initialState;
}

export class HomeStore {
  @observable inventoryCount?: number;
  @observable inventoryCountStatus: Status = Status.INITIAL;

  constructor(initialState?: InitialHomeStoreState) {
    if (initialState) {
      this.inventoryCount = initialState.inventoryCount;
      this.inventoryCountStatus = initialState.inventoryCountStatus;
    }
  }
}

export const HomeStoreContext = createContext<HomeStore>(new HomeStore());
