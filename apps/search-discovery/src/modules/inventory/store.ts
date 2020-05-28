import { action, observable, runInAction } from 'mobx';
import { createContext } from 'react';

import globalEnv from 'src/globalEnv';
import {
  Hit,
  Inventory as InventoryV3,
  SoldStatus,
} from 'src/networking/models/Inventory.v3';
import { Networker } from 'src/networking/Networker';
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

  const networker = new Networker();

  try {
    const response = (
      await networker.postInventory({
        fulldetails: true,
        'sold-status': SoldStatus.FOR_SALE,
        source: `${globalEnv.NAME}-${globalEnv.VERSION}`,
        vin: [vin],
      })
    ).data as InventoryV3;

    const vehicle = response.data.hits.hits.find(
      i => i._source.vin.toLowerCase() === vin.toLowerCase()
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
    const similarResponse = (
      await networker.getInventorySimilar({
        vin,
        min: 4,
      })
    ).data as InventoryV3;

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

  private networker: Networker;

  constructor(initialState?: InventoryStoreState) {
    this.networker = new Networker();
    if (initialState) {
      this.vehicleStatus = initialState.vehicleStatus;
      this.vehicle = initialState.vehicle;
      this.similarStatus = initialState.similarStatus;
      this.similar = initialState.similar;
    }
  }

  @action
  getInventory = async (vin: string): Promise<void> => {
    try {
      const response = (
        await this.networker.postInventory({
          fulldetails: true,
          'sold-status': SoldStatus.FOR_SALE,
          source: `${globalEnv.NAME}-${globalEnv.VERSION}`,
          vin: [vin],
        })
      ).data as InventoryV3;

      const vehicle = response.data.hits.hits.find(
        i => i._source.vin.toLowerCase() === vin.toLowerCase()
      );

      if (!vehicle) {
        throw new Error('No vehicle found with that VIN in inventory');
      }

      runInAction(() => {
        this.vehicleStatus = Status.SUCCESS;
        this.vehicle = vehicle;
      });
    } catch (err) {
      runInAction(() => {
        this.vehicleStatus = Status.ERROR;
      });
    }
  };

  @action
  getSimilar = async (vin: string, min = 4): Promise<void> => {
    try {
      const response = (
        await this.networker.getInventorySimilar({
          vin,
          min,
        })
      ).data as InventoryV3;

      runInAction(() => {
        this.similarStatus = Status.SUCCESS;
        this.similar = response.data.hits.hits;
      });
    } catch (err) {
      runInAction(() => {
        this.similarStatus = Status.ERROR;
      });
    }
  };
}

export const InventoryStoreContext = createContext<InventoryStore>(
  new InventoryStore()
);
