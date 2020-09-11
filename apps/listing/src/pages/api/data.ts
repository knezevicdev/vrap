/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-nested-ternary */

import { getFiltersDataFromUrl } from '@vroom-web/catalog-url-integration';
import {
  InvSearchNetworker,
  PostInventoryRequestData,
  SoldStatus,
} from '@vroom-web/inv-search-networking';
import { Brand } from '@vroom-web/ui';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import experimentSDK, {
  showDefaultVariant,
} from '../../integrations/experimentSDK';

import {
  INVENTORY_CARDS_PER_PAGE,
  POPULAR_CAR_LIMIT,
} from 'src/modules/cars/data';
import { getPostInventoryRequestDataFromFilterData } from 'src/modules/cars/store';
const NodeCache = require('node-cache');
const cache = new NodeCache();

const {
  publicRuntimeConfig: { INVSEARCH_V3_URL, NAME, VERSION },
} = getConfig();

const invSearchNetworker = new InvSearchNetworker(INVSEARCH_V3_URL);

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query } = req;
  const { data } = query;
  const { geo, url, brand, id } = JSON.parse(data as string);
  const filtersData = getFiltersDataFromUrl(url);

  const makesRequestData: PostInventoryRequestData = {
    fulldetails: false,
    limit: 1,
    sortdirection: 'asc',
    source: `${NAME}-${VERSION}`,
  };

  const popularCarsRequestData = {
    fulldetails: true,
    limit: POPULAR_CAR_LIMIT,
    sortdirection: 'asc',
    'sold-status': SoldStatus.FOR_SALE,
    source: `${NAME}-${VERSION}`,
  };

  const makesR = await invSearchNetworker.postInventory(makesRequestData);

  const popularCarsR = await invSearchNetworker.postInventory(
    popularCarsRequestData
  );

  const experimentsCache = cache.get('experiments');
  const experiments =
    brand === Brand.VROOM
      ? experimentsCache
        ? experimentsCache
        : await new Promise((resolve) => {
            experimentSDK
              .getRunningExperiments(id as string)
              .then((response) => {
                cache.set('experiments', response, 60);
                resolve(response);
              })
              .catch((error) => {
                console.log('Experiments failed - ', JSON.stringify(error));
                resolve([]);
              });
          })
      : [];

  const geoLocationSortDefaultVariant = showDefaultVariant(
    'snd-catalog-sort-by-geo-location',
    experiments,
    query
  );

  const postInventoryRequestDataFromFiltersData = getPostInventoryRequestDataFromFilterData(
    filtersData,
    geoLocationSortDefaultVariant,
    geo
  );

  const inventoryRequestData: PostInventoryRequestData = {
    ...postInventoryRequestDataFromFiltersData,
    fulldetails: true,
    limit: INVENTORY_CARDS_PER_PAGE,
    source: `${NAME}-${VERSION}`,
  };

  const carsR = await invSearchNetworker.postInventory(inventoryRequestData);
  const makes = makesR.data.aggregations.make_count.buckets;
  const popularCars = popularCarsR.data;
  const cars = carsR.data;

  res.status(200).json({
    cars: cars,
    experiments: experiments,
    makes: makes,
    popularCars: popularCars,
    geoLocationSortDefaultVariant: geoLocationSortDefaultVariant,
    filtersData: filtersData,
  });
};
