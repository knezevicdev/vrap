import {
  BodyType,
  Color,
  DriveType,
  Filters,
  FiltersData,
  SortBy,
  SortDirection,
  Transmission,
} from './types';
import {
  getDescriptorParam,
  getFiltersDataFromUrl,
  getParams,
  getQuery,
  getUrlFromFiltersData,
  getYearParam,
} from './urlTransformations';

const mockFiltersData1: FiltersData = {
  [Filters.BODY_TYPES]: [BodyType.SUV],
  [Filters.COLORS]: [Color.GREY],
  [Filters.DRIVE_TYPE]: [DriveType.AWD],
  [Filters.MAKE_AND_MODELS]: [
    {
      makeSlug: 'volvo',
      modelSlugs: ['xc90'],
    },
  ],
  [Filters.MILES]: {
    max: 100000,
    min: 0,
  },
  [Filters.PAGE]: 0,
  [Filters.PRICE]: {
    max: 100000,
    min: 0,
  },
  [Filters.SEARCH]: 'search',
  [Filters.SORT]: {
    by: SortBy.MILES,
    direction: SortDirection.ASCENDING,
  },
  [Filters.TRANSMISSION]: Transmission.AUTO,
  [Filters.YEAR]: {
    max: 2020,
    min: 2018,
  },
};

const mockFiltersQueryParam1 =
  'eyJib2R5dHlwZXMiOlsic3V2Il0sImNvbG9ycyI6WyJncmV5Il0sImRyaXZldHlwZSI6WyJhd2QiXSwibWFrZXNhbmRtb2RlbHMiOlt7Im1ha2VTbHVnIjoidm9sdm8iLCJtb2RlbFNsdWdzIjpbInhjOTAiXX1dLCJtaWxlcyI6eyJtYXgiOjEwMDAwMCwibWluIjowfSwicGFnZSI6MCwicHJpY2UiOnsibWF4IjoxMDAwMDAsIm1pbiI6MH0sInNlYXJjaCI6InNlYXJjaCIsInNvcnQiOnsiYnkiOiJtaWxlcyIsImRpcmVjdGlvbiI6ImFzYyJ9LCJ0cmFuc21pc3Npb24iOiJhdXRvIiwieWVhciI6eyJtYXgiOjIwMjAsIm1pbiI6MjAxOH19';

const mockUrl1 = `/cars/volvo/xc90/suv/2018-2020?filters=${mockFiltersQueryParam1}`;

describe('getDescriptorParam', () => {
  test('1', () => {
    const mockFiltersData: FiltersData = {};
    expect(getDescriptorParam(mockFiltersData)).toEqual('');
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'ford',
        },
      ],
    };
    expect(getDescriptorParam(mockFiltersData)).toEqual('/ford');
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'ford',
          modelSlugs: ['f-150'],
        },
      ],
    };
    expect(getDescriptorParam(mockFiltersData)).toEqual('/ford/f-150');
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'ford',
          modelSlugs: ['f-150', 'f-250'],
        },
        {
          makeSlug: 'volvo',
          modelSlugs: ['fxc90'],
        },
      ],
    };
    expect(getDescriptorParam(mockFiltersData)).toEqual('/ford/f-150');
  });
  test('5', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.SEDAN],
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'ford',
          modelSlugs: ['focus'],
        },
      ],
    };
    expect(getDescriptorParam(mockFiltersData)).toEqual('/ford/focus/sedan');
  });
  test('6', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.TRUCK],
    };
    expect(getDescriptorParam(mockFiltersData)).toEqual('/truck');
  });
});

describe('getYearParam', () => {
  test('1', () => {
    const mockFiltersData: FiltersData = {};
    expect(getYearParam(mockFiltersData)).toEqual('');
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.YEAR]: {
        max: 2020,
        min: 2020,
      },
    };
    expect(getYearParam(mockFiltersData)).toEqual('/2020');
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.YEAR]: {
        max: 2020,
        min: 2015,
      },
    };
    expect(getYearParam(mockFiltersData)).toEqual('/2015-2020');
  });
});

describe('getParams', () => {
  test('1', () => {
    expect(getParams(undefined)).toEqual('');
  });
  test('2', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.HATCHBACK],
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'volvo',
          modelSlugs: ['xc80', 'xc90'],
        },
        {
          makeSlug: 'toyota',
          modelSlugs: ['prius'],
        },
      ],
      [Filters.YEAR]: {
        max: 2019,
        min: 2016,
      },
    };
    expect(getParams(mockFiltersData)).toEqual(
      '/volvo/xc80/hatchback/2016-2019'
    );
  });
});

describe('getQuery', () => {
  test('1', () => {
    expect(getQuery(undefined)).toEqual('');
  });
  test('2', () => {
    expect(getQuery(mockFiltersData1)).toEqual(
      `?filters=${mockFiltersQueryParam1}`
    );
  });
});

describe('getUrlFromFiltersData', () => {
  test('1', () => {
    expect(getUrlFromFiltersData(mockFiltersData1)).toEqual(mockUrl1);
  });
});

describe('getFiltersDataFromUrl', () => {
  test('1', () => {
    expect(getFiltersDataFromUrl(mockFiltersQueryParam1)).toEqual(
      mockFiltersData1
    );
  });
});
