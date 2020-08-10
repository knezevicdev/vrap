import {
  BodyType,
  Color,
  DriveType,
  Filters,
  FiltersData,
  MaxAndMin,
  SortBy,
  SortDirection,
  Transmission,
} from './types';
import {
  getFiltersDataFromFiltersQueryParam,
  getFiltersDataFromParams,
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

const mockUrl1 = `/cars/volvo/xc90/2018-2020?filters=${mockFiltersQueryParam1}`;
const mockUrl1WithoutFiltersQueryParam = `/cars/volvo/xc90/2018-2020`;
const mockUrl1WithoutParamsBasePath = `/volvo/xc90/2018-2020?filters=${mockFiltersQueryParam1}`;
const mockUrl1WithoutStuff = `/volvo/xc90/2018-2020`;

const mockFiltersData1WithoutFiltersQueryParam: FiltersData = {
  [Filters.MAKE_AND_MODELS]: [
    {
      makeSlug: 'volvo',
      modelSlugs: ['xc90'],
    },
  ],
  [Filters.YEAR]: {
    max: 2020,
    min: 2018,
  },
};

const mockParams2 = `/volvo/xc90/2018-2020`;
const mockFiltersData2: FiltersData = {
  [Filters.MAKE_AND_MODELS]: [
    {
      makeSlug: 'volvo',
      modelSlugs: ['xc90'],
    },
  ],
  [Filters.YEAR]: {
    max: 2020,
    min: 2018,
  },
};

const mockParams3 = `/types/coupe/ford`;
const mockFiltersData3: FiltersData = {
  [Filters.BODY_TYPES]: [BodyType.COUPE],
  [Filters.MAKE_AND_MODELS]: [
    {
      makeSlug: 'ford',
    },
  ],
};

const mockParams4 = `/types/truck`;
const mockFiltersData4: FiltersData = {
  [Filters.BODY_TYPES]: [BodyType.TRUCK],
};

const mockParams5 = `/volvo`;
const mockFiltersData5: FiltersData = {
  [Filters.MAKE_AND_MODELS]: [
    {
      makeSlug: 'volvo',
    },
  ],
};

const mockParams6 = `/volvo/xc90`;
const mockFiltersData6: FiltersData = {
  [Filters.MAKE_AND_MODELS]: [
    {
      makeSlug: 'volvo',
      modelSlugs: ['xc90'],
    },
  ],
};

const mockParams7 = `/volvo/xc90/2020`;
const mockFiltersData7: FiltersData = {
  [Filters.MAKE_AND_MODELS]: [
    {
      makeSlug: 'volvo',
      modelSlugs: ['xc90'],
    },
  ],
  [Filters.YEAR]: {
    max: 2020,
    min: 2020,
  },
};

const mockParams8 = `/volvo/all/2020`;
const mockFiltersData8: FiltersData = {
  [Filters.MAKE_AND_MODELS]: [
    {
      makeSlug: 'volvo',
    },
  ],
  [Filters.YEAR]: {
    max: 2020,
    min: 2020,
  },
};

describe('getYearParam', () => {
  test('1', () => {
    const mockYear: MaxAndMin = {
      max: 2020,
      min: 2020,
    };
    expect(getYearParam(mockYear)).toEqual('2020');
  });
  test('2', () => {
    const mockYear: MaxAndMin = {
      max: 2020,
      min: 2015,
    };
    expect(getYearParam(mockYear)).toEqual('2015-2020');
  });
});

describe('getParams', () => {
  test('1', () => {
    expect(getParams(undefined)).toEqual('/');
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
    expect(getParams(mockFiltersData)).toEqual('/volvo/xc80/2016-2019');
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.HATCHBACK],
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'volvo',
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
    expect(getParams(mockFiltersData)).toEqual('/volvo/all/2016-2019');
  });
  test('4', () => {
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
        min: 2019,
      },
    };
    expect(getParams(mockFiltersData)).toEqual('/volvo/xc80/2019');
  });
  test('5', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.HATCHBACK],
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'volvo',
        },
        {
          makeSlug: 'toyota',
          modelSlugs: ['prius'],
        },
      ],
      [Filters.YEAR]: {
        max: 2019,
        min: 2019,
      },
    };
    expect(getParams(mockFiltersData)).toEqual('/volvo/all/2019');
  });
  test('6', () => {
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
    };
    expect(getParams(mockFiltersData)).toEqual('/volvo/xc80');
  });
  test('7', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.HATCHBACK],
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'volvo',
        },
        {
          makeSlug: 'toyota',
          modelSlugs: ['prius'],
        },
      ],
    };
    expect(getParams(mockFiltersData)).toEqual('/types/hatchback/volvo');
  });
  test('8', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'volvo',
        },
        {
          makeSlug: 'toyota',
          modelSlugs: ['prius'],
        },
      ],
    };
    expect(getParams(mockFiltersData)).toEqual('/volvo');
  });
  test('9', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.HATCHBACK],
    };
    expect(getParams(mockFiltersData)).toEqual('/types/hatchback');
  });
  test('10', () => {
    const mockFiltersData: FiltersData = {
      [Filters.COLORS]: [Color.GREY],
      [Filters.DRIVE_TYPE]: [DriveType.AWD],
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
    expect(getParams(mockFiltersData)).toEqual('/');
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
    expect(
      getUrlFromFiltersData(mockFiltersData1, {
        addFiltersQueryParam: true,
      })
    ).toEqual(mockUrl1);
  });
  test('2', () => {
    expect(getUrlFromFiltersData(mockFiltersData1)).toEqual(
      mockUrl1WithoutFiltersQueryParam
    );
  });
  test('3', () => {
    expect(
      getUrlFromFiltersData(mockFiltersData1, {
        addFiltersQueryParam: true,
        ignoreParamsBasePath: true,
      })
    ).toEqual(mockUrl1WithoutParamsBasePath);
  });
  test('4', () => {
    expect(
      getUrlFromFiltersData(mockFiltersData1, {
        ignoreParamsBasePath: true,
      })
    ).toEqual(mockUrl1WithoutStuff);
  });
});

describe('getFiltersDataFromFiltersQueryParam', () => {
  test('1', () => {
    expect(getFiltersDataFromFiltersQueryParam(mockFiltersQueryParam1)).toEqual(
      mockFiltersData1
    );
  });
});

describe('getFiltersDataFromParams', () => {
  test('1', () => {
    expect(getFiltersDataFromParams(mockParams2)).toEqual(mockFiltersData2);
  });
  test('2', () => {
    expect(getFiltersDataFromParams(mockParams3)).toEqual(mockFiltersData3);
  });
  test('3', () => {
    expect(getFiltersDataFromParams(mockParams4)).toEqual(mockFiltersData4);
  });
  test('4', () => {
    expect(getFiltersDataFromParams(mockParams5)).toEqual(mockFiltersData5);
  });
  test('5', () => {
    expect(getFiltersDataFromParams(mockParams6)).toEqual(mockFiltersData6);
  });
  test('6', () => {
    expect(getFiltersDataFromParams(mockParams7)).toEqual(mockFiltersData7);
  });
  test('7', () => {
    expect(getFiltersDataFromParams(mockParams8)).toEqual(mockFiltersData8);
  });
  test('8', () => {
    expect(getFiltersDataFromParams('/randomMake/randomModel')).toEqual({
      [Filters.MAKE_AND_MODELS]: [
        { makeSlug: 'randomMake', modelSlugs: ['randomModel'] },
      ],
    });
  });
  test('9', () => {
    expect(getFiltersDataFromParams('/randomMake/randomModel/badYear')).toEqual(
      {
        [Filters.MAKE_AND_MODELS]: [
          { makeSlug: 'randomMake', modelSlugs: ['randomModel'] },
        ],
      }
    );
  });
  test('10', () => {
    expect(
      getFiltersDataFromParams('/randomMake/randomModel/badYear-2020')
    ).toEqual({
      [Filters.MAKE_AND_MODELS]: [
        { makeSlug: 'randomMake', modelSlugs: ['randomModel'] },
      ],
      [Filters.YEAR]: {
        max: 2020,
        min: 2020,
      },
    });
  });
  test('11', () => {
    expect(
      getFiltersDataFromParams('/randomMake/randomModel/2018-badYear')
    ).toEqual({
      [Filters.MAKE_AND_MODELS]: [
        { makeSlug: 'randomMake', modelSlugs: ['randomModel'] },
      ],
      [Filters.YEAR]: {
        max: 2018,
        min: 2018,
      },
    });
  });
  test('12', () => {
    expect(
      getFiltersDataFromParams('/randomMake/randomModel/badYear-badYear')
    ).toEqual({
      [Filters.MAKE_AND_MODELS]: [
        { makeSlug: 'randomMake', modelSlugs: ['randomModel'] },
      ],
    });
  });
});

describe('getFiltersDataFromUrl', () => {
  test('1', () => {
    expect(getFiltersDataFromUrl(mockUrl1)).toEqual(mockFiltersData1);
  });
  test('2', () => {
    expect(getFiltersDataFromUrl(mockUrl1WithoutFiltersQueryParam)).toEqual(
      mockFiltersData1WithoutFiltersQueryParam
    );
  });
});
