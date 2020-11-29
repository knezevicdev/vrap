import { Car, DefectType } from '@vroom-web/inv-search-networking';

import Description from './components/Description';
import { GalleryStore } from './store';
import ViewModel from './ViewModel';

import { InventoryStore } from 'src/modules/inventory/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Gallery ViewModel', () => {
  let mockInventoryStore: InventoryStore;
  let mockGalleryStore: GalleryStore;
  let viewModel: ViewModel;

  beforeEach(() => {
    mockInventoryStore = new InventoryStore();
    mockGalleryStore = new GalleryStore();
  });

  describe('getDefectImages()', () => {
    test('if no defectPhotos, defectImages is empty array', () => {
      mockInventoryStore.vehicle._source = {} as Car;
      viewModel = new ViewModel(mockInventoryStore, mockGalleryStore);
      const expectedState: Array<void> = [];
      const receivedState = viewModel.getDefectImages();
      expect(receivedState).toEqual(expectedState);
    });

    test('if defectPhotos exists, defectImages is populated accordingly', () => {
      mockInventoryStore.vehicle._source = {
        defectPhotos: [
          {
            defectType: DefectType.SCRATCH,
            location: 'imgLocation',
            url: 'imgUrl',
          },
        ],
      } as Car;
      viewModel = new ViewModel(mockInventoryStore, mockGalleryStore);
      const expectedState = [
        {
          original: 'imgUrl',
          thumbnail: 'imgUrl',
          description: 'Scratch - imgLocation',
          renderItem: Description.bind(this),
        },
      ];
      const receivedState = viewModel.getDefectImages();

      expect(JSON.stringify(receivedState)).toEqual(
        JSON.stringify(expectedState)
      );
    });
  });
});
