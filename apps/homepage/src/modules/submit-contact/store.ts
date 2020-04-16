import { action, observable } from 'mobx';
import { createContext } from 'react';

import {
  Hit,
  Inventory as InventoryV3,
  SoldStatus,
} from 'src/networking/models/Inventory.v3';
import { Networker } from 'src/networking/Networker';
import { Status } from 'src/networking/types';

export interface InitialSubmitContactStoreState {
  vehicle: Hit;
  vehicleStatus: Status;
  similar: Hit[];
  similarStatus: Status;
}

export async function getInitialSubmitContactStoreState(
  vin: string
): Promise<InitialSubmitContactStoreState> {
  const initialState: InitialSubmitContactStoreState = {
    vehicle: {} as Hit,
    vehicleStatus: Status.INITIAL,
    similar: [] as Hit[],
    similarStatus: Status.INITIAL,
  };

  const networker = new Networker();

  try {
    const response = (
      await networker.postInventory({
        fulldetails: true,
        'sold-status': SoldStatus.FOR_SALE,
        vin: [vin],
      })
    ).data as InventoryV3;

    const vehicle = response.data.hits.hits.find(
      i => i._source.vin.toLowerCase() === vin.toLowerCase()
    );

    if (!vehicle) {
      throw new Error('No vehicle found with that VIN in inventory');
    }

    initialState.vehicle = vehicle;
    initialState.vehicleStatus = Status.SUCCESS;
  } catch (e) {
    initialState.vehicleStatus = Status.ERROR;
  }

  try {
    const similarResponse = (
      await networker.getInventorySimilar({
        vin,
        min: 6,
      })
    ).data as InventoryV3;

    initialState.similar = similarResponse.data.hits.hits;
    initialState.similarStatus = Status.SUCCESS;
  } catch (err) {
    initialState.similarStatus = Status.ERROR;
  }
  return initialState;
}

export class SubmitContactStore {
  @observable vehicle: Hit = {} as Hit;
  @observable vehicleStatus: Status = Status.INITIAL;
  @observable showErrorBanner = false;
  @observable showSuccess = false;
  @observable similar: Hit[] = [] as Hit[];
  @observable similarStatus: Status = Status.FETCHING;

  constructor(initialState?: InitialSubmitContactStoreState) {
    if (initialState) {
      this.vehicle = initialState.vehicle;
      this.vehicleStatus = initialState.vehicleStatus;
      this.similar = initialState.similar;
      this.similarStatus = initialState.similarStatus;
    }
  }

  @action
  setShowErrorBanner = (showErrorBanner: boolean): void => {
    this.showErrorBanner = showErrorBanner;
  };

  @action
  setShowSuccess = (showSuccess: boolean): void => {
    this.showSuccess = showSuccess;
  };
}

export const SubmitContactStoreContext = createContext<SubmitContactStore>(
  new SubmitContactStore()
);
