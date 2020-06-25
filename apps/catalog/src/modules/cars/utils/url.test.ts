import {
  BodyType,
  Color,
  DriveType,
  Filters,
  FiltersData,
  getDescriptorParam,
  getFiltersDataFromUrl,
  getParams,
  getQuery,
  getUrlFromFiltersData,
  getYearParam,
  isEnum,
  isEnumArray,
  isMake,
  isMakeAndModels,
  isMaxAndMin,
  isNumber,
  isObject,
  isSort,
  isString,
  isStringArray,
  Make,
  MakeAndModels,
  MaxAndMin,
  Sort,
  SortBy,
  SortDirection,
  Transmission,
} from './url';

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

const mockUrl1 = `/cars/volvo-xc90-suv/2018-2020?filters=${mockFiltersQueryParam1}`;

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
    expect(getDescriptorParam(mockFiltersData)).toEqual('/ford-f-150');
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
    expect(getDescriptorParam(mockFiltersData)).toEqual('/ford-f-150');
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
    expect(getDescriptorParam(mockFiltersData)).toEqual('/ford-focus-sedan');
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
      '/volvo-xc80-hatchback/2016-2019'
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

enum TestEnum {
  VALUE_1 = 'value1',
  VALUE_2 = 'value2',
}

describe('isEnum', () => {
  test('1', () => {
    const isTestEnum = isEnum(TestEnum);
    expect(isTestEnum(TestEnum.VALUE_1)).toBeTruthy();
    expect(isTestEnum(TestEnum.VALUE_2)).toBeTruthy();
    expect(isTestEnum('value1')).toBeTruthy();
    expect(isTestEnum('value2')).toBeTruthy();
    expect(isTestEnum('non-test-enum')).toBeFalsy();
  });
  test('2', () => {
    const isColor = isEnum(Color);
    expect(isColor(Color.BLACK)).toBeTruthy();
    expect(isColor(Color.RED)).toBeTruthy();
    expect(isColor('non-color')).toBeFalsy();
  });
});

describe('isEnumArray', () => {
  test('1', () => {
    const isTestEnumArray = isEnumArray(TestEnum);
    expect(isTestEnumArray([TestEnum.VALUE_1])).toBeTruthy();
    expect(isTestEnumArray([TestEnum.VALUE_1, TestEnum.VALUE_2])).toBeTruthy();
    expect(isTestEnumArray(['value1', 'value2'])).toBeTruthy();
    expect(isTestEnumArray(['non-test-enum'])).toBeFalsy();
    expect(isTestEnumArray(['non-test-enum', TestEnum.VALUE_2])).toBeFalsy();
    expect(isTestEnumArray([TestEnum.VALUE_1, 'non-test-enum'])).toBeFalsy();
    // Not arrays, should fail
    expect(isTestEnumArray(TestEnum.VALUE_1)).toBeFalsy();
    expect(isTestEnumArray(TestEnum.VALUE_2)).toBeFalsy();
    expect(isTestEnumArray('non-test-enum')).toBeFalsy();
  });
  test('2', () => {
    const isBodyTypeArray = isEnumArray(BodyType);
    expect(isBodyTypeArray([BodyType.CONVERTIBLE])).toBeTruthy();
    expect(isBodyTypeArray([BodyType.COUPE, BodyType.HATCHBACK])).toBeTruthy();
    expect(isBodyTypeArray(['non-body-type'])).toBeFalsy();
    expect(isBodyTypeArray(['non-body-type', BodyType.MINIVAN])).toBeFalsy();
    expect(isBodyTypeArray([BodyType.SEDAN, 'non-body-type'])).toBeFalsy();
    // Not arrays, should fail
    expect(isBodyTypeArray(BodyType.SUV)).toBeFalsy();
    expect(isBodyTypeArray(BodyType.TRUCK)).toBeFalsy();
    expect(isBodyTypeArray('non-body-type')).toBeFalsy();
  });
});

describe('isNumber', () => {
  test('1', () => {
    expect(isNumber(0)).toBeTruthy();
    expect(isNumber(42)).toBeTruthy();
    expect(isNumber('asdf')).toBeFalsy();
    expect(isNumber('0')).toBeFalsy();
    expect(isNumber(NaN)).toBeFalsy();
    expect(isNumber('42')).toBeFalsy();
  });
});

describe('isString', () => {
  test('1', () => {
    expect(isString('some-text')).toBeTruthy();
    expect(isString('0')).toBeTruthy();
    expect(isString('42')).toBeTruthy();
    expect(isString('')).toBeTruthy();
    expect(isString(0)).toBeFalsy();
    expect(isString(42)).toBeFalsy();
    expect(isString({})).toBeFalsy();
  });
});

describe('isStringArray', () => {
  test('1', () => {
    expect(isStringArray(['some-text'])).toBeTruthy();
    expect(isStringArray(['some-text', 'other-text'])).toBeTruthy();
    expect(isStringArray(['some-text', 0])).toBeFalsy();
    expect(isStringArray([42, 'other-text'])).toBeFalsy();
    expect(isStringArray('some-text')).toBeFalsy();
  });
});

describe('isObject', () => {
  test('1', () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject({ key: 'value' })).toBeTruthy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject(0)).toBeFalsy();
    expect(isObject('test')).toBeFalsy();
  });
});

describe('isMake', () => {
  test('1', () => {
    const make1: Make = {
      makeSlug: 'ford',
    };
    const make2: Make = {
      makeSlug: 'ford',
      modelSlugs: ['f-150'],
    };
    expect(isMake(make1)).toBeTruthy();
    expect(isMake(make2)).toBeTruthy();
    expect(isMake(0)).toBeFalsy();
    expect(isMake(null)).toBeFalsy();
    expect(isMake({})).toBeFalsy();
    expect(isMake({ makeSlug: 'ford', modelSlugs: 0 })).toBeFalsy();
    expect(isMake({ makeSlug: 'ford', modelSlugs: 'f-150' })).toBeFalsy();
  });
});

describe('isMakeAndModels', () => {
  test('1', () => {
    const makeAndModels1: MakeAndModels = [
      {
        makeSlug: 'mazda',
      },
      {
        makeSlug: 'ford',
        modelSlugs: ['f-150'],
      },
    ];
    expect(isMakeAndModels(makeAndModels1)).toBeTruthy();
    expect(isMakeAndModels([])).toBeTruthy();
    expect(isMakeAndModels([0])).toBeFalsy();
    expect(isMakeAndModels([{ key: 'value' }])).toBeFalsy();
  });
});

describe('isMaxAndMin', () => {
  test('1', () => {
    const maxAndMin1: MaxAndMin = {
      max: 10,
      min: 0,
    };
    expect(isMaxAndMin(maxAndMin1)).toBeTruthy();
    expect(isMaxAndMin({ min: 0 })).toBeFalsy();
    expect(isMaxAndMin({ max: 10 })).toBeFalsy();
    expect(isMaxAndMin(0)).toBeFalsy();
  });
});

describe('isSort', () => {
  test('1', () => {
    const sort1: Sort = {
      by: SortBy.YEAR,
      direction: SortDirection.ASCENDING,
    };
    const sort2: Sort = {
      by: SortBy.MILES,
      direction: SortDirection.DESCENDING,
    };
    expect(isSort(sort1)).toBeTruthy();
    expect(isSort(sort2)).toBeTruthy();
    expect(isSort(SortBy.MILES)).toBeFalsy();
    expect(isSort(SortDirection.ASCENDING)).toBeFalsy();
  });
});
