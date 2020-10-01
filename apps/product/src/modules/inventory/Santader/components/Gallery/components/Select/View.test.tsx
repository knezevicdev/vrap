import 'mobx-react-lite/batchingForReactDom';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { GallerySelections } from '../../store';
import View from './View';
import ViewModel from './ViewModel';

import { Product } from 'src/integrations/AnalyticsHandler';
import { GalleryStore } from 'src/modules/inventory/Vroom/components/Gallery/store';
jest.mock('src/integrations/AnalyticsHandler');

describe('Select View', () => {
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

  const viewModel = new ViewModel(mockStore, mockProduct);
  viewModel.handleChange = jest.fn();

  describe('Tabs', () => {
    test('handle change is being called', () => {
      render(<View viewModel={viewModel} />);
      userEvent.click(
        screen.getByText(GallerySelections.GENERAL.toUpperCase())
      );
      expect(viewModel.handleChange).toHaveBeenCalledTimes(1);
    });
  });
});
