/* eslint-disable @typescript-eslint/camelcase */
import {
  addAllModels,
  addBodyType,
  addColor,
  addDriveType,
  addModel,
  addPopularFeature,
  BodyType as FiltersDataBodyType,
  Color as FiltersDataColor,
  DriveType as FiltersDataDriveType,
  FiltersData,
  PopularFeatures as FiltersDataPopularFeatures,
  setMiles,
  setPrice,
  setSearch,
  setTransmission,
  setYear,
  Transmission as FiltersDataTransmission,
} from '@vroom-web/catalog-url-integration';
import { MakeBucket } from '@vroom-web/inv-search-networking';

import ViewModel from './ViewModel';

import {
  BodyType,
  BodyTypeAPI,
  BodyTypeDisplay,
  Color,
  ColorAPI,
  ColorDisplay,
  ColorValue,
  DriveType,
  DriveTypeAPI,
  DriveTypeDisplay,
  PopularFeature,
  PopularFeatureApi,
  PopularFeatureDisplay,
  Transmission,
  TransmissionAPI,
  TransmissionDisplay,
} from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

describe('getMakeAndModelsChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getMakeAndModelsChips(mockFiltersData)).toHaveLength(
      0
    );
  });

  test('2', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = addAllModels('ford');
    expect(mockViewModel.getMakeAndModelsChips(mockFiltersData)).toHaveLength(
      0
    );
  });

  test('3', () => {
    const mockMakeBuckets: MakeBucket[] = [
      {
        key: 'Ford',
        slug: 'ford',
        doc_count: 0,
        model_count: {
          buckets: [],
        },
      },
    ];
    const mockCarsStore = {
      makeBuckets: mockMakeBuckets,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = addAllModels('ford');
    const chips = mockViewModel.getMakeAndModelsChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('Ford');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      makesandmodels: undefined,
    });
  });

  test('4', () => {
    const mockMakeBuckets: MakeBucket[] = [
      {
        key: 'Ford',
        slug: 'ford',
        doc_count: 2,
        model_count: {
          buckets: [
            {
              key: 'F-150',
              slug: 'f-150',
              doc_count: 1,
            },
            {
              key: 'F-250',
              slug: 'f-250',
              doc_count: 1,
            },
          ],
        },
      },
      {
        key: 'GM',
        slug: 'gm',
        doc_count: 0,
        model_count: {
          buckets: [],
        },
      },
      {
        key: 'Volvo',
        slug: 'volvo',
        doc_count: 2,
        model_count: {
          buckets: [
            {
              key: 'XC90',
              slug: 'xc90',
              doc_count: 1,
            },
            {
              key: 'XC60',
              slug: 'xc60',
              doc_count: 1,
            },
          ],
        },
      },
    ];
    const mockCarsStore = {
      makeBuckets: mockMakeBuckets,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    let mockFiltersData: FiltersData = {};
    mockFiltersData = addModel('ford', 'f-150', mockFiltersData);
    mockFiltersData = addModel('ford', 'f-250', mockFiltersData);
    mockFiltersData = addAllModels('gm', mockFiltersData);
    mockFiltersData = addModel('volvo', 'xc90', mockFiltersData);
    mockFiltersData = addModel('volvo', 'xc60', mockFiltersData);
    const chips = mockViewModel.getMakeAndModelsChips(mockFiltersData);
    expect(chips).toHaveLength(5);

    expect(chips[0].display).toEqual('Ford F-150');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      makesandmodels: [
        { makeSlug: 'gm' },
        { makeSlug: 'volvo', modelSlugs: ['xc90', 'xc60'] },
        { makeSlug: 'ford', modelSlugs: ['f-250'] },
      ],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[1].display).toEqual('Ford F-250');
    expect(chips[1].handleDelete).toBeDefined();
    chips[1].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      makesandmodels: [
        { makeSlug: 'gm' },
        { makeSlug: 'volvo', modelSlugs: ['xc90', 'xc60'] },
        { makeSlug: 'ford', modelSlugs: ['f-150'] },
      ],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[2].display).toEqual('GM');
    expect(chips[2].handleDelete).toBeDefined();
    chips[2].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      makesandmodels: [
        { makeSlug: 'ford', modelSlugs: ['f-150', 'f-250'] },
        { makeSlug: 'volvo', modelSlugs: ['xc90', 'xc60'] },
      ],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[3].display).toEqual('Volvo XC90');
    expect(chips[3].handleDelete).toBeDefined();
    chips[3].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      makesandmodels: [
        { makeSlug: 'ford', modelSlugs: ['f-150', 'f-250'] },
        { makeSlug: 'gm' },
        { makeSlug: 'volvo', modelSlugs: ['xc60'] },
      ],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[4].display).toEqual('Volvo XC60');
    expect(chips[4].handleDelete).toBeDefined();
    chips[4].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      makesandmodels: [
        { makeSlug: 'ford', modelSlugs: ['f-150', 'f-250'] },
        { makeSlug: 'gm' },
        { makeSlug: 'volvo', modelSlugs: ['xc90'] },
      ],
    });
    mockCarsStore.updateFiltersData.mockReset();
  });
});

describe('getBodyTypesChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getBodyTypesChips(mockFiltersData)).toHaveLength(0);
  });

  test('2', () => {
    const mockCarsStore = {
      bodyTypes: [],
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = addBodyType(
      FiltersDataBodyType.HATCHBACK
    );
    expect(mockViewModel.getBodyTypesChips(mockFiltersData)).toHaveLength(0);
  });

  test('3', () => {
    const mockBodyTypes: BodyType[] = [
      {
        api: BodyTypeAPI.MINIVAN,
        display: BodyTypeDisplay.MINIVAN,
        filtersDataValue: FiltersDataBodyType.MINIVAN,
      },
    ];
    const mockCarsStore = {
      bodyTypes: mockBodyTypes,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = addBodyType(
      FiltersDataBodyType.MINIVAN
    );
    const chips = mockViewModel.getBodyTypesChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('Minivan');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      bodytypes: undefined,
    });
  });

  test('4', () => {
    const mockBodyTypes: BodyType[] = [
      {
        api: BodyTypeAPI.MINIVAN,
        display: BodyTypeDisplay.MINIVAN,
        filtersDataValue: FiltersDataBodyType.MINIVAN,
      },
      {
        api: BodyTypeAPI.SUV,
        display: BodyTypeDisplay.SUV,
        filtersDataValue: FiltersDataBodyType.SUV,
      },
      {
        api: BodyTypeAPI.WAGON,
        display: BodyTypeDisplay.WAGON,
        filtersDataValue: FiltersDataBodyType.WAGON,
      },
    ];
    const mockCarsStore = {
      bodyTypes: mockBodyTypes,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    let mockFiltersData: FiltersData = {};
    mockFiltersData = addBodyType(FiltersDataBodyType.MINIVAN, mockFiltersData);
    mockFiltersData = addBodyType(FiltersDataBodyType.SUV, mockFiltersData);
    mockFiltersData = addBodyType(FiltersDataBodyType.WAGON, mockFiltersData);
    const chips = mockViewModel.getBodyTypesChips(mockFiltersData);
    expect(chips).toHaveLength(3);

    expect(chips[0].display).toEqual('Minivan');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      bodytypes: ['suv', 'wagon'],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[1].display).toEqual('SUV');
    expect(chips[1].handleDelete).toBeDefined();
    chips[1].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      bodytypes: ['minivan', 'wagon'],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[2].display).toEqual('Wagon');
    expect(chips[2].handleDelete).toBeDefined();
    chips[2].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      bodytypes: ['minivan', 'suv'],
    });
    mockCarsStore.updateFiltersData.mockReset();
  });
});

describe('getColorsChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getColorsChips(mockFiltersData)).toHaveLength(0);
  });

  test('2', () => {
    const mockCarsStore = {
      colors: [],
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = addColor(FiltersDataColor.RED);
    expect(mockViewModel.getColorsChips(mockFiltersData)).toHaveLength(0);
  });

  test('3', () => {
    const mockColors: Color[] = [
      {
        api: ColorAPI.GOLD,
        display: ColorDisplay.GOLD,
        filtersDataValue: FiltersDataColor.GOLD,
        value: ColorValue.GOLD,
      },
    ];
    const mockCarsStore = {
      colors: mockColors,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = addColor(FiltersDataColor.GOLD);
    const chips = mockViewModel.getColorsChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('Gold');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      colors: undefined,
    });
  });

  test('4', () => {
    const mockColors: Color[] = [
      {
        api: ColorAPI.BLACK,
        display: ColorDisplay.BLACK,
        filtersDataValue: FiltersDataColor.BLACK,
        value: ColorValue.BLACK,
      },
      {
        api: ColorAPI.BLUE,
        display: ColorDisplay.BLUE,
        filtersDataValue: FiltersDataColor.BLUE,
        value: ColorValue.BLUE,
      },
      {
        api: ColorAPI.YELLOW,
        display: ColorDisplay.YELLOW,
        filtersDataValue: FiltersDataColor.YELLOW,
        value: ColorValue.YELLOW,
      },
    ];
    const mockCarsStore = {
      colors: mockColors,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    let mockFiltersData: FiltersData = {};
    mockFiltersData = addColor(FiltersDataColor.BLACK, mockFiltersData);
    mockFiltersData = addColor(FiltersDataColor.BLUE, mockFiltersData);
    mockFiltersData = addColor(FiltersDataColor.YELLOW, mockFiltersData);
    const chips = mockViewModel.getColorsChips(mockFiltersData);
    expect(chips).toHaveLength(3);

    expect(chips[0].display).toEqual('Black');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      colors: ['blue', 'yellow'],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[1].display).toEqual('Blue');
    expect(chips[1].handleDelete).toBeDefined();
    chips[1].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      colors: ['black', 'yellow'],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[2].display).toEqual('Yellow');
    expect(chips[2].handleDelete).toBeDefined();
    chips[2].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      colors: ['black', 'blue'],
    });
    mockCarsStore.updateFiltersData.mockReset();
  });
});

describe('getYearChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getYearChips(mockFiltersData)).toHaveLength(0);
  });
  test('2', () => {
    const mockCarsStore = {
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = setYear({ min: 2015, max: 2015 });
    const chips = mockViewModel.getYearChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('2015');
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      year: undefined,
    });
  });
  test('3', () => {
    const mockCarsStore = {
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = setYear({ min: 2014, max: 2016 });
    const chips = mockViewModel.getYearChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('2014 - 2016');
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      price: undefined,
    });
  });
});

describe('getPriceChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getPriceChips(mockFiltersData)).toHaveLength(0);
  });
  test('2', () => {
    const mockCarsStore = {
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = setPrice({ min: 10000, max: 10000 });
    const chips = mockViewModel.getPriceChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('$10,000');
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      price: undefined,
    });
  });
  test('3', () => {
    const mockCarsStore = {
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = setPrice({ min: 10000, max: 20000 });
    const chips = mockViewModel.getPriceChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('$10,000 - $20,000');
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      price: undefined,
    });
  });
});

describe('getMilesChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getMilesChips(mockFiltersData)).toHaveLength(0);
  });
  test('2', () => {
    const mockCarsStore = {
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = setMiles({ min: 0, max: 100000 });
    const chips = mockViewModel.getMilesChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('Up to 100,000 Miles');
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      miles: undefined,
    });
  });
});

describe('getTransmissionChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getTransmissionChips(mockFiltersData)).toHaveLength(0);
  });

  test('2', () => {
    const mockCarsStore = {
      transmissions: [],
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = setTransmission(
      FiltersDataTransmission.AUTO
    );
    expect(mockViewModel.getTransmissionChips(mockFiltersData)).toHaveLength(0);
  });

  test('3', () => {
    const mockTransmissions: Transmission[] = [
      {
        api: TransmissionAPI.AUTO,
        display: TransmissionDisplay.AUTO,
        filtersDataValue: FiltersDataTransmission.AUTO,
      },
      {
        api: TransmissionAPI.MANUAL,
        display: TransmissionDisplay.MANUAL,
        filtersDataValue: FiltersDataTransmission.MANUAL,
      },
    ];
    const mockCarsStore = {
      transmissions: mockTransmissions,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = setTransmission(
      FiltersDataTransmission.MANUAL
    );
    const chips = mockViewModel.getTransmissionChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('Manual Only');
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenLastCalledWith({
      transmission: undefined,
    });
  });
});

describe('getDriveTypesChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getDriveTypesChips(mockFiltersData)).toHaveLength(0);
  });

  test('2', () => {
    const mockCarsStore = {
      driveTypes: [],
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = addDriveType(FiltersDataDriveType.AWD);
    expect(mockViewModel.getDriveTypesChips(mockFiltersData)).toHaveLength(0);
  });

  test('3', () => {
    const mockDriveTypes: DriveType[] = [
      {
        api: DriveTypeAPI.AWD,
        display: DriveTypeDisplay.AWD,
        filtersDataValue: FiltersDataDriveType.AWD,
      },
    ];
    const mockCarsStore = {
      driveTypes: mockDriveTypes,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = addDriveType(FiltersDataDriveType.AWD);
    const chips = mockViewModel.getDriveTypesChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('AWD');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      drivetypes: undefined,
    });
  });

  test('4', () => {
    const mockDriveTypes: DriveType[] = [
      {
        api: DriveTypeAPI.AWD,
        display: DriveTypeDisplay.AWD,
        filtersDataValue: FiltersDataDriveType.AWD,
      },
      {
        api: DriveTypeAPI.FOUR_BY_FOUR,
        display: DriveTypeDisplay.FOUR_BY_FOUR,
        filtersDataValue: FiltersDataDriveType.FOUR_BY_FOUR,
      },
      {
        api: DriveTypeAPI.FWD,
        display: DriveTypeDisplay.FWD,
        filtersDataValue: FiltersDataDriveType.FWD,
      },
    ];
    const mockCarsStore = {
      driveTypes: mockDriveTypes,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    let mockFiltersData: FiltersData = {};
    mockFiltersData = addDriveType(FiltersDataDriveType.AWD, mockFiltersData);
    mockFiltersData = addDriveType(
      FiltersDataDriveType.FOUR_BY_FOUR,
      mockFiltersData
    );
    mockFiltersData = addDriveType(FiltersDataDriveType.FWD, mockFiltersData);
    const chips = mockViewModel.getDriveTypesChips(mockFiltersData);
    expect(chips).toHaveLength(3);

    expect(chips[0].display).toEqual('AWD');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      drivetype: ['4x4', 'fwd'],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[1].display).toEqual('4x4');
    expect(chips[1].handleDelete).toBeDefined();
    chips[1].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      drivetype: ['awd', 'fwd'],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[2].display).toEqual('FWD');
    expect(chips[2].handleDelete).toBeDefined();
    chips[2].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      drivetype: ['awd', '4x4'],
    });
    mockCarsStore.updateFiltersData.mockReset();
  });
});

describe('getSearchChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getSearchChips(mockFiltersData)).toHaveLength(0);
  });

  test('2', () => {
    const mockCarsStore = {
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = setSearch('something');
    const chips = mockViewModel.getSearchChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('Search: something');
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenLastCalledWith({
      search: undefined,
    });
  });
});

describe('getPopularFeatureChips', () => {
  test('1', () => {
    const mockCarsStore = {};
    const mockViewModel = new ViewModel(mockCarsStore as CarsStore);
    const mockFiltersData: FiltersData = {};
    expect(mockViewModel.getPopularFeatureChips(mockFiltersData)).toHaveLength(
      0
    );
  });

  test('2', () => {
    const mockCarsStore = {
      popularFeatures: [],
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = addPopularFeature(
      FiltersDataPopularFeatures.ANDROID_AUTO
    );
    expect(mockViewModel.getPopularFeatureChips(mockFiltersData)).toHaveLength(
      0
    );
  });

  test('3', () => {
    const mockPopularFeatures: PopularFeature[] = [
      {
        api: PopularFeatureApi.ANDROID_AUTO,
        display: PopularFeatureDisplay.ANDROID_AUTO,
        filtersDataValue: FiltersDataPopularFeatures.ANDROID_AUTO,
      },
    ];
    const mockCarsStore = {
      popularFeatures: mockPopularFeatures,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    const mockFiltersData: FiltersData = addPopularFeature(
      FiltersDataPopularFeatures.ANDROID_AUTO
    );
    const chips = mockViewModel.getPopularFeatureChips(mockFiltersData);
    expect(chips).toHaveLength(1);
    expect(chips[0].display).toEqual('Android Auto');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      optionalFeatures: undefined,
    });
  });

  test('4', () => {
    const mockPopularFeatures: PopularFeature[] = [
      {
        api: PopularFeatureApi.ANDROID_AUTO,
        display: PopularFeatureDisplay.ANDROID_AUTO,
        filtersDataValue: FiltersDataPopularFeatures.ANDROID_AUTO,
      },
      {
        api: PopularFeatureApi.APPLE_CAR_PLAY,
        display: PopularFeatureDisplay.APPLE_CAR_PLAY,
        filtersDataValue: FiltersDataPopularFeatures.APPLE_CAR_PLAY,
      },
      {
        api: PopularFeatureApi.HEATED_SEATS,
        display: PopularFeatureDisplay.HEATED_SEATS,
        filtersDataValue: FiltersDataPopularFeatures.HEATED_SEATS,
      },
    ];
    const mockCarsStore = {
      popularFeatures: mockPopularFeatures,
      updateFiltersData: jest.fn(),
    };
    const mockViewModel = new ViewModel(
      (mockCarsStore as unknown) as CarsStore
    );
    let mockFiltersData: FiltersData = {};
    mockFiltersData = addPopularFeature(
      FiltersDataPopularFeatures.ANDROID_AUTO,
      mockFiltersData
    );
    mockFiltersData = addPopularFeature(
      FiltersDataPopularFeatures.APPLE_CAR_PLAY,
      mockFiltersData
    );
    mockFiltersData = addPopularFeature(
      FiltersDataPopularFeatures.HEATED_SEATS,
      mockFiltersData
    );
    const chips = mockViewModel.getPopularFeatureChips(mockFiltersData);
    expect(chips).toHaveLength(3);

    expect(chips[0].display).toEqual('Android Auto');
    expect(chips[0].handleDelete).toBeDefined();
    chips[0].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      optionalfeatures: ['Apple Carplay', 'Heated Seats'],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[1].display).toEqual('Apple CarPlay');
    expect(chips[1].handleDelete).toBeDefined();
    chips[1].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      optionalfeatures: ['Android Auto', 'Heated Seats'],
    });
    mockCarsStore.updateFiltersData.mockReset();

    expect(chips[2].display).toEqual('Heated Seats');
    expect(chips[2].handleDelete).toBeDefined();
    chips[2].handleDelete();
    expect(mockCarsStore.updateFiltersData).toHaveBeenCalledWith({
      optionalfeatures: ['Android Auto', 'Apple Carplay'],
    });
    mockCarsStore.updateFiltersData.mockReset();
  });
});
