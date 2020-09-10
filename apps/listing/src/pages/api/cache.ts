import {
  InvSearchNetworker,
  PostInventoryRequestData,
} from '@vroom-web/inv-search-networking';
import { Brand } from '@vroom-web/ui';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

import experimentSDK from 'src/integrations/experimentSDK';

const {
  publicRuntimeConfig: { INVSEARCH_V3_URL, NAME, VERSION },
} = getConfig();

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { query } = req;
  const { data } = query;
  const { brand, id } = JSON.parse(data as string);

  const makesRequestData: PostInventoryRequestData = {
    fulldetails: false,
    limit: 1,
    sortdirection: 'asc',
    source: `${NAME}-${VERSION}`,
  };

  const invSearchNetworker = new InvSearchNetworker(INVSEARCH_V3_URL);

  const makes = await new Promise((resolve) => {
    const timer = setTimeout(() => {
      console.log('Makes & Model took longer than 1 second');
      resolve(undefined);
    }, 1000);

    invSearchNetworker
      .postInventory(makesRequestData)
      .then((response) => {
        const makes = response.data.aggregations.make_count.buckets;
        clearTimeout(timer);
        resolve(makes);
      })
      .catch((error) => {
        console.log('Makes & Model failed - ', JSON.stringify(error));
        clearTimeout(timer);
        resolve(undefined);
      });
  });

  const experiments =
    brand === Brand.VROOM
      ? await new Promise((resolve) => {
          const timer = setTimeout(() => {
            console.log('Experiments took longer than 1 second');
            resolve([]);
          }, 1000);

          experimentSDK
            .getRunningExperiments(id as string)
            .then((response) => {
              resolve(response);
              clearTimeout(timer);
            })
            .catch((error) => {
              console.log('Experiments failed - ', JSON.stringify(error));
              clearTimeout(timer);
              resolve([]);
            });
        })
      : [];

  res.status(200).json({
    experiments: experiments,
    makes: makes,
  });
};
