import { Experiment } from '@vroom-web/experiment-sdk';
import {
  Hit,
  InventoryResponse,
  InvSearchNetworker,
} from '@vroom-web/inv-search-networking';
import { InvServiceNetworker } from '@vroom-web/inv-service-networking';
import { Client, GQLTypes, isSuccessResponse } from '@vroom-web/networking';
import gql from 'graphql-tag';
import { action, observable, runInAction } from 'mobx';
import getConfig from 'next/config';
import { createContext } from 'react';

import { Status } from 'src/networking/types';

const { publicRuntimeConfig } = getConfig();

const deliveryFeeDefault = 699;

export enum GallerySelections {
  GENERAL = 'General Photos',
  DEFECTS = 'Imperfections',
  THREE_SIXTY = '360\u00B0 View',
}

export interface InventoryStoreState {
  vin: string;
  similarStatus: Status;
  similar: Hit[];
  similarClusterCount: number;
  vehicleStatus: Status;
  vehicle: Hit;
  isAvailable: boolean;
  deliveryFee: number;
  actionFavorite: boolean;
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
) => Promise<{
  similarStatus: Status;
  similar?: Hit[];
  similarClusterCount?: number;
}>;

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

export async function getVehicleSimilarState(
  vin: string,
  useVinCluster: boolean,
  invSearchNetworker: InvSearchNetworker
): Promise<{
  similarStatus: Status;
  similar: Hit[];
  similarClusterCount: number;
}> {
  try {
    const response = await invSearchNetworker.getInventorySimilar({
      vin,
      min: 4,
      useVinCluster,
    });
    return {
      similarStatus: Status.SUCCESS,
      similar: response.data.hits.hits,
      similarClusterCount: response.clusterCount,
    };
  } catch (error) {
    console.error(JSON.stringify(error));
    return {
      similarStatus: Status.ERROR,
      similar: [] as Hit[],
      similarClusterCount: 0,
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
    console.error(JSON.stringify(error));
    return false;
  }
}

interface DeliveryFeeData {
  taxiGetShippingFee: GQLTypes.ShippingFee;
}

export async function fetchDeliveryFeeState(
  gearboxClient: Client,
  deliveryFeeDefault: number
): Promise<number> {
  const response = await gearboxClient.gqlRequest<DeliveryFeeData>({
    document: gql`
      {
        taxiGetShippingFee {
          fee
        }
      }
    `,
  });
  if (isSuccessResponse(response)) {
    return response.data.taxiGetShippingFee.fee || deliveryFeeDefault;
  } else {
    console.error(JSON.stringify(response.error));
    return deliveryFeeDefault;
  }
}

export async function getInitialInventoryStoreState(
  vin: string,
  actionFavorite: boolean
): Promise<{
  similar: Hit[];
  isAvailable: boolean;
  deliveryFee: number;
  vin: string;
  similarClusterCount: number;
  vehicleStatus: Status;
  vehicle: Hit;
  similarStatus: Status;
  actionFavorite: boolean;
}> {
  const invSearchNetworker = new InvSearchNetworker(
    publicRuntimeConfig.INVSEARCH_V3_URL || ''
  );

  const invServiceNetworker = new InvServiceNetworker(
    publicRuntimeConfig.INV_SERVICE_V2_URL || ''
  );

  const gearboxClient = new Client(publicRuntimeConfig.GEARBOX_URL, {
    timeout: 4000,
  });

  const vehicleState = await getVehicleState(
    vin,
    getVehicleResponse,
    invSearchNetworker
  );
  const vehicleSimilarState = await getVehicleSimilarState(
    vin,
    false,
    invSearchNetworker
  );
  const inventoryAvailableState = await getInventoryAvailabilityState(
    vin,
    invServiceNetworker
  );
  const deliveryFeeState = await fetchDeliveryFeeState(
    gearboxClient,
    deliveryFeeDefault
  );

  return {
    vin,
    ...vehicleState,
    ...vehicleSimilarState,
    isAvailable: inventoryAvailableState,
    deliveryFee: deliveryFeeState,
    actionFavorite,
  };
}

export class InventoryStore {
  private readonly invSearchNetworker = new InvSearchNetworker(
    publicRuntimeConfig.INVSEARCH_V3_URL || ''
  );

  @observable deliveryFee = deliveryFeeDefault;
  @observable similarStatus: Status = Status.FETCHING;
  @observable similar: Hit[] = [] as Hit[];
  @observable similarClusterCount = 0;
  @observable vehicleStatus: Status = Status.FETCHING;
  @observable vehicle: Hit = {} as Hit;
  @observable isAvailable = false;
  @observable selectedGallery = GallerySelections.GENERAL;
  @observable shippingOriginsStatus: Status = Status.INITIAL;

  @observable geoShippingExperiment?: Experiment;
  @observable goBiasExperiment?: Experiment;
  @observable actionFavorite = false;

  constructor(initialState?: InventoryStoreState) {
    if (initialState) {
      this.vehicleStatus = initialState.vehicleStatus;
      this.vehicle = initialState.vehicle;
      // DELTA-217, to accommodate the vin cluster A/B test for similar vehicles,
      // we initialize similarStatus to FETCHING, until we are sure on the client side,
      // which variant we are in. Only then do we set the status to something other than fetching.
      // this.similarStatus = initialState.similarStatus;
      this.similar = initialState.similar;
      this.isAvailable = initialState.isAvailable;
      this.deliveryFee = initialState.deliveryFee;
      this.actionFavorite = initialState.actionFavorite;
    }
  }

  @action
  setSimilarStatus = (similarStatus: Status): void => {
    this.similarStatus = similarStatus;
  };

  @action
  getSimilar = async (vin: string, useVinCluster: boolean): Promise<void> => {
    this.similarStatus = Status.FETCHING;
    const data = await getVehicleSimilarState(
      vin,
      useVinCluster,
      this.invSearchNetworker
    );
    runInAction(() => {
      this.similar = data.similar;
      this.similarStatus = data.similarStatus;
      this.similarClusterCount = data.similarClusterCount;
    });
  };

  @action
  changeSelectedGallery = (gallery: GallerySelections): void => {
    this.selectedGallery = gallery;
  };

  @action
  setGeoShippingExperiment = (geoShippingExperiment?: Experiment): void => {
    this.geoShippingExperiment = geoShippingExperiment;
  };

  @action
  setGoBiasExperiment = (goBiasExperiment?: Experiment): void => {
    this.goBiasExperiment = goBiasExperiment;
  };
}

export const InventoryStoreContext = createContext<InventoryStore>(
  new InventoryStore()
);
