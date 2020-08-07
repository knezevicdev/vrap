import { Car } from '@vroom-web/inv-search-networking';

import { NotifyMeStore } from './store';

import { InventoryStore } from 'src/modules/inventory/store';

class NotifyMeViewModel {
  private inventoryStore: InventoryStore;
  private notifyMeStore: NotifyMeStore;
  readonly notifyMeButton: string = 'Notify Me';
  readonly dialogTitle: string = 'Notify Me When Available';
  readonly dialogBodyLoggedOut: string =
    'Please create an account to receive an email notification when this car becomes available for sale.';
  readonly dialogBodyLoggedIn1: string = `We’re working to get this 2017 Nissan Armada inspected, photographed and ready for purchase.`;
  readonly dialogBodyLoggedIn2: string =
    'Sign up below to be emailed when this vehicle is available.';
  readonly createAccountButton: string = 'CREATE AN ACCOUNT';
  readonly logInButton: string = 'LOG IN';

  constructor(inventoryStore: InventoryStore, notifyMeStore: NotifyMeStore) {
    this.inventoryStore = inventoryStore;
    this.notifyMeStore = notifyMeStore;
  }

  getYearMakeModel(): string {
    const { year, make, model } = this.inventoryStore.vehicle._source;
    return `${year} ${make} ${model}`;
  }

  handleMount(): void {
    this.notifyMeStore.initClientSide();
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

  isLoggedIn(): boolean {
    return this.notifyMeStore.email !== undefined;
  }

  getUserEmail(): string | undefined {
    return this.notifyMeStore.email;
  }

  getCar(): Car {
    return this.inventoryStore.vehicle._source;
  }

  getVin(): string {
    return this.inventoryStore.vehicle._source.vin;
  }
}

export default NotifyMeViewModel;
