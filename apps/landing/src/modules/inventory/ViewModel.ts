import { InventoryStore, Status } from './store/store';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class InventoryViewModel {
  private store: InventoryStore;
  readonly button = 'Shop vehicles now';
  readonly errorText = 'Something went wrong.';
  readonly icon = `${publicRuntimeConfig.BASE_PATH}/icons/no-result.svg`;

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  loading(): boolean {
    const result =
      this.store.vehicleStatus === Status.FETCHING ||
      this.store.vehicleStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.vehicleStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    return this.store.vehicleStatus === Status.ERROR;
  }

  handleClick(): void {
    window.location.href = '/cars';
  }
}

export default InventoryViewModel;
