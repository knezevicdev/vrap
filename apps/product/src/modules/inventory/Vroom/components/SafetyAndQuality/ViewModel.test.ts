import { Car } from '@vroom-web/inv-search-networking';

import ViewModel from './ViewModel';

import { GallerySelections, InventoryStore } from 'src/modules/inventory/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('SafetyAndQuality ViewModel', () => {
  let mockInventoryStore: InventoryStore;
  let viewModel: ViewModel;

  beforeEach(() => {
    mockInventoryStore = new InventoryStore();
  });

  describe('getImperfections()', () => {
    const defaultState = {
      description: [
        '<bold>Any imperfections shown</bold> in the vehicle photos ',
        '<bold>will not be repaired</bold> and are considered normal wear and tear.',
      ],
    };

    test('Quantity and linkText show number of defect photos', () => {
      mockInventoryStore.vehicle._source = {} as Car;
      viewModel = new ViewModel(mockInventoryStore);
      const expectedState = {
        ...defaultState,
        quantity: 0,
        linkText: 'View (0) Imperfection Photos',
      };
      const receivedState = viewModel.getImperfections();
      expect(receivedState).toEqual(expectedState);
    });

    test('Quantity and linkText show number of defect photos', () => {
      mockInventoryStore.vehicle._source = ({
        defectPhotos: [{}, {}, {}],
      } as unknown) as Car;
      viewModel = new ViewModel(mockInventoryStore);
      const expectedState = {
        ...defaultState,
        quantity: 3,
        linkText: 'View (3) Imperfection Photos',
      };
      const receivedState = viewModel.getImperfections();
      expect(receivedState).toEqual(expectedState);
    });
  });

  describe('handleShowDefectGallery()', () => {
    const noop = (): void => {
      return;
    };
    Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

    test('GallerySelection is set to imperfections tab when tab is general', () => {
      viewModel = new ViewModel(mockInventoryStore);
      const event = ({
        preventDefault: jest.fn(),
      } as unknown) as React.ChangeEvent<HTMLInputElement>;
      const initialReceivedState = mockInventoryStore.selectedGallery;
      const initialExpectedState = GallerySelections.GENERAL;
      expect(initialReceivedState).toEqual(initialExpectedState);

      viewModel.handleShowDefectGallery(event);

      const newReceivedState = mockInventoryStore.selectedGallery;
      const newExpectedState = GallerySelections.DEFECTS;
      expect(newReceivedState).toEqual(newExpectedState);
    });

    test('GallerySelection stays on imperfections tab when fired', () => {
      mockInventoryStore.selectedGallery = GallerySelections.DEFECTS;
      viewModel = new ViewModel(mockInventoryStore);
      const event = ({
        preventDefault: jest.fn(),
      } as unknown) as React.ChangeEvent<HTMLInputElement>;
      const initialReceivedState = mockInventoryStore.selectedGallery;
      const initialExpectedState = GallerySelections.DEFECTS;
      expect(initialReceivedState).toEqual(initialExpectedState);

      viewModel.handleShowDefectGallery(event);

      const newReceivedState = mockInventoryStore.selectedGallery;
      const newExpectedState = GallerySelections.DEFECTS;
      expect(newReceivedState).toEqual(newExpectedState);
    });
  });
});
