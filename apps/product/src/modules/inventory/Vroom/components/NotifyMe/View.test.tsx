import { render, screen, fireEvent } from '@testing-library/react';
import View from './View';
import ViewModel from './ViewModel';
import { InventoryStore } from 'src/modules/inventory/store';
import { NotifyMeStore } from './store';
import NotifyMeNetworker from './NotifyMeNetworker';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Features View', () => {
  const notifyMeStore = new NotifyMeStore();
  const inventoryStore = new InventoryStore();
  const notifyMeNetworker = new NotifyMeNetworker('url');
  const viewModel = new ViewModel(
    inventoryStore,
    notifyMeStore,
    notifyMeNetworker
  );

  it('should call handleClick fn on button click', async () => {
    viewModel.handleClick = jest.fn();
    render(<View viewModel={viewModel} />);
    const notifyMeButton = await screen.findByRole('button', {
      name: /Notify Me/i,
    });
    fireEvent.click(notifyMeButton);
    expect(viewModel.handleClick).toHaveBeenCalled();
  });
});
