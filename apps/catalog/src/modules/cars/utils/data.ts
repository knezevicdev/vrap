import {
  Inventory,
  InvSearchNetworker,
  MakeBucket,
  PostInventoryRequestData,
  SoldStatus,
} from '@vroom-web/inv-search-networking';

import globalEnv from 'src/globalEnv';
import { getFilterData } from 'src/modules/cars/utils/filter';
import {
  INVENTORY_LIMIT,
  MakeAndModels,
  POPULAR_CAR_LIMIT,
} from 'src/modules/cars/utils/types';

const transformResponse = (data: Inventory): MakeAndModels => {
  const makes = data.aggregations.make_count.buckets.sort((a, b) => {
    return a.key > b.key ? 1 : -1;
  });

  return makes.reduce((current: MakeAndModels, make: MakeBucket) => {
    const models = make.model_count.buckets.map((model) => model.key);
    const name = make.key;

    current[name] = ['All'].concat(models);
    return current;
  }, {});
};

export const getDataForMakeAndModels = async (): Promise<
  MakeAndModels | undefined
> => {
  try {
    const dataForMakeAndModel = {
      fulldetails: false,
      limit: 1,
      sortdirection: 'asc',
      'sold-status': SoldStatus.FOR_SALE,
      source: `${globalEnv.NAME}-${globalEnv.VERSION}`,
    };

    if (!globalEnv.INVSEARCH_V3_URL) {
      throw new Error('globalEnv.INVSEARCH_V3_URL is undefined');
    }

    const invSearchNetworker = new InvSearchNetworker(
      globalEnv.INVSEARCH_V3_URL
    );
    const makeAndModelResponse = await invSearchNetworker.postInventory(
      dataForMakeAndModel
    );
    return transformResponse(makeAndModelResponse.data);
  } catch {
    return undefined;
  }
};

const getInventoryData = (
  filters?: string,
  makeAndModelMap?: MakeAndModels
): PostInventoryRequestData => {
  const filterData = getFilterData(filters, makeAndModelMap);
  return {
    ...filterData,
    // TODO: set "fulldetails" back to false when backend includes consignment data for that case.
    fulldetails: true,
    limit: INVENTORY_LIMIT,
    'sold-status': SoldStatus.FOR_SALE,
    source: `${globalEnv.NAME}-${globalEnv.VERSION}`,
  };
};

export const fetchInventoryData = async (
  filters?: string,
  makeAndModelMap?: MakeAndModels
): Promise<Inventory | undefined> => {
  const data = getInventoryData(filters, makeAndModelMap);

  try {
    if (!globalEnv.INVSEARCH_V3_URL) {
      throw new Error('globalEnv.INVSEARCH_V3_URL is undefined');
    }
    const invSearchNetworker = new InvSearchNetworker(
      globalEnv.INVSEARCH_V3_URL
    );
    const inventoryResponse = await invSearchNetworker.postInventory(data);
    return inventoryResponse.data;
  } catch {
    return undefined;
  }
};

export const fetchPopularCars = async (): Promise<Inventory | undefined> => {
  const data = {
    // TODO: set "fulldetails" back to false when backend includes consignment data for that case.
    fulldetails: true,
    limit: POPULAR_CAR_LIMIT,
    sortdirection: 'asc',
    'sold-status': SoldStatus.FOR_SALE,
    source: `${globalEnv.NAME}-${globalEnv.VERSION}`,
  };

  try {
    if (!globalEnv.INVSEARCH_V3_URL) {
      throw new Error('globalEnv.INVSEARCH_V3_URL is undefined');
    }
    const invSearchNetworker = new InvSearchNetworker(
      globalEnv.INVSEARCH_V3_URL
    );
    const inventoryResponse = await invSearchNetworker.postInventory(data);
    return inventoryResponse.data;
  } catch {
    return undefined;
  }
};
