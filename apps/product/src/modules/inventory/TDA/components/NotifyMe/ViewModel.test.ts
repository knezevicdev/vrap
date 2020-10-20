import { Car } from '@vroom-web/inv-search-networking';

import data from '../../testCar.json';
import NotifyMeNetworker from './NotifyMeNetworker';
import { NotifyMeStore } from './store';
import ViewModel from './ViewModel';

import { InventoryStore } from 'src/modules/inventory/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

const ACCESS_TOKEN = 'access-token';
const VIN = 'some-vin';

const car: Car = data;

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

  describe('Get Year Make Model', () => {
    it('should return year make model as string', () => {
      const expected = '2017 Subaru Impreza';
      const actual = viewModel.getYearMakeModel();
      expect(actual).toEqual(expected);
    });
  });
});
