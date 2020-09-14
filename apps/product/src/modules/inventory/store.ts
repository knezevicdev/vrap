import { Hit, InvSearchNetworker } from '@vroom-web/inv-search-networking';
import { InvServiceNetworker } from '@vroom-web/inv-service-networking';
import { observable } from 'mobx';
import getConfig from 'next/config';
import { createContext } from 'react';

import { Status } from 'src/networking/types';

const { publicRuntimeConfig } = getConfig();

export interface InventoryStoreState {
  similarStatus: Status;
  similar: Hit[];
  vehicleStatus: Status;
  vehicle: Hit;
  isAvailable: boolean;
}

export async function getInitialInventoryStoreState(
  vin: string,
  vinClusterDefaultVariant: boolean
): Promise<InventoryStoreState> {
  const initState: InventoryStoreState = {
    similarStatus: Status.INITIAL,
    similar: [] as Hit[],
    vehicleStatus: Status.INITIAL,
    vehicle: {} as Hit,
    isAvailable: false,
  };

  const invSearchNetworker = new InvSearchNetworker(
    publicRuntimeConfig.INVSEARCH_V3_URL || ''
  );
  const invServiceNetworker = new InvServiceNetworker(
    publicRuntimeConfig.INV_SERVICE_V2_URL || ''
  );

  try {
    const response = await invSearchNetworker.postInventory({
      fulldetails: true,
      source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
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
    const response = await invSearchNetworker.getInventorySimilar({
      vin,
      min: 4,
      useVinCluster: !vinClusterDefaultVariant,
      // if vinClusterDefaultVariant is true we are in
      // the default and useVinCluster should be false
    });

    initState.similar = response.data.hits.hits;
    initState.similarStatus = Status.SUCCESS;
  } catch (err) {
    initState.similarStatus = Status.ERROR;
  }

  try {
    const response = await invServiceNetworker.getInventoryAvailability(vin);
    initState.isAvailable = response;
  } catch {
    initState.isAvailable = false;
  }

  return initState;
}

export class InventoryStore {
  @observable similarStatus: Status = Status.FETCHING;
  @observable similar: Hit[] = [] as Hit[];
  @observable vehicleStatus: Status = Status.FETCHING;
  @observable vehicle: Hit = {} as Hit;
  @observable isAvailable = false;

  constructor(initialState?: InventoryStoreState) {
    if (initialState) {
      this.vehicleStatus = initialState.vehicleStatus;
      this.vehicle = initialState.vehicle;
      this.similarStatus = initialState.similarStatus;
      this.similar = initialState.similar;
      this.isAvailable = initialState.isAvailable;
    }
  }
}

export const InventoryStoreContext = createContext<InventoryStore>(
  new InventoryStore()
);
