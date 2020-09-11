import { getFiltersDataFromUrl } from '@vroom-web/catalog-url-integration';
import {
  InvSearchNetworker,
  PostInventoryRequestData,
} from '@vroom-web/inv-search-networking';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import { showDefaultVariant } from '../../integrations/experimentSDK';

import { INVENTORY_CARDS_PER_PAGE } from 'src/modules/cars/data';
import { getPostInventoryRequestDataFromFilterData } from 'src/modules/cars/store';

const {
  publicRuntimeConfig: { INVSEARCH_V3_URL, NAME, VERSION },
} = getConfig();

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query } = req;
  const { data } = query;
  const dev = process.env.NODE_ENV !== 'production';
  const timeout = dev ? 3000 : 1000;
  const { geo, url } = JSON.parse(data as string);
  const filtersData = getFiltersDataFromUrl(url);
  const invSearchNetworker = new InvSearchNetworker(INVSEARCH_V3_URL);

  const cache = await axios.get(
    `http://localhost:3000/cars/api/cache?data=${data}`
  );

  const { experiments, popularCars, makes } = cache.data;

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

  const cars = await new Promise((resolve) => {
    const timer = setTimeout(() => {
      console.log(`Car results took longer than ${timeout}ms.`);
      resolve(undefined);
    }, timeout);

    invSearchNetworker
      .postInventory(inventoryRequestData)
      .then((response) => {
        const cars = response.data;
        clearTimeout(timer);
        resolve(cars);
      })
      .catch((error) => {
        console.log('Car results failed - ', JSON.stringify(error));
        clearTimeout(timer);
        resolve(undefined);
      });
  });

  res.status(200).json({
    cars: cars,
    experiments: experiments,
    makes: makes,
    popularCars: popularCars,
    geoLocationSortDefaultVariant: geoLocationSortDefaultVariant,
    filtersData: filtersData,
  });
};
