import ViewModel from './ViewModel';
import { InventoryStore } from 'src/modules/inventory/store';
import { FeaturesStore } from 'src/modules/inventory/Santader/components/Features/store';
import { Car } from '@vroom-web/inv-search-networking';
import data from '../../testCar.json';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Features ViewModel', () => {
  const car: Car = data;

  describe('Get Features', () => {
    const inventoryStore = new InventoryStore();
    const featuresStore = new FeaturesStore();

    it('should return features with 1 key added', () => {
      car.optionalFeatures = 'feature,feature';
      inventoryStore.vehicle._source = car;
      const viewModel = new ViewModel(inventoryStore, featuresStore);
      const expected = ['feature', 'feature', '1 Key'];
      const actual = viewModel.getFeatures();
      expect(actual).toEqual(expected);
    });

    it('should return limited features when features more than 14', () => {
      car.optionalFeatures = 'feature,'.repeat(20);
      inventoryStore.vehicle._source = car;
      featuresStore.limited = true;
      const viewModel = new ViewModel(inventoryStore, featuresStore);
      const actual = viewModel.getFeatures();
      expect(actual.length).toEqual(14);
    });
  });

  describe('Get Button Label', () => {
    const inventoryStore = new InventoryStore();
    inventoryStore.vehicle._source = car;
    const featuresStore = new FeaturesStore();

    it('should return SHOW ALL FEATURES when features less than equal to 14', () => {
      featuresStore.limited = true;
      const viewModel = new ViewModel(inventoryStore, featuresStore);
      const buttonLabel = viewModel.getButtonLabel();
      expect(buttonLabel).toEqual('SHOW ALL FEATURES');
    });

    it('should return SHOW LESS FEATURES when features more than 14', () => {
      featuresStore.limited = false;
      const viewModel = new ViewModel(inventoryStore, featuresStore);
      const buttonLabel = viewModel.getButtonLabel();
      expect(buttonLabel).toEqual('SHOW LESS FEATURES');
    });
  });

  describe('Show Button', () => {
    const inventoryStore = new InventoryStore();
    const featuresStore = new FeaturesStore();

    it('should return false when features less than equal to 14', () => {
      car.optionalFeatures = 'feature,'.repeat(5);
      inventoryStore.vehicle._source = car;
      const viewModel = new ViewModel(inventoryStore, featuresStore);
      const showButton = viewModel.showButton();
      expect(showButton).toBeFalsy();
    });

    it('should return true when features more than 14', () => {
      car.optionalFeatures = 'feature,'.repeat(20);
      inventoryStore.vehicle._source = car;
      const viewModel = new ViewModel(inventoryStore, featuresStore);
      const showButton = viewModel.showButton();
      expect(showButton).toBeTruthy();
    });
  });

  describe('On click', () => {
    const inventoryStore = new InventoryStore();
    inventoryStore.vehicle._source = car;
    const featuresStore = new FeaturesStore();
    featuresStore.toggleLimited = jest.fn();
    const viewModel = new ViewModel(inventoryStore, featuresStore);

    it('should call toggleLimited', () => {
      viewModel.onClick();
      expect(featuresStore.toggleLimited).toHaveBeenCalled();
    });
  });
});
