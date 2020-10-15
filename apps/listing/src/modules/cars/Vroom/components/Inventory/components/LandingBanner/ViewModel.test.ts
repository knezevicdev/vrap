/* eslint-disable @typescript-eslint/camelcase */
import { Filters, FiltersData } from '@vroom-web/catalog-url-integration';

import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Landing Banner View Model', () => {
  const store = new CarsStore();
  const viewModel = new ViewModel(store);

  let mockFilterData: FiltersData;

  describe('showJeepWranglerBanner', () => {
    it('should return false if filters are empty', () => {
      mockFilterData = {};
      store.filtersData = mockFilterData;
      const showJeep = viewModel.showJeepWranglerBanner();
      expect(showJeep).toBe(false);
    });
    it('should return false if jeep wrangler is not included', () => {
      mockFilterData = {
        [Filters.MAKE_AND_MODELS]: [
          {
            makeSlug: 'nissan',
            modelSlugs: ['sentra'],
          },
          {
            makeSlug: 'mazda',
          },
          {
            makeSlug: 'volvo',
            modelSlugs: ['xc80', 'xc90'],
          },
        ],
      };
      store.filtersData = mockFilterData;
      const showJeep = viewModel.showJeepWranglerBanner();
      expect(showJeep).toBe(false);
    });
    it('should return false if jeep is included without wrangler', () => {
      mockFilterData = {
        [Filters.MAKE_AND_MODELS]: [
          {
            makeSlug: 'nissan',
            modelSlugs: ['sentra'],
          },
          {
            makeSlug: 'jeep',
          },
          {
            makeSlug: 'volvo',
            modelSlugs: ['xc80', 'xc90'],
          },
        ],
      };
      store.filtersData = mockFilterData;
      const showJeep = viewModel.showJeepWranglerBanner();
      expect(showJeep).toBe(false);
    });
    it('should return true if jeep wrangler is included alone', () => {
      mockFilterData = {
        [Filters.MAKE_AND_MODELS]: [
          {
            makeSlug: 'jeep',
            modelSlugs: ['wrangler'],
          },
        ],
      };
      store.filtersData = mockFilterData;
      const showJeep = viewModel.showJeepWranglerBanner();
      expect(showJeep).toBe(true);
    });
    it('should return true if jeep wranger is included with others', () => {
      mockFilterData = {
        [Filters.MAKE_AND_MODELS]: [
          {
            makeSlug: 'nissan',
            modelSlugs: ['sentra'],
          },
          {
            makeSlug: 'volvo',
          },
          {
            makeSlug: 'jeep',
            modelSlugs: ['wrangler'],
          },
        ],
      };
      store.filtersData = mockFilterData;
      const showJeep = viewModel.showJeepWranglerBanner();
      expect(showJeep).toBe(true);
    });
  });
});
