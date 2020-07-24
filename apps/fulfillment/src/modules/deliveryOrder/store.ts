import { action, observable, runInAction } from 'mobx';
import { createContext } from 'react';

import { Details } from 'src/networking/models/DeliveryOrder';
import { Networker, Status } from 'src/networking/Networker';

export interface DeliveryOrderStoreState {
  deliveryOrderStatus: Status;
  deliveryOrder: Details;
}

export async function getInitialDeliveryOrderStoreState(
  vin: string
): Promise<DeliveryOrderStoreState> {
  const initialState: DeliveryOrderStoreState = {
    deliveryOrderStatus: Status.INITIAL,
    deliveryOrder: {} as Details,
  };
  const networker = new Networker();
  try {
    const response = await networker.getDeliveryOrder(vin);
    initialState.deliveryOrder = response.data;
    initialState.deliveryOrderStatus = Status.SUCCESS;
  } catch {
    initialState.deliveryOrderStatus = Status.ERROR;
  }

  return initialState;
}

export class DeliveryOrderStore {
  @observable deliveryOrderStatus: Status = Status.INITIAL;
  @observable deliveryOrder: Details = {} as Details;

  constructor(initialState?: DeliveryOrderStoreState) {
    if (initialState) {
      this.deliveryOrderStatus = initialState.deliveryOrderStatus;
      this.deliveryOrder = initialState.deliveryOrder;
    }
  }
}

export const DeliveryOrderStoreContext = createContext<DeliveryOrderStore>(
  new DeliveryOrderStore()
);
