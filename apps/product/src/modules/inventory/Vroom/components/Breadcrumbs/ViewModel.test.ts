import { Car } from '@vroom-web/inv-search-networking';
import ViewModel from './ViewModel';
import { InventoryStore } from 'src/modules/inventory/store';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Breadcrumbs ViewModel', () => {
  const car: Car = {
    vin: 'some-vin',
    bodyType: '',
    interiorPhotoUrl: '',
    diesel: 0,
    leadFlagPhotoUrl: '',
    listingPrice: 0,
    color: '',
    year: 2017,
    leadFlagPhotoUrlHiRes: '',
    subjectLine: '',
    warrantyRemaining: '',
    miles: 0,
    interiorPhotoUrlHiRes: '',
    dvd: 0,
    transmission: '',
    trim: '',
    engine: '',
    hiresPhotos: [],
    warranty: 0,
    model: 'Impreza',
    modelSlug: 'impreza',
    extColor: '',
    text: '',
    engId: 0,
    bodyId: 0,
    make: 'Subaru',
    makeSlug: 'subaru',
    vehicleType: '',
    doorCount: 0,
    roof: 0,
    nav: 0,
    warrantyOriginal: '',
    driveType: '',
    intColor: '',
    cylinders: 0,
    awd: 0,
    fuelType: '',
    leadPhotoUrlHiRes: '',
    leadPhotoUrl: '',
    style: '',
    optionalFeatures: '',
    zone: '',
    soldStatus: 0,
    otherPhotos: null,
    defectPhotos: null,
    ownerCount: 1,
    cityMpg: 0,
    highwayMpg: 0,
    inventoryId: 0,
    frontTrackWidth: 0,
    rearTrackWidth: 0,
    wheelBase: 0,
    width: 0,
    length: 0,
    groundClearance: 0,
    height: 0,
    hasStockPhotos: false,
    consignmentPartnerId: '',
  };

  it('should return the correct breadcrumbs for a given car', () => {
    const expected = [
      {
        key: 'all',
        name: 'All Cars',
        path: '/cars?utm_source=truecar',
      },
      {
        key: 'make',
        name: 'Subaru',
        path: '/cars/subaru?utm_source=truecar',
      },
      {
        key: 'model',
        name: 'Impreza',
        path: '/cars/subaru/impreza?utm_source=truecar',
      },
      {
        key: 'year',
        name: '2017',
        path: '/cars/subaru/impreza/2017?utm_source=truecar',
      },
      {
        key: 'yearmakemodel',
        name: `2017 Subaru Impreza`,
        path: '',
      },
    ];

    const store = new InventoryStore();
    store.vehicle._source = car;
    const query = {
      utm_source: 'truecar',
    };
    const viewModel = new ViewModel(query, store);

    const actual = viewModel.crumbs();

    expect(actual).toEqual(expected);
  });
});
