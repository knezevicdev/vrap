import {
  BodyType,
  Color,
  DriveType,
  Filters,
  FiltersData,
  SortBy,
  SortDirection,
  Transmission,
} from '@vroom-web/catalog-url-integration';
import { PostInventoryRequestData } from '@vroom-web/inv-search-networking';

import {
  BodyTypeAPI,
  ColorAPI,
  DriveTypeAPI,
  SortAPIBy,
  SortAPIDirection,
  TransmissionAPI,
} from './data';
import {
  getBodyTypeRequestData,
  getColorRequestData,
  getDriveTypeRequestData,
  getMakeAndModelRequestData,
  getOffsetRequestData,
  getPostInventoryRequestDataFromFilterData,
  getSortRequestData,
  getTransmissionRequestData,
} from './store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('getBodyTypeRequestData', () => {
  test('1', () => {
    const mockFiltersData: FiltersData = {};
    expect(getBodyTypeRequestData(mockFiltersData)).toBeUndefined();
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.COUPE],
    };
    expect(getBodyTypeRequestData(mockFiltersData)).toEqual([
      BodyTypeAPI.COUPE,
    ]);
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.HATCHBACK, BodyType.MINIVAN],
    };
    expect(getBodyTypeRequestData(mockFiltersData)).toEqual([
      BodyTypeAPI.HATCHBACK,
      BodyTypeAPI.MINIVAN,
    ]);
  });
});

describe('getColorRequestData', () => {
  test('1', () => {
    const mockFiltersData: FiltersData = {};
    expect(getColorRequestData(mockFiltersData)).toBeUndefined();
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.COLORS]: [Color.BLACK],
    };
    expect(getColorRequestData(mockFiltersData)).toEqual([ColorAPI.BLACK]);
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.COLORS]: [Color.GREEN, Color.RED],
    };
    expect(getColorRequestData(mockFiltersData)).toEqual([
      ColorAPI.GREEN,
      ColorAPI.RED,
    ]);
  });
});

describe('getDriveTypeRequestData', () => {
  test('1', () => {
    const mockFiltersData: FiltersData = {};
    expect(getDriveTypeRequestData(mockFiltersData)).toBeUndefined();
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.DRIVE_TYPE]: [DriveType.FWD],
    };
    expect(getDriveTypeRequestData(mockFiltersData)).toEqual([
      DriveTypeAPI.FWD,
    ]);
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.DRIVE_TYPE]: [DriveType.AWD, DriveType.FOUR_BY_FOUR],
    };
    expect(getDriveTypeRequestData(mockFiltersData)).toEqual([
      DriveTypeAPI.AWD,
      DriveTypeAPI.FOUR_BY_FOUR,
    ]);
  });
});

describe('getMakeAndModelRequestData', () => {
  test('1', () => {
    const mockFiltersData: FiltersData = {};
    expect(getMakeAndModelRequestData(mockFiltersData)).toEqual({
      makeSlug: undefined,
      modelSlug: undefined,
    });
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'nissan',
        },
      ],
    };
    expect(getMakeAndModelRequestData(mockFiltersData)).toEqual({
      makeSlug: ['nissan'],
      modelSlug: [],
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'nissan',
          modelSlugs: ['sentra'],
        },
      ],
    };
    expect(getMakeAndModelRequestData(mockFiltersData)).toEqual({
      makeSlug: [],
      modelSlug: ['sentra'],
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'nissan',
          modelSlugs: ['sentra'],
        },
        {
          makeSlug: 'volvo',
        },
      ],
    };
    expect(getMakeAndModelRequestData(mockFiltersData)).toEqual({
      makeSlug: ['volvo'],
      modelSlug: ['sentra'],
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'nissan',
          modelSlugs: ['sentra'],
        },
        {
          makeSlug: 'mazda',
        },
        {
          makeSlug: 'volvo',
          modelSlugs: ['xc80', 'xc90'],
        },
      ],
    };
    expect(getMakeAndModelRequestData(mockFiltersData)).toEqual({
      makeSlug: ['mazda'],
      modelSlug: ['sentra', 'xc80', 'xc90'],
    });
  });
});

describe('getOffsetRequestData', () => {
  test('1', () => {
    const mockFiltersData: FiltersData = {};
    expect(getOffsetRequestData(mockFiltersData)).toBeUndefined();
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.PAGE]: 1,
    };
    expect(getOffsetRequestData(mockFiltersData)).toEqual(0);
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.PAGE]: 2,
    };
    expect(getOffsetRequestData(mockFiltersData)).toEqual(24);
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.PAGE]: 6,
    };
    expect(getOffsetRequestData(mockFiltersData)).toEqual(120);
  });
});

describe('getSortRequestData', () => {
  test('1', () => {
    const mockFiltersData: FiltersData = {};
    expect(getSortRequestData(mockFiltersData)).toEqual({
      sortby: SortAPIBy.GEO,
      sortdirection: undefined,
      sortAgedDirection: SortDirection.DESCENDING,
    });
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.SORT]: {
        by: SortBy.MILES,
        direction: SortDirection.ASCENDING,
      },
    };
    expect(getSortRequestData(mockFiltersData)).toEqual({
      sortby: SortAPIBy.MILES,
      sortdirection: SortAPIDirection.ASCENDING,
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.SORT]: {
        by: SortBy.PRICE,
        direction: SortDirection.ASCENDING,
      },
    };
    expect(getSortRequestData(mockFiltersData)).toEqual({
      sortby: SortAPIBy.LISTING_PRICE,
      sortdirection: SortAPIDirection.ASCENDING,
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.SORT]: {
        by: SortBy.PRICE,
        direction: SortDirection.DESCENDING,
      },
    };
    expect(getSortRequestData(mockFiltersData)).toEqual({
      sortby: SortAPIBy.LISTING_PRICE,
      sortdirection: SortAPIDirection.DESCENDING,
    });
  });
  test('5', () => {
    const mockFiltersData: FiltersData = {
      [Filters.SORT]: {
        by: SortBy.YEAR,
        direction: SortDirection.DESCENDING,
      },
    };
    expect(getSortRequestData(mockFiltersData)).toEqual({
      sortby: SortAPIBy.YEAR,
      sortdirection: SortAPIDirection.DESCENDING,
    });
  });
});

describe('getTransmissionRequestData', () => {
  test('1', () => {
    const mockFiltersData: FiltersData = {};
    expect(getTransmissionRequestData(mockFiltersData)).toBeUndefined();
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.TRANSMISSION]: Transmission.AUTO,
    };
    expect(getTransmissionRequestData(mockFiltersData)).toEqual(
      TransmissionAPI.AUTO
    );
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.TRANSMISSION]: Transmission.MANUAL,
    };
    expect(getTransmissionRequestData(mockFiltersData)).toEqual(
      TransmissionAPI.MANUAL
    );
  });
});

describe('getPostInventoryRequestDataFromFilterData', () => {
  test('1', () => {
    const mockFiltersData1: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.SEDAN],
      [Filters.COLORS]: [Color.GREY],
    };
    const mockRequestData1: PostInventoryRequestData = {
      bodytype: ['Sedan'],
      color: ['grey'],
      cylinders: undefined,
      cylindersShowOther: undefined,
      drivetype: undefined,
      fuelType: undefined,
      makeSlug: undefined,
      miles: undefined,
      modelSlug: undefined,
      offset: undefined,
      optionalFeatures: undefined,
      price: undefined,
      searchall: undefined,
      sortAgedDirection: SortAPIDirection.DESCENDING,
      sortby: SortAPIBy.GEO,
      sortdirection: undefined,
      testdriveonly: undefined,
      transmissionid: undefined,
      year: undefined,
    };
    expect(getPostInventoryRequestDataFromFilterData(mockFiltersData1)).toEqual(
      mockRequestData1
    );
  });

  test('2', () => {
    const mockFiltersData2: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.SUV],
      [Filters.COLORS]: [Color.RED],
      [Filters.PRICE]: {
        max: 100000,
        min: 0,
      },
      [Filters.SORT]: {
        by: SortBy.PRICE,
        direction: SortDirection.ASCENDING,
      },
    };
    const mockRequestData2: PostInventoryRequestData = {
      bodytype: ['SUV'],
      color: ['red'],
      price: {
        max: 100000,
        min: 0,
      },
      sortby: 'listingPrice',
      sortdirection: 'asc',
    };
    expect(getPostInventoryRequestDataFromFilterData(mockFiltersData2)).toEqual(
      mockRequestData2
    );
  });

  test('3', () => {
    const mockFiltersData3: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.WAGON],
      [Filters.COLORS]: [Color.GREEN],
      [Filters.PRICE]: {
        max: 50000,
        min: 0,
      },
      [Filters.SORT]: {
        by: SortBy.YEAR,
        direction: SortDirection.DESCENDING,
      },
      [Filters.SEARCH]: 'random-search',
    };
    const mockRequestData3: PostInventoryRequestData = {
      bodytype: ['Wagon'],
      color: ['green'],
      price: {
        max: 50000,
        min: 0,
      },
      searchall: 'random-search',
      sortby: 'year',
      sortdirection: 'desc',
    };
    expect(getPostInventoryRequestDataFromFilterData(mockFiltersData3)).toEqual(
      mockRequestData3
    );
  });

  test('4', () => {
    const mockFiltersData4: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.MINIVAN],
      [Filters.COLORS]: [Color.PURPLE],
      [Filters.PRICE]: {
        max: 30000,
        min: 10000,
      },
      [Filters.SORT]: {
        by: SortBy.PRICE,
        direction: SortDirection.DESCENDING,
      },
      [Filters.PAGE]: 2,
      [Filters.TRANSMISSION]: Transmission.MANUAL,
    };
    const mockRequestData4: PostInventoryRequestData = {
      bodytype: ['Van Minivan'],
      color: ['purple'],
      price: {
        max: 30000,
        min: 10000,
      },
      offset: 24,
      sortby: 'listingPrice',
      sortdirection: 'desc',
      transmissionid: '1',
    };
    expect(getPostInventoryRequestDataFromFilterData(mockFiltersData4)).toEqual(
      mockRequestData4
    );
  });
});
