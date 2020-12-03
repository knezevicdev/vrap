import 'mobx-react-lite/batchingForReactDom';

import {
  Hit,
  InventoryResponse,
  InvSearchNetworker,
} from '@vroom-web/inv-search-networking';
import { observable, action } from 'mobx';
import getConfig from 'next/config';
import { createContext } from 'react';

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

const { publicRuntimeConfig } = getConfig();

export interface InventoryStoreState {
  vin: string;
  vehicleStatus: Status;
  vehicle: Hit;
}

export type getVehicleResponseType = (
  vin: string,
  invSearchNetworker: InvSearchNetworker
) => Promise<InventoryResponse | undefined>;

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
    console.error(JSON.stringify(error));
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
    console.error(JSON.stringify(error));
    return {
      vehicleStatus: Status.ERROR,
      vehicle: {} as Hit,
    };
  }
}

export async function getInitialInventoryStoreState(
  vin: string
): Promise<InventoryStoreState> {
  const invSearchNetworker = new InvSearchNetworker(
    publicRuntimeConfig.INVSEARCH_V3_URL || ''
  );

  const vehicleState = await getVehicleState(
    vin,
    getVehicleResponse,
    invSearchNetworker
  );

  return {
    vin,
    ...vehicleState,
  };
}

export class InventoryStore {
  @observable vehicle: Hit = {} as Hit;
  @observable vehicleStatus: Status = Status.FETCHING;
  @observable showSticky: boolean = false;

  constructor(initialState?: InventoryStoreState) {
    if (initialState) {
      this.vehicle = initialState.vehicle;
      this.vehicleStatus = initialState.vehicleStatus;
    }
  }

  @action
  setSticky = (value: boolean): void => {
    this.showSticky = value;
  };
}

export const InventoryStoreContext = createContext<InventoryStore>(
  new InventoryStore()
);
