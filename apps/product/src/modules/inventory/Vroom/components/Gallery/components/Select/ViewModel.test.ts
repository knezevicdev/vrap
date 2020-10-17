import ViewModel from './ViewModel';

import { Product } from 'src/integrations/AnalyticsHandler';
import { GallerySelections, InventoryStore } from 'src/modules/inventory/store';
jest.mock('src/integrations/AnalyticsHandler');

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

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

  const mockStore = new InventoryStore();

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
    mockStore.changeSelectedGallery = jest.fn();
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
