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
  similar: Hit[];
  vehicleStatus: Status;
  vehicle: Hit;
  isAvailable: boolean;
}

export type getVehicleResponseType = (
  vin: string,
  invSearchNetworker: InvSearchNetworker
) => Promise<InventoryResponse | undefined>;

export type getVehicleStateType = (
  vin: string,
  getVehicleResponseFn: getVehicleResponseType,
  invSearchNetworker: InvSearchNetworker
) => Promise<{ vehicleStatus: Status; vehicle?: Hit }>;

export type getVehicleSimilarStateType = (
  vin: string,
  vinClusterDefaultVariant: boolean,
  invSearchNetworker: InvSearchNetworker
) => Promise<{ similarStatus: Status; similar?: Hit[] }>;

export type getInventoryAvailabilityStateType = (
  vin: string,
  invServiceNetworker: InvServiceNetworker
) => Promise<boolean>;

export async function getVehicleResponse(
  vin: string,
  invSearchNetworker: InvSearchNetworker
): Promise<InventoryResponse | undefined> {
  try {
    const response = await invSearchNetworker.postInventory({
      fulldetails: true,
      source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
      vin: [vin],
    });
    return response;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getVehicleState(
  vin: string,
  getVehicleResponseFn: getVehicleResponseType,
  invSearchNetworker: InvSearchNetworker
): Promise<{ vehicleStatus: Status; vehicle: Hit }> {
  try {
    const response = await getVehicleResponseFn(vin, invSearchNetworker);
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
  } catch (error) {
    console.error(error);
    return {
      vehicleStatus: Status.ERROR,
      vehicle: {} as Hit,
    };
  }
}

export async function getVehicleSimilarState(
  vin: string,
  vinClusterDefaultVariant: boolean,
  invSearchNetworker: InvSearchNetworker
): Promise<{ similarStatus: Status; similar: Hit[] }> {
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
  } catch (error) {
    console.error(error);
    return {
      similarStatus: Status.ERROR,
      similar: [] as Hit[],
    };
  }
}

export async function getInventoryAvailabilityState(
  vin: string,
  invServiceNetworker: InvServiceNetworker
): Promise<boolean> {
  try {
    const response = await invServiceNetworker.getInventoryAvailability(vin);
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getInitialInventoryStoreState(
  vin: string,
  vinClusterDefaultVariant: boolean
): Promise<InventoryStoreState> {
  const invSearchNetworker = new InvSearchNetworker(
    publicRuntimeConfig.INVSEARCH_V3_URL || ''
  );

  const invServiceNetworker = new InvServiceNetworker(
    publicRuntimeConfig.INV_SERVICE_V2_URL || ''
  );

  const vehicleState = await getVehicleState(
    vin,
    getVehicleResponse,
    invSearchNetworker
  );
  const vehicleSimilarState = await getVehicleSimilarState(
    vin,
    vinClusterDefaultVariant,
    invSearchNetworker
  );
  const inventoryAvailableState = await getInventoryAvailabilityState(
    vin,
    invServiceNetworker
  );
  return {
    ...vehicleState,
    ...vehicleSimilarState,
    isAvailable: inventoryAvailableState,
  };
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
