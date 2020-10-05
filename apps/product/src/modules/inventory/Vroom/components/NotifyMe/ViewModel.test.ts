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

const ACCESS_TOKEN = 'access-token';
const VIN = 'some-vin';

const car: Car = {
  vin: VIN,
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

describe('Notify Me View Model', () => {
  const inventoryStore = new InventoryStore();
  inventoryStore.vehicle._source = car;
  const notifyMeStore = new NotifyMeStore();
  notifyMeStore.accessToken = ACCESS_TOKEN;
  const notifyMeNetworker = new NotifyMeNetworker('url');

  const viewModel = new ViewModel(
    inventoryStore,
    notifyMeStore,
    notifyMeNetworker
  );

  describe('Set Subscription', () => {
    beforeEach(() => {
      notifyMeStore.setNotifyMeLoading = jest.fn();
      notifyMeStore.setSuccess = jest.fn();
    });

    it('should call list subscription and VIN found', async () => {
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
      expect(notifyMeStore.setNotifyMeLoading).toHaveBeenCalledTimes(2);
      expect(notifyMeStore.setSuccess).toHaveBeenCalledTimes(2);
      expect(notifyMeStore.setSuccess).toHaveBeenCalledWith(true);
    });

    it('should call list subscription and VIN not found', async () => {
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
      expect(notifyMeStore.setNotifyMeLoading).toHaveBeenCalledTimes(2);
      expect(notifyMeStore.setSuccess).toHaveBeenCalledWith(false);
    });

    afterEach(() => {
      expect(notifyMeNetworker.listSubscription).toHaveBeenCalledWith(
        ACCESS_TOKEN
      );
    });
  });

  describe('Create notify Me Subscription', () => {
    beforeEach(() => {
      notifyMeStore.setDialogButtonLoading = jest.fn();
      notifyMeStore.setNotifyMeLoading = jest.fn();
      notifyMeStore.setSuccess = jest.fn();
      notifyMeStore.setError = jest.fn();
    });

    it('should call register email and create subscription', async () => {
      notifyMeNetworker.registerEmail = jest
        .fn()
        .mockImplementation(() => Promise.resolve());
      notifyMeNetworker.createSubscription = jest
        .fn()
        .mockImplementation(() => Promise.resolve());
      notifyMeStore.toggleModal = jest.fn();
      await viewModel.createNotifyMeSubscription();
      expect(await notifyMeNetworker.registerEmail).toHaveBeenCalledWith(
        ACCESS_TOKEN
      );
      expect(await notifyMeNetworker.createSubscription).toHaveBeenCalledWith(
        VIN,
        ACCESS_TOKEN
      );
      expect(notifyMeStore.setSuccess).toHaveBeenCalledTimes(1);
      expect(notifyMeStore.setDialogButtonLoading).toHaveBeenCalledTimes(3);
      expect(notifyMeStore.toggleModal).toHaveBeenCalledTimes(1);
      expect(notifyMeStore.setError).toHaveBeenCalledTimes(1);
      expect(notifyMeStore.setNotifyMeLoading).toHaveBeenCalledTimes(1);
    });

    it('should throw error when registering email', async () => {
      notifyMeNetworker.registerEmail = jest
        .fn()
        .mockImplementation(() => Promise.reject());
      notifyMeNetworker.createSubscription = jest.fn();
      await viewModel.createNotifyMeSubscription();
      expect(await notifyMeNetworker.registerEmail).toHaveBeenCalledWith(
        ACCESS_TOKEN
      );
      expect(notifyMeStore.setDialogButtonLoading).toHaveBeenCalledTimes(2);
      expect(notifyMeStore.setError).toHaveBeenCalledTimes(1);
      expect(notifyMeStore.setNotifyMeLoading).toHaveBeenCalledTimes(1);
      expect(notifyMeNetworker.createSubscription).not.toHaveBeenCalled();
    });

    it('should throw error when creating subscription', async () => {
      notifyMeNetworker.registerEmail = jest
        .fn()
        .mockImplementation(() => Promise.resolve());
      notifyMeNetworker.createSubscription = jest
        .fn()
        .mockImplementation(() => Promise.reject());
      await viewModel.createNotifyMeSubscription();

      expect(await notifyMeNetworker.registerEmail).toHaveBeenCalledWith(
        ACCESS_TOKEN
      );
      expect(await notifyMeNetworker.createSubscription).toHaveBeenCalledWith(
        VIN,
        ACCESS_TOKEN
      );
      expect(notifyMeStore.setNotifyMeLoading).toHaveBeenCalledTimes(1);
      expect(notifyMeStore.setError).toHaveBeenCalledTimes(1);
      expect(notifyMeStore.setDialogButtonLoading).toHaveBeenCalledTimes(2);
    });
  });
});
