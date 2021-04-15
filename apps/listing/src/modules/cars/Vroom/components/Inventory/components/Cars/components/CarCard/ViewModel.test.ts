import { Experiment } from '@vroom-web/experiment-sdk';
import { Car, SoldStatusInt } from '@vroom-web/inv-search-networking';

import ViewModel, {
  GREAT_FEATURES_BADGE_1,
  GREAT_FEATURES_BADGE_2,
} from './ViewModel';

import { analyticsHandler } from 'src/integrations/AnalyticsHandler';
import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {
        BASE_PATH: 'https://test-url',
      },
    };
  };
});

describe('CarCard ViewModel Tests', () => {
  describe('showLogo', () => {
    it('showLogo returns true when there is a leadFlagPhotoUrl and hasStockPhotos is true', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: true,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showLogo()).toBe(true);
    });
    it('showLogo returns false when there is no leadFlagPhotoUrl and hasStockPhotos is true', () => {
      const store = new CarsStore();
      const car = {
        hasStockPhotos: true,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showLogo()).toBe(false);
    });
    it('showLogo returns false when there is a leadFlagPhotoUrl and hasStockPhotos is false', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showLogo()).toBe(false);
    });
    it('showLogo returns false when there is no leadFlagPhotoUrl and hasStockPhotos is false', () => {
      const store = new CarsStore();
      const car = {
        hasStockPhotos: false,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showLogo()).toBe(false);
    });
  });

  describe('showAvailableSoon', () => {
    it('showAvailableSoon returns true when leadFlagPhotoUrl is an empty string and hasStockPhotos is true', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: '',
        hasStockPhotos: true,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showAvailableSoon()).toBe(true);
    });
    it('showAvailableSoon returns true when leadFlagPhotoUrl is an empty string and hasStockPhotos is false', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: '',
        hasStockPhotos: false,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showAvailableSoon()).toBe(true);
    });
    it('showAvailableSoon returns true when leadFlagPhotoUrl has a value and hasStockPhotos is true', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: true,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showAvailableSoon()).toBe(true);
    });
    it('showAvailableSoon returns false when leadFlagPhotoUrl has a value and hasStockPhotos is false', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showAvailableSoon()).toBe(false);
    });
  });
  describe('showSalePending', () => {
    it('showSalePending returns true when soldStatus is pending', () => {
      const store = new CarsStore();
      const car = {
        soldStatus: SoldStatusInt.SALE_PENDING,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showSalePending()).toBe(true);
    });
    it('showSalePending returns false when soldStatus is anything but pending', () => {
      const store = new CarsStore();
      const car = {
        soldStatus: SoldStatusInt.FOR_SALE,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showSalePending()).toBe(false);
    });
  });
  describe('showTenDayDelivery', () => {
    it('showTenDayDelivery returns true with location Stafford and assignedVariant 1', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 1,
      } as Experiment;
      const car = {
        location: 'Stafford',
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showTenDayDelivery()).toBe(true);
    });
    it('showTenDayDelivery returns false with location other than Stafford and assignedVariant 1', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 1,
      } as Experiment;
      const car = {
        location: 'Detroit',
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showTenDayDelivery()).toBe(false);
    });
    it('showTenDayDelivery returns false with location Stafford and assignedVariant 0', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 0,
      } as Experiment;
      const car = {
        location: 'Stafford',
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showTenDayDelivery()).toBe(false);
    });
    it('showTenDayDelivery returns false with location other than Stafford and assignedVariant 0', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 0,
      } as Experiment;
      const car = {
        location: 'Detroit',
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showTenDayDelivery()).toBe(false);
    });
  });

  describe('showGreatFeatures', () => {
    it('showGreatFeatures returns true when badges contains the GREAT_FEATURES_BADGE_1 and assignedVariant is 1', () => {
      const store = new CarsStore();
      store.greatFeaturesBadgeExperiment = { assignedVariant: 1 } as Experiment;
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
        soldStatus: SoldStatusInt.FOR_SALE,
        location: 'Detroit',
        badges: [{ code: GREAT_FEATURES_BADGE_1 }],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showGreatFeatures()).toBe(true);
    });
    it('showGreatFeatures returns true when badges contains the GREAT_FEATURES_BADGE_2 and assignedVariant is 1', () => {
      const store = new CarsStore();
      store.greatFeaturesBadgeExperiment = { assignedVariant: 1 } as Experiment;
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
        soldStatus: SoldStatusInt.FOR_SALE,
        location: 'Detroit',
        badges: [{ code: GREAT_FEATURES_BADGE_2 }],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showGreatFeatures()).toBe(true);
    });
    it('showGreatFeatures returns true when badges contains the GREAT_FEATURES_BADGE_1 and GREAT_FEATURES_BADGE_2 and assignedVariant is 1', () => {
      const store = new CarsStore();
      store.greatFeaturesBadgeExperiment = { assignedVariant: 1 } as Experiment;
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
        soldStatus: SoldStatusInt.FOR_SALE,
        location: 'Detroit',
        badges: [
          { code: GREAT_FEATURES_BADGE_1 },
          { code: GREAT_FEATURES_BADGE_2 },
        ],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showGreatFeatures()).toBe(true);
    });
    it('showGreatFeatures returns false when badges contains one or both of the GREAT_FEATURES_BADGE and assignedVariant is 0', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
        soldStatus: SoldStatusInt.FOR_SALE,
        location: 'Detroit',
        badges: [{ code: GREAT_FEATURES_BADGE_1 }],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showGreatFeatures()).toBe(false);
    });
    it('showGreatFeatures returns false when badges does not contain the GREAT_FEATURES_BADGE,', () => {
      const store = new CarsStore();
      const car = {
        badges: [{ code: 'something' }],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showGreatFeatures()).toBe(false);
    });
    it('showGreatFeatures returns false when badges is null', () => {
      const store = new CarsStore();
      const car = {
        badges: null,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.showGreatFeatures()).toBe(false);
    });
  });
  describe('getBanner', () => {
    it('getBanner returns availableSoon when all conditionals are true', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 1,
      } as Experiment;
      store.greatFeaturesBadgeExperiment = { assignedVariant: 1 } as Experiment;
      const car = {
        leadFlagPhotoUrl: '',
        hasStockPhotos: true,
        soldStatus: SoldStatusInt.SALE_PENDING,
        location: 'Stafford',
        badges: [{ code: GREAT_FEATURES_BADGE_1 }],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.getBanner()).toEqual({
        id: 'available-soon',
        label: 'Available Soon',
        color: '#bdbdbd',
        fontColor: 'inherit',
        hasBorder: false,
      });
    });
    it('getBanner returns salePending when all conditionals but showAvailableSoon are true', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 1,
      } as Experiment;
      store.greatFeaturesBadgeExperiment = { assignedVariant: 1 } as Experiment;
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
        soldStatus: SoldStatusInt.SALE_PENDING,
        location: 'Stafford',
        badges: [{ code: GREAT_FEATURES_BADGE_1 }],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.getBanner()).toEqual({
        id: 'sale-pending',
        label: 'Sale Pending',
        color: '#ffd400',
        fontColor: 'inherit',
        hasBorder: false,
      });
    });
    it('getBanner returns tenDayDelivery when all conditionals but showAvailableSoon and showSalePending are true', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 1,
      } as Experiment;
      store.greatFeaturesBadgeExperiment = { assignedVariant: 1 } as Experiment;
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
        soldStatus: SoldStatusInt.FOR_SALE,
        location: 'Stafford',
        badges: [{ code: GREAT_FEATURES_BADGE_2 }],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.getBanner()).toEqual({
        id: 'ten-day-delivery',
        label: '10-Day Delivery',
        color: '#0f3a7b',
        fontColor: '#ffffff',
        hasBorder: true,
      });
    });
    it('getBanner returns greatFeatures when all conditionals but showAvailableSoon, showSalePending and showTenDayDelivery are true', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 0,
      } as Experiment;
      store.greatFeaturesBadgeExperiment = { assignedVariant: 1 } as Experiment;
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
        soldStatus: SoldStatusInt.FOR_SALE,
        location: 'Detroit',
        badges: [{ code: GREAT_FEATURES_BADGE_2 }],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.getBanner()).toEqual({
        id: 'great-features',
        label: 'Great Features',
        color: '#0f3a7b',
        fontColor: '#ffffff',
        hasBorder: true,
      });
    });
    it('getBanner returns null when all conditionals are false', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 0,
      } as Experiment;
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
        soldStatus: SoldStatusInt.FOR_SALE,
        location: 'Detroit',
        badges: [{ code: 'something' }],
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.getBanner()).toBe(null);
    });
  });
  describe('getPhotoStyle', () => {
    it('getPhotoStyle returns opacity 100% when leadFlagPhotoUrl has a value', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.getPhotoStyle()).toEqual({ opacity: '100%' });
    });
    it('getPhotoStyle returns opacity 30% when leadFlagPhotoUrl is empty', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: '',
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.getPhotoStyle()).toEqual({ opacity: '30%' });
    });
  });

  describe('getSummary', () => {
    it('getSummary returns Summary when there is leadFlagPhotoUrl', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        year: 2016,
        make: 'Tesla',
        model: 'Model S',
        trim: '75D',
        miles: 32105,
        listingPrice: 41000,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.getSummary()).toEqual({
        image: 'https://some-url.com',
        title: '2016 Tesla Model S',
        trim: '75D',
        miles: '32,105 miles',
        price: '$41,000',
      });
    });
    it('getSummary returns Summary when there is no leadFlagPhotoUrl', () => {
      const store = new CarsStore();
      const car = {
        leadFlagPhotoUrl: '',
        year: 2016,
        make: 'Tesla',
        model: 'Model S',
        trim: '75D',
        miles: 32105,
        listingPrice: 41000,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.getSummary()).toEqual({
        image: 'https://test-url/components/ghost-suv-with-padding.png',
        title: '2016 Tesla Model S',
        trim: '75D',
        miles: '32,105 miles',
        price: '$41,000',
      });
    });
  });

  describe('link', () => {
    it('link returns link string when showTenDayDelivery is true', () => {
      const store = new CarsStore();
      store.geoShippingExperiment = {
        assignedVariant: 1,
      } as Experiment;
      const car = {
        leadFlagPhotoUrl: 'https://some-url.com',
        hasStockPhotos: false,
        soldStatus: SoldStatusInt.FOR_SALE,
        location: 'Stafford',
        year: 2016,
        makeSlug: 'tesla',
        modelSlug: 'model-s',
        vin: '32423uy234hjd',
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.link()).toBe(
        '/inventory/tesla-model-s-2016-32423uy234hjd?tdd=true'
      );
    });
    it('link returns link string when showTenDayDelivery is false', () => {
      const store = new CarsStore();
      const car = {
        year: 2016,
        makeSlug: 'tesla',
        modelSlug: 'model-s',
        vin: '32423uy234hjd',
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      expect(viewModel.link()).toBe(
        '/inventory/tesla-model-s-2016-32423uy234hjd'
      );
    });
  });

  describe('trackProductClick', () => {
    it('trackProductClick calls analyticsHandler.trackProductClicked', () => {
      const store = new CarsStore();
      const analyticsProductClickSpy = jest.spyOn(
        analyticsHandler,
        'trackProductClicked'
      );
      const car = {
        vin: '32423uy234hjd',
        consignmentPartnerId: 'someId',
        inventoryId: 234256,
        leadFlagPhotoUrl: 'https://some-url.com',
        year: 2016,
        make: 'Tesla',
        model: 'Model S',
        listingPrice: 41000,
        soldStatus: SoldStatusInt.FOR_SALE,
      } as Car;
      const position = 1;
      const viewModel = new ViewModel(store, car, position);
      viewModel.trackProductClick();
      expect(analyticsProductClickSpy).toHaveBeenCalledTimes(1);
    });
  });
});
