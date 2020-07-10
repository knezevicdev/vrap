import {
  Hit,
  InvSearchNetworker,
  SoldStatus,
} from '@vroom-web/inv-search-networking';
import { observable } from 'mobx';
import { createContext } from 'react';

import globalEnv from 'src/globalEnv';
import { Status } from 'src/networking/types';

export interface InventoryStoreState {
  similarStatus: Status;
  similar: Hit[];
  vehicleStatus: Status;
  vehicle: Hit;
}

export async function getInitialInventoryStoreState(
  vin: string
): Promise<InventoryStoreState> {
  const initState: InventoryStoreState = {
    similarStatus: Status.INITIAL,
    similar: [] as Hit[],
    vehicleStatus: Status.INITIAL,
    vehicle: {} as Hit,
  };

  const invSearchNetworker = new InvSearchNetworker(
    globalEnv.INVSEARCH_V3_URL || ''
  );

  try {
    const response = await invSearchNetworker.postInventory({
      fulldetails: true,
      'sold-status': SoldStatus.FOR_SALE,
      source: `${globalEnv.NAME}-${globalEnv.VERSION}`,
      vin: [vin],
    });

    const vehicle = response.data.hits.hits.find(
      (i) => i._source.vin.toLowerCase() === vin.toLowerCase()
    );

    if (!vehicle) {
      throw new Error('No vehicle found with that VIN in inventory');
    }

    initState.vehicleStatus = Status.SUCCESS;
    initState.vehicle = vehicle;
  } catch (err) {
    initState.vehicleStatus = Status.ERROR;
  }

  try {
    const similarResponse = await invSearchNetworker.getInventorySimilar({
      vin,
      min: 4,
    });

    initState.similar = similarResponse.data.hits.hits;
    initState.similarStatus = Status.SUCCESS;
  } catch (err) {
    initState.similarStatus = Status.ERROR;
  }

  return initState;
}

export class InventoryStore {
  @observable similarStatus: Status = Status.FETCHING;
  @observable similar: Hit[] = [] as Hit[];
  @observable vehicleStatus: Status = Status.FETCHING;
  @observable vehicle: Hit = {} as Hit;

  constructor(initialState?: InventoryStoreState) {
    if (initialState) {
      this.vehicleStatus = initialState.vehicleStatus;
      this.vehicle = initialState.vehicle;
      this.similarStatus = initialState.similarStatus;
      this.similar = initialState.similar;
    }
  }
}

export const InventoryStoreContext = createContext<InventoryStore>(
  new InventoryStore()
);
