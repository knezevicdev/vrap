import { getFetchData } from './util';
import { post } from '../httpHandlers';
import { page, track } from '../../lib/analytics/AnalyticsLib';
import { globalConfig } from '../../lib/globalConfig';
import { parseQueryString } from '../../lib/utils/utils';
import { isEmpty } from 'lodash';
import { soldStatusEnum } from '../../api/Catalog/util';
import { getThemedPath, PATHS } from '../../constants/routes';

const { INVSEARCH_V3 } = globalConfig;
const { BROWSER } = process.env;

const getInventory = async data => {
  const response = await post(`${INVSEARCH_V3}/v3/inventory`, data);

  const {
    data: {
      hits: { hits, total }
    }
  } = response;

  return { vehicles: hits, total: total };
};

const cleanFilterParams = function (params) {
  let newParams = { ...params };
  if (params.make === 'all-makes' || params.make === undefined) {
    delete newParams.make;
  }
  if (params.year === 'all-years' || params.year === undefined) {
    delete newParams.year;
  }
  if (params.body === 'all-bodies' || params.body === undefined) {
    delete newParams.body;
  }
  return newParams;
}

const getMakeAndModelInfo = async () => {
  const data = {
    fulldetails: false,
    limit: 10,
    sortdirection: 'asc'
  };

  const response = await post(`${INVSEARCH_V3}/v3/inventory`, data);

  const {
    data: {
      aggregations: {
        make_count: { buckets }
      },
      hits: { hits }
    }
  } = response;

  const makeAndModelData = buckets.reduce(
    (data, make) => {
      const {
        key,
        model_count: { buckets }
      } = make;

      data['makesAndModels'][key] = buckets.reduce((modelData, model) => {
        const { key, doc_count } = model;
        modelData[key] = doc_count;

        const modelUrlKey = `${make.key}_${key.replace(
          /\s/g,
          '_'
        )}`.toLowerCase();
        data['makesAndModelsUrlMap']['models'][modelUrlKey] = key;
        return modelData;
      }, {});

      const makeUrlKey = `${key.replace(/\s/g, '_')}`.toLowerCase();

      data['makesAndModelsUrlMap']['makes'][makeUrlKey] = key;

      return data;
    },
    {
      makesAndModels: {},
      makesAndModelsUrlMap: {
        makes: {},
        models: {}
      }
    }
  );

  return { ...makeAndModelData, popularVehicles: hits };
};

const getCatalogData = async (location, match, experiments, theme) => {
  const makeAndModelData = await getMakeAndModelInfo();
  const { makesAndModelsUrlMap } = makeAndModelData;
  const data = getFetchData(location, match, makesAndModelsUrlMap, experiments);
  const inventory = await getInventory(data);
  const products = inventory.vehicles.map((product, index) => {
    const {
      inventoryId,
      vin,
      make,
      model,
      year,
      listingPrice,
      soldStatus,
      leadFlagPhotoUrl,
      defectPhotos,
      consignmentPartnerId,
      hasStockPhotos
    } = product._source;

    const checkPhotoType = () => {
      if (isEmpty(leadFlagPhotoUrl)) {
        return 'Illustration';
      } else if (hasStockPhotos) {
        return 'Stock';
      }
      return 'Vroom';
    };

    const vehiclePath = `${make} ${model} ${year}`
      .replace(/\s+/g, '-')
      .toLowerCase();
    const inventoryPath = getThemedPath(PATHS.inventory.prefix, theme);
    const pathname = `${inventoryPath}/${vehiclePath}-${vin.toUpperCase()}`;

    return {
      sku: inventoryId,
      vin: vin,
      url: pathname,
      name: `${year}-${make}-${model}`,
      make: make,
      model: model,
      year: year,
      price: listingPrice,
      position: index + 1,
      soldStatus:
        soldStatus === 0
          ? soldStatusEnum.FOR_SALE
          : soldStatusEnum.SALE_PENDING,
      imageUrl: leadFlagPhotoUrl,
      defectPhotos: !!defectPhotos,
      photoType: checkPhotoType(),
      inventoryType: !isEmpty(consignmentPartnerId) ? 'Consignment' : 'Vroom',
      partnerId: consignmentPartnerId
    };
  });
  const filterParams = cleanFilterParams(match.params);
  const query = parseQueryString(location.search);
  delete query.page;
  const filterData = { ...filterParams };

  const buildSortData = () => {
    let returnArray = [];
    for (const [key, value] of Object.entries(query)) {
      const direction = value.includes('_desc') ? 'desc' : 'asc';
      const type = value.split('_');
      returnArray.push({ type: type[0], value: direction });
    }
    return returnArray;
  };

  const sortData = isEmpty(query)
    ? { type: 'hasStockPhotos', value: 'asc' }
    : buildSortData();
  BROWSER &&
    page({
      category: 'Catalog',
      pageName: 'Product List Viewed',
      nonInteraction: '1',
      products: products
    });
  BROWSER &&
    !isEmpty(filterData) &&
    track({
      category: 'Catalog',
      eventName: 'Product List Filtered',
      sorts: sortData,
      filters: { ...filterData },
      products: products
    });

  return { inventory: inventory, makeAndModelData: makeAndModelData };
};

export { getCatalogData };
