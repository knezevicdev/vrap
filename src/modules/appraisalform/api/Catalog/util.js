import * as qs from 'qs';
import { getCurrentPage } from '../../pages/Catalog/components/Inventory/util';

const inventoryLimitResponse = 25;

export const soldStatusEnum = {
  ALL_CARS: 'all_cars',
  FOR_SALE: 'for_sale',
  SALE_PENDING: 'sale_pending',
  SOLD: 'sold',
  DELIVERED: 'delivered'
};

const URLFilterKeys = {
  minPrice: 'price_min',
  maxPrice: 'price_max',
  transmission: 'transmission',
  sort: 'sort',
  search: 'search',
  miles: 'miles_max',
  flag: 'flag',
  color: 'color',
  driveType: 'driveType'
};

const getOffSetData = currentPage => {
  return (currentPage - 1) * inventoryLimitResponse;
};

const getTestDriveData = query => {
  const { [URLFilterKeys.flag]: flag } = query;
  return flag ? flag === 'testDrive' : false;
};

const getMakeAndModelData = (match, map) => {
  const {
    params: { make }
  } = match;

  const isActive = !!make && make !== 'all-makes';

  const mapDataFromUrl = (makeAndModelsFromUrl, makesAndModelsUrlMap) => {
    return makeAndModelsFromUrl.reduce(
      (data, makeOrModel) => {
        const { makes: makesMap, models: modelsMap } = makesAndModelsUrlMap;
        const makesKeys = Object.keys(makesMap);
        const modelsKeys = Object.keys(modelsMap);

        if (makesKeys.includes(makeOrModel)) {
          data['makes'].push(makesMap[makeOrModel]);
        } else if (modelsKeys.includes(makeOrModel)) {
          data['models'].push(modelsMap[makeOrModel]);
        }

        return data;
      },
      {
        makes: [],
        models: []
      }
    );
  };

  return isActive
    ? mapDataFromUrl(make.split(','), map)
    : {
        makes: [],
        models: []
      };
};

const getBodyTypeData = match => {
  const {
    params: { body }
  } = match;
  const isActive = !!body;

  const getBodyData = body => {
    const bodyParam = body.split(',');
    return bodyParam.reduce((current, param) => {
      switch (param) {
        case 'suv':
          current.push('SUV');
          break;
        case 'sedan':
          current.push('Sedan');
          break;
        case 'truck':
          current.push('Pickup Truck');
          break;
        case 'coupe':
          current.push('Coupe');
          break;
        case 'convertible':
          current.push('Convertible');
          break;
        case 'wagon':
          current.push('Wagon');
          break;
        case 'hatchback':
          current.push('Hatchback');
          break;
        case 'minivan':
          current.push('Van Minivan');
          break;
        default:
          break;
      }
      return current;
    }, []);
  };

  return isActive ? getBodyData(body) : [];
};

const getColorData = query => {
  const { [URLFilterKeys.color]: color } = query;
  const isActive = !!color;

  return isActive ? color.split(',') : [];
};

const getYearData = match => {
  const {
    params: { year }
  } = match;
  const isActive = !!year && year !== 'all-years';

  const getMaxAndMin = year => {
    const years = year.split(',');

    const max = Number(years[1]);
    const min = Number(years[0]);
    return { max: max, min: min };
  };

  return isActive ? getMaxAndMin(year) : {};
};

const getPriceData = query => {
  const {
    [URLFilterKeys.minPrice]: minPrice,
    [URLFilterKeys.maxPrice]: maxPrice
  } = query;
  const isActive = !!minPrice || !!maxPrice;

  const getMaxAndMin = (max, min) => {
    return { max: Number(max), min: Number(min) };
  };

  return isActive ? getMaxAndMin(maxPrice, minPrice) : {};
};

const getMilesData = query => {
  const { [URLFilterKeys.miles]: miles } = query;
  const isActive = !!miles;

  return isActive ? { max: Number(miles) } : {};
};

const getTransmissionData = query => {
  const { [URLFilterKeys.transmission]: transmission } = query;
  const isActive = !!transmission;

  return isActive ? (transmission === 'automatic' ? '0' : '1') : '';
};

const getDriveTypeData = query => {
  const { [URLFilterKeys.driveType]: driveType } = query;

  const isActive = !!driveType;

  const mapData = param => {
    return param.split(',').reduce((current, param) => {
      switch (param) {
        case '4x2':
          current.push('4x2');
          current.push('4X2');
          break;
        case '4x4':
          current.push('4x4');
          current.push('4X4');
          break;
        case 'AWD':
        case 'FWD':
        case 'RWD':
          current.push(param);
          break;
        default:
          break;
      }
      return current;
    }, []);
  };

  return isActive ? mapData(driveType) : [];
};

const getSortData = (query, sortExperiments) => {
  const {
    sortByMiles,
    catalogGeoLocationExperiment: {
      assignedVariant: geoLocationSortAssignedVariant
    }
  } = sortExperiments;
  const { [URLFilterKeys.sort]: sort } = query;
  const isActive = !!sort;

  return isActive
    ? {
        sortby:
          sort === 'price_desc' || sort === 'price' ? 'listingPrice' : sort,
        sortdirection: sort === 'price_desc' || sort === 'year' ? 'desc' : 'asc'
      }
    : {
        sortby: geoLocationSortAssignedVariant ? 'geo' : 'hasStockPhotos',
        sortdirection: 'asc'
      };
};

const getSearchData = query => {
  const { [URLFilterKeys.search]: search } = query;
  const isActive = !!search;
  return isActive ? search : '';
};

const getFetchData = (location, match, makesAndModelsUrlMap, experiments) => {
  // const sortBy =
  const { search } = location;
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const currentPage = getCurrentPage(query);
  const makeAndModelData = getMakeAndModelData(match, makesAndModelsUrlMap);
  return {
    offset: getOffSetData(currentPage),
    fulldetails: true,
    limit: inventoryLimitResponse,
    testdriveonly: getTestDriveData(query),
    make: makeAndModelData.makes,
    model: makeAndModelData.models,
    bodytype: getBodyTypeData(match),
    color: getColorData(query),
    year: getYearData(match),
    price: getPriceData(query),
    miles: getMilesData(query),
    transmissionid: getTransmissionData(query),
    drivetype: getDriveTypeData(query),
    sortby: getSortData(query, experiments).sortby,
    sortdirection: getSortData(query, experiments).sortdirection,
    searchall: getSearchData(query)
  };
};

const getFiltersFromUrl = (location, match) => {
  const { search } = location;
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const currentPage = getCurrentPage(query);

  return {
    offset: getOffSetData(currentPage),
    testdriveonly: getTestDriveData(query),
    makeandmodels: match.params.make,
    bodytype: getBodyTypeData(match),
    color: getColorData(query),
    year: getYearData(match),
    price: getPriceData(query),
    miles: getMilesData(query),
    transmissionid: getTransmissionData(query),
    drivetype: getDriveTypeData(query),
    sortby: getSortData(query).sortby,
    sortdirection: getSortData(query).sortdirection,
    searchall: getSearchData(query)
  };
};

export { getFetchData, getFiltersFromUrl, inventoryLimitResponse };
