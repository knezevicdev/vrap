import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { Product } from 'src/integrations/AnalyticsHandler';
import { GallerySelections, InventoryStore } from 'src/modules/inventory/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

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

  const mockStore = new InventoryStore();

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
