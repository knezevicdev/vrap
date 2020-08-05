import {
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
} from './typeguards';
import {
  BodyType,
  Color,
  Make,
  MakeAndModels,
  MaxAndMin,
  Sort,
  SortBy,
  SortDirection,
} from './types';

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
    expect(isTestEnum(undefined)).toBeFalsy();
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
