import { render, screen, fireEvent } from '@testing-library/react';
import View from './View';
import ViewModel from './ViewModel';
import { FeaturesStore } from './store';
import { InventoryStore } from 'src/modules/inventory/store';
import data from '../../testCar.json';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

const SHOW_ALL = 'SHOW ALL FEATURES';
const SHOW_LESS = 'SHOW LESS FEATURES';

describe('Features View', () => {
  const featureStore = new FeaturesStore();
  const inventoryStore = new InventoryStore();

  it('should not display the Show All/Show Less Text when features < 14', async () => {
    inventoryStore.vehicle._source = data;
    const viewModel = new ViewModel(inventoryStore, featureStore);
    render(<View viewModel={viewModel} />);
    const showAllText = await screen.queryByText(SHOW_ALL);
    const showLessText = await screen.queryByText(SHOW_LESS);
    expect(showAllText).toBeNull();
    expect(showLessText).toBeNull();
  });

  it('should display the Show All when features > 14 and click should call view model onClick fn', async () => {
    data.optionalFeatures = 'feature,'.repeat(20);
    inventoryStore.vehicle._source = data;
    const viewModel = new ViewModel(inventoryStore, featureStore);
    viewModel.onClick = jest.fn();
    render(<View viewModel={viewModel} />);
    const showAllText = await screen.findByText(SHOW_ALL);
    const showLessText = await screen.queryByText(SHOW_LESS);
    fireEvent.click(showAllText);
    expect(viewModel.onClick).toHaveBeenCalled();
    expect(showLessText).toBeNull();
  });

  it('should display the Show Less Text when expanded and click should call view model onClick fn', async () => {
    data.optionalFeatures = 'feature,'.repeat(20);
    inventoryStore.vehicle._source = data;
    featureStore.limited = false;
    const viewModel = new ViewModel(inventoryStore, featureStore);
    viewModel.onClick = jest.fn();
    render(<View viewModel={viewModel} />);
    const showAllText = await screen.queryByText(SHOW_ALL);
    const showLessText = await screen.findByText(SHOW_LESS);
    fireEvent.click(showLessText);
    expect(viewModel.onClick).toHaveBeenCalled();
    expect(showAllText).toBeNull();
  });
});
