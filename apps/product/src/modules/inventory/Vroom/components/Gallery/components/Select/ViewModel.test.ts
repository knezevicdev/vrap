import ViewModel from './ViewModel';

import { Product } from 'src/integrations/AnalyticsHandler';
import {
  GallerySelections,
  GalleryStore,
} from 'src/modules/inventory/Vroom/components/Gallery/store';
jest.mock('src/integrations/AnalyticsHandler');

describe('Select View Model', () => {
  const mockProduct: Product = {
    imageUrl: '',
    inventoryType: 'Vroom',
    make: '',
    model: '',
    name: '',
    price: 1,
    sku: 1,
    vin: '',
    year: 1,
  };

  const mockStore: GalleryStore = {
    selectedGallery: GallerySelections.GENERAL,
    isListView: false,
    listViewFullscreenImage: undefined,
    changeSelectedGallery: jest.fn(),
    changeListView: jest.fn(),
    setListViewFullscreen: jest.fn(),
  };

  describe('hasDefects()', () => {
    test('car has nothing', () => {
      const noDefectsProducts: Product = {
        ...mockProduct,
        spincarSpinUrl: undefined,
        defectPhotos: undefined,
      };
      const viewModel = new ViewModel(mockStore, noDefectsProducts);
      expect(viewModel.hasDefects()).toEqual(false);
      expect(viewModel.defects).toEqual(GallerySelections.DEFECTS);
    });

    test('car has defect photos but no spin', () => {
      const noSpinProduct: Product = {
        ...mockProduct,
        spincarSpinUrl: undefined,
        defectPhotos: true,
      };
      const viewModel = new ViewModel(mockStore, noSpinProduct);
      expect(viewModel.hasDefects()).toEqual(true);
      expect(viewModel.defects).toEqual(GallerySelections.DEFECTS);
    });

    test('car has spin but no defects', () => {
      const noDefectPhotosProduct: Product = {
        ...mockProduct,
        spincarSpinUrl: 'test',
        defectPhotos: undefined,
      };
      const viewModel = new ViewModel(mockStore, noDefectPhotosProduct);
      expect(viewModel.hasDefects()).toEqual(true);
      expect(viewModel.defects).toEqual(GallerySelections.THREE_SIXTY);
    });

    test('car has spin and defects', () => {
      const noDefectPhotosProduct: Product = {
        ...mockProduct,
        spincarSpinUrl: 'test',
        defectPhotos: true,
      };
      const viewModel = new ViewModel(mockStore, noDefectPhotosProduct);
      expect(viewModel.hasDefects()).toEqual(true);
      expect(viewModel.defects).toEqual(GallerySelections.THREE_SIXTY);
    });
  });

  describe('getSelectedGallery()', () => {
    test('View Model returns the selected gallery', () => {
      const viewModel = new ViewModel(mockStore, mockProduct);
      expect(viewModel.getSelectedGallery()).toEqual(GallerySelections.GENERAL);
    });
  });

  describe('handleChange()', () => {
    const mockEvent = ({
      preventDefault: jest.fn(),
    } as unknown) as React.ChangeEvent<{}>;
    const mockValue = GallerySelections.GENERAL;
    test('handleChange calls all functions', () => {
      const viewModel = new ViewModel(mockStore, mockProduct);

      viewModel.analyticsHandler.trackGallerySelection = jest.fn();
      viewModel.handleChange(mockEvent, mockValue);

      expect(mockEvent?.preventDefault).toHaveBeenCalled();
      expect(mockStore.changeSelectedGallery).toHaveBeenCalledWith(mockValue);
      expect(
        viewModel.analyticsHandler.trackGallerySelection(mockProduct, mockValue)
      );
    });
  });
});
