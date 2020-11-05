import {
  addAllModels,
  addBodyType,
  addColor,
  addCylinder,
  addDriveType,
  addFuelType,
  addModel,
  addPopularFeature,
  deepCopyFiltersData,
  removeAllModels,
  removeBodyType,
  removeColor,
  removeCylinder,
  removeDriveType,
  removeFuelType,
  removeModel,
  removePopularFeature,
  resetFilter,
  resetFilters,
  setMiles,
  setPage,
  setPrice,
  setSearch,
  setSort,
  setTransmission,
  setYear,
} from './filtersDataModifications';
import {
  BodyType,
  Color,
  Cylinder,
  DriveType,
  Filters,
  FiltersData,
<<<<<<< HEAD
  FuelType,
=======
  PopularFeatures,
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
  SortBy,
  SortDirection,
  Transmission,
} from './types';

const mockFiltersData1: FiltersData = {
  [Filters.FUEL_TYPE]: [FuelType.ELECTRIC],
  [Filters.OTHER_CYLINDERS]: false,
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
  [Filters.CYLINDERS]: [Cylinder.EIGHT, Cylinder.FOUR],
  [Filters.OTHER_CYLINDERS]: false,
  [Filters.POPULAR_FEATURES]: [
    PopularFeatures.ANDROID_AUTO,
    PopularFeatures.REMOTE_START,
  ],
};

describe('resetFilter', () => {
  test('1', () => {
    expect(resetFilter(Filters.BODY_TYPES, mockFiltersData1)).toEqual({
      ...mockFiltersData1,
      bodytypes: undefined,
<<<<<<< HEAD
=======
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
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
    });
  });
  test('2', () => {
    expect(resetFilter(Filters.MAKE_AND_MODELS, mockFiltersData1)).toEqual({
      ...mockFiltersData1,
      makesandmodels: undefined,
<<<<<<< HEAD
=======
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
    });
  });
});

describe('resetFilters', () => {
  test('1', () => {
    expect(
      resetFilters([Filters.BODY_TYPES, Filters.PRICE], mockFiltersData1)
    ).toEqual({
      ...mockFiltersData1,
      bodytypes: undefined,
      price: undefined,
<<<<<<< HEAD
=======
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
    });
  });
  test('2', () => {
    expect(
      resetFilters([Filters.DRIVE_TYPE, Filters.TRANSMISSION], mockFiltersData1)
    ).toEqual({
      ...mockFiltersData1,
      drivetype: undefined,
      transmission: undefined,
<<<<<<< HEAD
=======
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      bodytypes: ['suv', 'convertible'],
<<<<<<< HEAD
=======
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
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      bodytypes: undefined,
<<<<<<< HEAD
    });
  });
});

describe('addFuelType', () => {
  test('it should add the fuel type to no filters', () => {
    expect(addFuelType(FuelType.GASOLINE, undefined)).toEqual({
      fueltype: ['gasoline'],
    });
  });
  test('it should add fuel type to filters which already exist', () => {
    expect(addFuelType(FuelType.GASOLINE, mockFiltersData1)).toEqual({
      ...mockFiltersData1,
      fueltype: ['electric', 'gasoline'],
    });
  });
  test('it should add fuel type to filters which already exist but are empty', () => {
    const mockFiltersData: FiltersData = {};
    expect(addFuelType(FuelType.GASOLINE, mockFiltersData)).toEqual({
      fueltype: ['gasoline'],
    });
  });
  test('it should add fuel type to filter if there are already fuel types', () => {
    const mockFiltersData: FiltersData = {
      [Filters.FUEL_TYPE]: [FuelType.ELECTRIC],
    };
    expect(addFuelType(FuelType.GASOLINE, mockFiltersData)).toEqual({
      fueltype: ['electric', 'gasoline'],
    });
  });
});

describe('removeFuelType', () => {
  test('it should set the fueltype to undefined', () => {
    expect(removeFuelType(FuelType.ELECTRIC, undefined)).toEqual({
      fueltype: undefined,
    });
  });
  test('it should set the fueltype to undefined on a defined object', () => {
    expect(removeFuelType(FuelType.ELECTRIC, {})).toEqual({
      fueltype: undefined,
    });
  });
  test('it should remove the fueltype if it exists', () => {
    const mockFiltersData: FiltersData = {
      [Filters.FUEL_TYPE]: [FuelType.ELECTRIC],
    };
    expect(removeFuelType(FuelType.ELECTRIC, mockFiltersData)).toEqual({
      fueltype: undefined,
    });
  });
  test('it should remove the correct fueltype', () => {
    const mockFiltersData: FiltersData = {
      [Filters.FUEL_TYPE]: [FuelType.ELECTRIC, FuelType.GASOLINE],
    };
    expect(removeFuelType(FuelType.ELECTRIC, mockFiltersData)).toEqual({
      fueltype: ['gasoline'],
    });
  });
  test('it should remove the fueltype from a big filter', () => {
    expect(removeFuelType(FuelType.ELECTRIC, mockFiltersData1)).toEqual({
      ...mockFiltersData1,
      fueltype: undefined,
=======
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
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
    });
  });
});

describe('addCylinder', () => {
  test('it should add the cylinder to no filters', () => {
    expect(addCylinder(Cylinder.EIGHT, undefined)).toEqual({
      cylinders: ['8'],
    });
  });
  test('it should add cylinders to filters which already exist', () => {
    expect(addCylinder(Cylinder.SIX, mockFiltersData1)).toEqual({
      ...mockFiltersData1,
      cylinders: ['8', '4', '6'],
<<<<<<< HEAD
=======
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
    });
  });
  test('it should add cylinders to filters which already exist but are empty', () => {
    const mockFiltersData: FiltersData = {};
    expect(addCylinder(Cylinder.FOUR, mockFiltersData)).toEqual({
      cylinders: ['4'],
    });
  });
  test('it should add cylinders to filter if there are already cylinders', () => {
    const mockFiltersData: FiltersData = {
      [Filters.CYLINDERS]: [Cylinder.EIGHT],
    };
    expect(addCylinder(Cylinder.FOUR, mockFiltersData)).toEqual({
      cylinders: ['8', '4'],
    });
  });
});

describe('removeCylinder', () => {
  test('it should set the cylinders to undefined', () => {
    expect(removeCylinder(Cylinder.EIGHT, undefined)).toEqual({
      cylinders: undefined,
    });
  });
  test('it should set the cylinders to undefined on a defined object', () => {
    expect(removeCylinder(Cylinder.EIGHT, {})).toEqual({
      removeCylinder: undefined,
    });
  });
  test('it should remove the cylinders if it exists', () => {
    const mockFiltersData: FiltersData = {
      [Filters.CYLINDERS]: [Cylinder.EIGHT],
    };
    expect(removeCylinder(Cylinder.EIGHT, mockFiltersData)).toEqual({
      cylinders: undefined,
    });
  });
  test('it should remove the correct cylinder', () => {
    const mockFiltersData: FiltersData = {
      [Filters.CYLINDERS]: [Cylinder.EIGHT, Cylinder.FOUR],
    };
    expect(removeCylinder(Cylinder.EIGHT, mockFiltersData)).toEqual({
      cylinders: ['4'],
    });
  });
  test('it should remove the cylinders from a big filter', () => {
    expect(removeCylinder(Cylinder.EIGHT, mockFiltersData1)).toEqual({
      ...mockFiltersData1,
      cylinders: ['4'],
<<<<<<< HEAD
=======
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      colors: ['grey', 'red'],
<<<<<<< HEAD
=======
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      colors: undefined,
<<<<<<< HEAD
=======
      drivetype: ['awd'],
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      drivetype: ['awd', '4x4'],
<<<<<<< HEAD
=======
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      drivetype: undefined,
<<<<<<< HEAD
=======
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90'] }],
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
    });
  });
});

describe('addPopularFeature', () => {
  test('it should add a feature to no filters', () => {
    expect(addPopularFeature(PopularFeatures.ANDROID_AUTO, undefined)).toEqual({
      optionalfeatures: ['Android Auto'],
    });
  });
  test('it should add features to existing filter sets', () => {
    expect(
      addPopularFeature(PopularFeatures.SUNROOF_MOONROOF, mockFiltersData1)
    ).toEqual({
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
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start', 'Sunroof or Moonroof'],
    });
  });
  test('it should add features to filters which already exist but are empty', () => {
    const mockFiltersData: FiltersData = {};
    expect(
      addPopularFeature(PopularFeatures.ANDROID_AUTO, mockFiltersData)
    ).toEqual({
      optionalfeatures: ['Android Auto'],
    });
  });
  test('it should add features to filters if there are already features', () => {
    const mockFiltersData: FiltersData = {
      [Filters.POPULAR_FEATURES]: [PopularFeatures.APPLE_CAR_PLAY],
    };
    expect(
      addPopularFeature(PopularFeatures.ANDROID_AUTO, mockFiltersData)
    ).toEqual({
      optionalfeatures: ['Apple Car Play', 'Android Auto'],
    });
  });
});

describe('removePopularFeature', () => {
  test('it should set the features to undefined', () => {
    expect(
      removePopularFeature(PopularFeatures.ANDROID_AUTO, undefined)
    ).toEqual({
      optionalfeatures: undefined,
    });
  });
  test('it should set the features to undefined on a defined object', () => {
    expect(removePopularFeature(PopularFeatures.ANDROID_AUTO, {})).toEqual({
      removePopularFeature: undefined,
    });
  });
  test('it should remove the feature if it exists', () => {
    const mockFiltersData: FiltersData = {
      [Filters.POPULAR_FEATURES]: [PopularFeatures.APPLE_CAR_PLAY],
    };
    expect(
      removePopularFeature(PopularFeatures.APPLE_CAR_PLAY, mockFiltersData)
    ).toEqual({
      optionalfeatures: undefined,
    });
  });
  test('it should remove the correct feature', () => {
    const mockFiltersData: FiltersData = {
      [Filters.POPULAR_FEATURES]: [
        PopularFeatures.APPLE_CAR_PLAY,
        PopularFeatures.ANDROID_AUTO,
      ],
    };
    expect(
      removePopularFeature(PopularFeatures.APPLE_CAR_PLAY, mockFiltersData)
    ).toEqual({
      optionalfeatures: ['Android Auto'],
    });
  });
  test('it should remove the feature from a big filter', () => {
    expect(
      removePopularFeature(PopularFeatures.REMOTE_START, mockFiltersData1)
    ).toEqual({
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
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      transmission: 'manual',
<<<<<<< HEAD
=======
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      makesandmodels: [
        { makeSlug: 'volvo', modelSlugs: ['xc90'] },
        { makeSlug: 'toyota' },
      ],
<<<<<<< HEAD
=======
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
<<<<<<< HEAD
    expect(removeAllModels('ford', mockFiltersData1)).toEqual(mockFiltersData1);
=======
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
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
    });
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
  });
  test('4', () => {
    expect(removeAllModels('volvo', mockFiltersData1)).toEqual({
      ...mockFiltersData1,
      makesandmodels: undefined,
<<<<<<< HEAD
=======
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
<<<<<<< HEAD
    expect(addModel('volvo', 'xc90', mockFiltersData1)).toEqual(
      mockFiltersData1
    );
=======
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
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
    });
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
  });
  test('3', () => {
    expect(addModel('volvo', 'xc60', mockFiltersData1)).toEqual({
      ...mockFiltersData1,
      makesandmodels: [{ makeSlug: 'volvo', modelSlugs: ['xc90', 'xc60'] }],
<<<<<<< HEAD
=======
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      makesandmodels: [
        { makeSlug: 'volvo', modelSlugs: ['xc90'] },
        {
          makeSlug: 'bmw',
          modelSlugs: ['300'],
        },
      ],
<<<<<<< HEAD
=======
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      makesandmodels: undefined,
<<<<<<< HEAD
    });
  });
  test('3', () => {
    expect(removeModel('toyota', 'camry', mockFiltersData1)).toEqual(
      mockFiltersData1
    );
=======
      miles: { max: 100000, min: 0 },
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
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
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
    });
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      miles: { max: 10000, min: 30 },
<<<<<<< HEAD
=======
      page: 0,
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
    });
  });
});

describe('setOtherCylinders', () => {
  test('it should set the otherCylinders', () => {
    expect(setOtherCylinders(true, undefined)).toEqual({
      othercylinders: true,
    });
  });
  test('it should set othercylinders on an empty object', () => {
    expect(setOtherCylinders(true, {})).toEqual({
      othercylinders: true,
    });
  });
  test('it should set othercylinders on a large filter', () => {
    expect(setOtherCylinders(true, mockFiltersData1)).toEqual({
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
      cylinders: ['8', '4'],
      othercylinders: true,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      page: 42,
<<<<<<< HEAD
=======
      price: { max: 100000, min: 0 },
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      price: { max: 10000, min: 30 },
<<<<<<< HEAD
=======
      search: 'search',
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      search: 'something',
<<<<<<< HEAD
=======
      sort: { by: 'miles', direction: 'asc' },
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      sort: { by: 'year', direction: 'desc' },
<<<<<<< HEAD
=======
      transmission: 'auto',
      year: { max: 2020, min: 2018 },
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
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
      ...mockFiltersData1,
      year: { max: 2009, min: 2003 },
<<<<<<< HEAD
=======
      cylinders: ['8', '4'],
      othercylinders: false,
      optionalfeatures: ['Android Auto', 'Remote Start'],
>>>>>>> 25b1c33005ba4335c6c0d9e921426770dd798cac
    });
  });
});
