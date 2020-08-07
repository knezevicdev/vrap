import { Car } from '@vroom-web/inv-search-networking';

import { NotifyMeStore } from './store';

import { InventoryStore } from 'src/modules/inventory/store';

interface LoggedIn {
  header1: string;
  header2: string;
  bodyTitle: string;
  body: string;
  checkboxText: string;
  buttonText: string;
}

class NotifyMeViewModel {
  private inventoryStore: InventoryStore;
  private notifyMeStore: NotifyMeStore;
  readonly notifyMeButton: string = 'Notify Me';
  readonly dialogTitle: string = 'Notify Me When Available';
  readonly dialogBodyLoggedOut: string =
    'Please create an account to receive an email notification when this car becomes available for sale.';
  readonly createAccountButton: string = 'CREATE AN ACCOUNT';
  readonly logInButton: string = 'LOG IN';

  readonly loggedIn: LoggedIn = {
    header1: '',
    header2: 'Sign up below to be emailed when this vehicle is available.',
    bodyTitle: "We'll email you at:",
    body:
      'Vroom will notify everyone that has expressed an interest in this vehicle at the same time, at which point the vehicle can be reserved by ANY Vroom customer by placing a deposit on the vehicle.',
    checkboxText:
      'Signing up to be notified when this vehicle is available DOES NOT reserve it for you.',
    buttonText: 'EMAIL ME WHEN I CAN BUY THIS VEHICLE',
  };

  constructor(inventoryStore: InventoryStore, notifyMeStore: NotifyMeStore) {
    this.inventoryStore = inventoryStore;
    this.notifyMeStore = notifyMeStore;
    this.loggedIn.header1 = `We’re working to get this ${this.getYearMakeModel()} inspected, photographed and ready for purchase.`;
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
    if (location === 'submit') {
      return alert('submitted');
    }
    const currentUrl = window.location.pathname;
    const newUrl = `/account/${location}?redirect=${currentUrl}`;
    window.location.href = newUrl;
  }

  handleCheckbox(): void {
    this.notifyMeStore.toggleCheckbox();
  }

  isOpen(): boolean {
    return this.notifyMeStore.modalOpen;
  }

  isChecked(): boolean {
    return this.notifyMeStore.isChecked;
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
