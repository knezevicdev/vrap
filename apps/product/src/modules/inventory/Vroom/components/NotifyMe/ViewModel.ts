import { NotifyMeStore } from './store';

import { InventoryStore } from 'src/modules/inventory/store';

class NotifyMeViewModel {
  private inventoryStore: InventoryStore;
  private notifyMeStore: NotifyMeStore;
  readonly notifyMeButton: string = 'Notify Me';
  readonly dialogTitle: string = 'Notify Me When Available';
  readonly dialogBody: string =
    'Please create an account to receive an email notification when this car becomes available for sale.';
  readonly createAccountButton: string = 'CREATE AN ACCOUNT';
  readonly logInButton: string = 'LOG IN';

  constructor(inventoryStore: InventoryStore, notifyMeStore: NotifyMeStore) {
    this.inventoryStore = inventoryStore;
    this.notifyMeStore = notifyMeStore;
  }

  getVehicleInfo(): void {
    console.log(this.inventoryStore.vehicle._source.vin);
  }

  handleClick(): void {
    this.notifyMeStore.toggleModal();
  }

  handleDialogActions(location: string): void {
    const currentUrl = window.location.pathname;
    const newUrl = `/account/${location}?redirect=${currentUrl}`;
    window.location.href = newUrl;
  }

  isOpen(): boolean {
    return this.notifyMeStore.modalOpen;
  }

  toggleModal(): void {
    this.notifyMeStore.toggleModal();
  }
}

export default NotifyMeViewModel;
