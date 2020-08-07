import { action, observable, runInAction } from 'mobx';
import { createContext } from 'react';

import { Summary } from 'src/networking/models/DeliveryOrder';
import { Networker, Status } from 'src/networking/Networker';

export interface HomeStoreState {
  deliveryOrderStatus: Status;
  deliveryOrders?: Summary[];
}

export async function getInitialHomeStoreState(): Promise<HomeStoreState> {
  const initialState: HomeStoreState = {
    deliveryOrderStatus: Status.INITIAL,
  };
  const networker = new Networker();
  try {
    const response = await networker.getDeliveryOrders();
    initialState.deliveryOrders = response.data;
    initialState.deliveryOrderStatus = Status.SUCCESS;
  } catch {
    initialState.deliveryOrderStatus = Status.ERROR;
  }

  return initialState;
}

export class HomeStore {
  @observable deliveryOrderStatus: Status = Status.INITIAL;
  @observable deliveryOrders?: Summary[];

  private networker: Networker;

  constructor(initialState?: HomeStoreState) {
    this.networker = new Networker();
    if (initialState) {
      this.deliveryOrderStatus = initialState.deliveryOrderStatus;
      this.deliveryOrders = initialState.deliveryOrders;
    }
  }

  @action
  getDeliveryOrders = async (): Promise<void> => {
    try {
      const response = await this.networker.getDeliveryOrders();
      runInAction(() => {
        this.deliveryOrders = response.data;
        this.deliveryOrderStatus = Status.SUCCESS;
      });
    } catch {
      runInAction(() => {
        this.deliveryOrderStatus = Status.ERROR;
      });
    }
  };
}

export const HomeStoreContext = createContext<HomeStore>(new HomeStore());
