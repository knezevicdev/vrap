import ViewModel from './ViewModel';
import { InventoryStore } from 'src/modules/inventory/store';
import { NotifyMeStore } from './store';
import NotifyMeNetworker from './NotifyMeNetworker';
import { Car } from '@vroom-web/inv-search-networking';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Notify Me View Model', () => {
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
  describe('Set Subscription', () => {
    const inventoryStore = new InventoryStore();
    inventoryStore.vehicle._source = car;
    const notifyMeStore = new NotifyMeStore();
    notifyMeStore.accessToken = 'access-token';
    const notifyMeNetworker = new NotifyMeNetworker('url');

    const viewModel = new ViewModel(
      inventoryStore,
      notifyMeStore,
      notifyMeNetworker
    );

    it('if should call list subscription and VIN found', async () => {
      viewModel.setNotifyMeLoading = jest.fn();
      viewModel.setSuccessful = jest.fn();
      notifyMeNetworker.listSubscription = jest.fn().mockResolvedValue({
        data: {
          data: {
            hornListSubscriptions: {
              subscriptions: [
                {
                  filters: 'some-vin',
                  id: '',
                  subject: {
                    path: '',
                    name: '',
                  },
                },
              ],
            },
          },
        },
      });

      await viewModel.setSubscription();
      expect(viewModel.setNotifyMeLoading).toHaveBeenCalledTimes(2);
      expect(viewModel.setSuccessful).toHaveBeenCalledTimes(2);
    });

    it('if should call list subscription and VIN not found', async () => {
      viewModel.setNotifyMeLoading = jest.fn();
      viewModel.setSuccessful = jest.fn();
      notifyMeNetworker.listSubscription = jest.fn().mockResolvedValue({
        data: {
          data: {
            hornListSubscriptions: {
              subscriptions: [
                {
                  filters: 'some-other-vin',
                  id: '',
                  subject: {
                    path: '',
                    name: '',
                  },
                },
              ],
            },
          },
        },
      });

      await viewModel.setSubscription();
      expect(viewModel.setNotifyMeLoading).toHaveBeenCalledTimes(2);
      expect(viewModel.setSuccessful).toHaveBeenCalledWith(false);
    });
  });
});
