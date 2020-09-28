import {
  Hit,
  InventoryResponse,
  InvSearchNetworker,
} from '@vroom-web/inv-search-networking';
import { InvServiceNetworker } from '@vroom-web/inv-service-networking';
import { observable } from 'mobx';
import getConfig from 'next/config';
import { createContext } from 'react';

import { Status } from 'src/networking/types';

const { publicRuntimeConfig } = getConfig();

export interface InventoryStoreState {
  similarStatus: Status;
  similar?: Hit[];
  vehicleStatus: Status;
  vehicle?: Hit;
  isAvailable: boolean;
}

export async function getVehicleReponse(
  vin: string
): Promise<InventoryResponse | undefined> {
  const invSearchNetworker = new InvSearchNetworker(
    publicRuntimeConfig.INVSEARCH_V3_URL || ''
  );
  try {
    const response = await invSearchNetworker.postInventory({
      fulldetails: true,
      source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
      vin: [vin],
    });
    return response;
  } catch (err) {
    return undefined;
  }
}

export async function getVehicleState(
  vin: string
): Promise<{ vehicleStatus: Status; vehicle?: Hit }> {
  try {
    const response = await getVehicleReponse(vin);
    if (!response) {
      throw new Error('Failed to post inventory');
    }
    const vehicle = response.data.hits.hits.find(
      (i) => i._source.vin.toLowerCase() === vin.toLowerCase()
    );

    if (!vehicle) {
      throw new Error('No vehicle found with that VIN in inventory');
    }
    return {
      vehicleStatus: Status.SUCCESS,
      vehicle,
    };
  } catch {
    return {
      vehicleStatus: Status.ERROR,
    };
  }
}

export async function getVehicleSimilarState(
  vin: string,
  vinClusterDefaultVariant: boolean
): Promise<{ similarStatus: Status; similar?: Hit[] }> {
  const invSearchNetworker = new InvSearchNetworker(
    publicRuntimeConfig.INVSEARCH_V3_URL || ''
  );
  try {
    const response = await invSearchNetworker.getInventorySimilar({
      vin,
      min: 4,
      useVinCluster: !vinClusterDefaultVariant,
      // if vinClusterDefaultVariant is true we are in
      // the default and useVinCluster should be false
    });
    return {
      similarStatus: Status.SUCCESS,
      similar: response.data.hits.hits,
    };
  } catch {
    return {
      similarStatus: Status.ERROR,
    };
  }
}

export async function getInventoryAvailabilityState(
  vin: string
): Promise<boolean> {
  const invServiceNetworker = new InvServiceNetworker(
    publicRuntimeConfig.INV_SERVICE_V2_URL || ''
  );
  try {
    const response = await invServiceNetworker.getInventoryAvailability(vin);
    return response;
  } catch {
    return false;
  }
}

export class InventoryStore {
  @observable similarStatus: Status = Status.FETCHING;
  @observable similar?: Hit[] = [] as Hit[];
  @observable vehicleStatus: Status = Status.FETCHING;
  @observable vehicle?: Hit = {} as Hit;
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
