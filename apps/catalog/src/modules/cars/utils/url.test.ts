import {
  addAllModels,
  addBodyType,
  addColor,
  addDriveType,
  addModel,
  BodyType,
  Color,
  deepCopyFiltersData,
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
  removeAllModels,
  removeBodyType,
  removeColor,
  removeDriveType,
  removeModel,
  resetFilter,
  resetFilters,
  setMiles,
  setPage,
  setPrice,
  setSearch,
  setSort,
  setTransmission,
  setYear,
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

describe('resetFilter', () => {
  test('1', () => {
    expect(resetFilter(Filters.BODY_TYPES, mockFiltersData1)).toEqual({
      bodytypes: undefined,
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('2', () => {
    expect(resetFilter(Filters.MAKE_AND_MODELS, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: undefined,
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('resetFilters', () => {
  test('1', () => {
    expect(
      resetFilters([Filters.BODY_TYPES, Filters.PRICE], mockFiltersData1)
    ).toEqual({
      bodytypes: undefined,
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: undefined,
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('2', () => {
    expect(
      resetFilters([Filters.DRIVE_TYPE, Filters.TRANSMISSION], mockFiltersData1)
    ).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: undefined,
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: undefined,
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('deepCopyFiltersData', () => {
  test('1', () => {
    const filtersDataDeepCopy = deepCopyFiltersData(mockFiltersData1);
    expect(filtersDataDeepCopy).not.toBe(mockFiltersData1);
  });
});

describe('addBodyType', () => {
  test('1', () => {
    expect(addBodyType(BodyType.CONVERTIBLE, undefined)).toEqual({
      bodytypes: ['convertible'],
    });
  });
  test('2', () => {
    expect(addBodyType(BodyType.CONVERTIBLE, mockFiltersData1)).toEqual({
      bodytypes: ['suv', 'convertible'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {};
    expect(addBodyType(BodyType.COUPE, mockFiltersData)).toEqual({
      bodytypes: ['coupe'],
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.HATCHBACK],
    };
    expect(addBodyType(BodyType.MINIVAN, mockFiltersData)).toEqual({
      bodytypes: ['hatchback', 'minivan'],
    });
  });
});

describe('removeBodyType', () => {
  test('1', () => {
    expect(removeBodyType(BodyType.TRUCK, undefined)).toEqual({
      bodytypes: undefined,
    });
  });
  test('2', () => {
    expect(removeBodyType(BodyType.SEDAN, {})).toEqual({
      bodytypes: undefined,
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.SEDAN],
    };
    expect(removeBodyType(BodyType.SEDAN, mockFiltersData)).toEqual({
      bodytypes: undefined,
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.SEDAN, BodyType.SUV],
    };
    expect(removeBodyType(BodyType.SUV, mockFiltersData)).toEqual({
      bodytypes: ['sedan'],
    });
  });
  test('5', () => {
    const mockFiltersData: FiltersData = {
      [Filters.BODY_TYPES]: [BodyType.SEDAN, BodyType.SUV],
    };
    expect(removeBodyType(BodyType.TRUCK, mockFiltersData)).toEqual({
      bodytypes: ['sedan', 'suv'],
    });
  });
  test('6', () => {
    expect(removeBodyType(BodyType.SUV, mockFiltersData1)).toEqual({
      bodytypes: undefined,
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('addColor', () => {
  test('1', () => {
    expect(addColor(Color.BLACK, undefined)).toEqual({
      colors: ['black'],
    });
  });
  test('2', () => {
    expect(addColor(Color.RED, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey', 'red'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {};
    expect(addColor(Color.BLUE, mockFiltersData)).toEqual({
      colors: ['blue'],
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.COLORS]: [Color.BROWN],
    };
    expect(addColor(Color.PURPLE, mockFiltersData)).toEqual({
      colors: ['brown', 'purple'],
    });
  });
});

describe('removeColor', () => {
  test('1', () => {
    expect(removeColor(Color.BLACK, undefined)).toEqual({
      colors: undefined,
    });
  });
  test('2', () => {
    expect(removeColor(Color.BLUE, {})).toEqual({
      colors: undefined,
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.COLORS]: [Color.BROWN],
    };
    expect(removeColor(Color.BROWN, mockFiltersData)).toEqual({
      colors: undefined,
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.COLORS]: [Color.GOLD, Color.GREEN],
    };
    expect(removeColor(Color.GREEN, mockFiltersData)).toEqual({
      colors: ['gold'],
    });
  });
  test('5', () => {
    const mockFiltersData: FiltersData = {
      [Filters.COLORS]: [Color.GREY, Color.ORANGE],
    };
    expect(removeColor(Color.PURPLE, mockFiltersData)).toEqual({
      colors: ['grey', 'orange'],
    });
  });
  test('6', () => {
    expect(removeColor(Color.GREY, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: undefined,
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('addDriveType', () => {
  test('1', () => {
    expect(addDriveType(DriveType.AWD, undefined)).toEqual({
      drivetype: ['awd'],
    });
  });
  test('2', () => {
    expect(addDriveType(DriveType.FOUR_BY_FOUR, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd', '4x4'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {};
    expect(addDriveType(DriveType.FWD, mockFiltersData)).toEqual({
      drivetype: ['fwd'],
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.DRIVE_TYPE]: [DriveType.AWD],
    };
    expect(addDriveType(DriveType.RWD, mockFiltersData)).toEqual({
      drivetype: ['awd', 'rwd'],
    });
  });
});

describe('removeDriveType', () => {
  test('1', () => {
    expect(removeDriveType(DriveType.AWD, undefined)).toEqual({
      drivetype: undefined,
    });
  });
  test('2', () => {
    expect(removeDriveType(DriveType.FOUR_BY_FOUR, {})).toEqual({
      drivetype: undefined,
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.DRIVE_TYPE]: [DriveType.FWD],
    };
    expect(removeDriveType(DriveType.FWD, mockFiltersData)).toEqual({
      drivetype: undefined,
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.DRIVE_TYPE]: [DriveType.FOUR_BY_FOUR, DriveType.FWD],
    };
    expect(removeDriveType(DriveType.FOUR_BY_FOUR, mockFiltersData)).toEqual({
      drivetype: ['fwd'],
    });
  });
  test('5', () => {
    const mockFiltersData: FiltersData = {
      [Filters.DRIVE_TYPE]: [DriveType.RWD, DriveType.AWD],
    };
    expect(removeDriveType(DriveType.FOUR_BY_FOUR, mockFiltersData)).toEqual({
      drivetype: ['rwd', 'awd'],
    });
  });
  test('6', () => {
    expect(removeDriveType(DriveType.AWD, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: undefined,
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('setTransmission', () => {
  test('1', () => {
    expect(setTransmission(Transmission.AUTO, undefined)).toEqual({
      transmission: 'auto',
    });
  });
  test('2', () => {
    expect(setTransmission(Transmission.MANUAL, {})).toEqual({
      transmission: 'manual',
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.TRANSMISSION]: Transmission.AUTO,
    };
    expect(setTransmission(Transmission.MANUAL, mockFiltersData)).toEqual({
      transmission: 'manual',
    });
  });
  test('4', () => {
    expect(setTransmission(Transmission.MANUAL, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'manual',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('addAllModels', () => {
  test('1', () => {
    expect(addAllModels('ford', undefined)).toEqual({
      makesandmodels: [{ makeSlug: 'ford' }],
    });
  });
  test('2', () => {
    expect(addAllModels('mazda', {})).toEqual({
      makesandmodels: [{ makeSlug: 'mazda' }],
    });
  });
  test('3', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'volvo',
        },
      ],
    };
    expect(addAllModels('volvo', mockFiltersData)).toEqual({
      makesandmodels: [{ makeSlug: 'volvo' }],
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'volvo',
        },
      ],
    };
    expect(addAllModels('ford', mockFiltersData)).toEqual({
      makesandmodels: [{ makeSlug: 'volvo' }, { makeSlug: 'ford' }],
    });
  });
  test('5', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'volvo',
          modelSlugs: ['xc90'],
        },
        {
          makeSlug: 'ford',
        },
      ],
    };
    expect(addAllModels('volvo', mockFiltersData)).toEqual({
      makesandmodels: [{ makeSlug: 'ford' }, { makeSlug: 'volvo' }],
    });
  });
  test('6', () => {
    expect(addAllModels('toyota', mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [
        { makeSlug: 'volvo', modelSlugs: ['xc90'] },
        { makeSlug: 'toyota' },
      ],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('removeAllModels', () => {
  test('1', () => {
    expect(removeAllModels('ford', undefined)).toEqual({
      makesandmodels: undefined,
    });
  });
  test('2', () => {
    expect(removeAllModels('ford', {})).toEqual({
      makesandmodels: undefined,
    });
  });
  test('3', () => {
    expect(removeAllModels('ford', mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('4', () => {
    expect(removeAllModels('volvo', mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: undefined,
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('5', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'mazda',
        },
        {
          makeSlug: 'volvo',
          modelSlugs: ['xc90'],
        },
      ],
    };
    expect(removeAllModels('mazda', mockFiltersData)).toEqual({
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
    });
  });
});

describe('addModel', () => {
  test('1', () => {
    expect(addModel('ford', 'f-150', undefined)).toEqual({
      makesandmodels: [{ makeSlug: 'ford', modelSlugs: ['f-150'] }],
    });
  });
  test('2', () => {
    expect(addModel('volvo', 'xc90', {})).toEqual({
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
    });
  });
  test('3', () => {
    expect(addModel('volvo', 'xc90', mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('3', () => {
    expect(addModel('volvo', 'xc60', mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90', 'xc60'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'ford',
          modelSlugs: ['f-150'],
        },
        {
          makeSlug: 'toyota',
          modelSlugs: ['camry'],
        },
      ],
    };
    expect(addModel('volvo', 'xc90', mockFiltersData)).toEqual({
      makesandmodels: [
        { makeSlug: 'ford', modelSlugs: ['f-150'] },
        { makeSlug: 'toyota', modelSlugs: ['camry'] },
        { makeSlug: 'volvo', modelSlugs: ['xc90'] },
      ],
    });
  });
  test('5', () => {
    expect(addModel('bmw', '300', mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [
        { makeSlug: 'volvo', modelSlugs: ['xc90'] },
        {
          makeSlug: 'bmw',
          modelSlugs: ['300'],
        },
      ],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('removeModel', () => {
  test('1', () => {
    expect(removeModel('ford', 'f-150', undefined)).toEqual({
      makesandmodels: undefined,
    });
  });
  test('2', () => {
    expect(removeModel('ford', 'f-150', {})).toEqual({
      makesandmodels: undefined,
    });
  });
  test('3', () => {
    expect(removeModel('volvo', 'xc90', mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: undefined,
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('3', () => {
    expect(removeModel('toyota', 'camry', mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [
        {
          makeSlug: 'volvo',
          modelSlugs: ['xc90'],
        },
      ],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
  test('4', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'ford',
          modelSlugs: ['f-150'],
        },
        {
          makeSlug: 'toyota',
          modelSlugs: ['camry'],
        },
        {
          makeSlug: 'volvo',
          modelSlugs: ['xc90'],
        },
      ],
    };
    expect(removeModel('toyota', 'camry', mockFiltersData)).toEqual({
      makesandmodels: [
        { makeSlug: 'ford', modelSlugs: ['f-150'] },
        { makeSlug: 'volvo', modelSlugs: ['xc90'] },
      ],
    });
  });
  test('5', () => {
    const mockFiltersData: FiltersData = {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: 'ford',
          modelSlugs: ['f-150'],
        },
        {
          makeSlug: 'toyota',
          modelSlugs: ['camry', 'prius'],
        },
        {
          makeSlug: 'volvo',
          modelSlugs: ['xc90'],
        },
      ],
    };
    expect(removeModel('toyota', 'camry', mockFiltersData)).toEqual({
      makesandmodels: [
        { makeSlug: 'ford', modelSlugs: ['f-150'] },
        { makeSlug: 'volvo', modelSlugs: ['xc90'] },
        { makeSlug: 'toyota', modelSlugs: ['prius'] },
      ],
    });
  });
});

describe('setMiles', () => {
  test('1', () => {
    expect(setMiles({ min: 30, max: 10000 }, undefined)).toEqual({
      miles: { max: 10000, min: 30 },
    });
  });
  test('2', () => {
    expect(setMiles({ min: 30, max: 10000 }, {})).toEqual({
      miles: { max: 10000, min: 30 },
    });
  });
  test('3', () => {
    expect(setMiles({ min: 30, max: 10000 }, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 10000, min: 30 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('setPage', () => {
  test('1', () => {
    expect(setPage(42, undefined)).toEqual({
      page: 42,
    });
  });
  test('2', () => {
    expect(setPage(42, {})).toEqual({
      page: 42,
    });
  });
  test('3', () => {
    expect(setPage(42, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 42,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('setPrice', () => {
  test('1', () => {
    expect(setPrice({ min: 30, max: 10000 }, undefined)).toEqual({
      price: { max: 10000, min: 30 },
    });
  });
  test('2', () => {
    expect(setPrice({ min: 30, max: 10000 }, {})).toEqual({
      price: { max: 10000, min: 30 },
    });
  });
  test('3', () => {
    expect(setPrice({ min: 30, max: 10000 }, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 10000, min: 30 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('setSearch', () => {
  test('1', () => {
    expect(setSearch('something', undefined)).toEqual({
      search: 'something',
    });
  });
  test('2', () => {
    expect(setSearch('something', {})).toEqual({
      search: 'something',
    });
  });
  test('3', () => {
    expect(setSearch('something', mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'something',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('setSort', () => {
  test('1', () => {
    expect(setSort(SortBy.MILES, SortDirection.ASCENDING, undefined)).toEqual({
      sort: {
        by: 'miles',
        direction: 'asc',
      },
    });
  });
  test('2', () => {
    expect(setSort(SortBy.PRICE, SortDirection.ASCENDING, {})).toEqual({
      sort: {
        by: 'price',
        direction: 'asc',
      },
    });
  });
  test('3', () => {
    expect(
      setSort(SortBy.YEAR, SortDirection.DESCENDING, mockFiltersData1)
    ).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'year', direction: 'desc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
    });
  });
});

describe('setYear', () => {
  test('1', () => {
    expect(setYear({ min: 2001, max: 2007 }, undefined)).toEqual({
      year: { max: 2007, min: 2001 },
    });
  });
  test('2', () => {
    expect(setYear({ min: 2002, max: 2008 }, {})).toEqual({
      year: { max: 2008, min: 2002 },
    });
  });
  test('3', () => {
    expect(setYear({ min: 2003, max: 2009 }, mockFiltersData1)).toEqual({
      bodytypes: ['suv'],
      colors: ['grey'],
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2009, min: 2003 },
    });
  });
});
