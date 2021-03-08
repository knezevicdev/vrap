import { Car } from '@vroom-web/inv-search-networking';

import NotifyMeNetworker from './NotifyMeNetworker';
import { NotifyMeStore } from './store';

import { analyticsHandler } from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

interface LoggedIn {
  header: string;
  body: string;
  checkboxText: string;
  buttonText: string;
  error: {
    buttonText: string;
    headerText: string;
    bodyText: string;
  };
}

interface VinList {
  subject: {};
  id: string;
  filters: string;
}

class NotifyMeViewModel {
  private inventoryStore: InventoryStore;
  private notifyMeStore: NotifyMeStore;
  private notifyMeNetworker: NotifyMeNetworker;
  readonly notifyMeButton: string = 'Notify Me';
  readonly notifiedButton: string =
    'You’ll receive a notification when this vehicle is available.';
  readonly dialogTitle: string = 'Notify Me When Available';
  readonly dialogTitleSuccess: string = 'We’ll Notify You Soon';
  readonly dialogBodySuccess: string =
    'You’ll receive an email from availablenow@vroom.com as soon as this vehicle can be purchased. The email will be sent to ';
  readonly dialogBodyLoggedOut: string =
    'Please create an account to receive an email notification when this car becomes available for sale.';
  readonly createAccountButton: string = 'CREATE AN ACCOUNT';
  readonly logInButton: string = 'LOG IN';

  readonly loggedIn: LoggedIn = {
    header: 'Sign up below to be notified when this vehicle is available.',
    body:
      'Vroom will notify everyone that has expressed an interest in this vehicle at the same time, at which point the vehicle can be reserved by ANY Vroom customer by placing a deposit on the vehicle.',
    checkboxText:
      'Signing up to be notified when this vehicle is available does not reserve it for you',
    buttonText: 'NOTIFY ME WHEN AVAILABLE',
    error: {
      buttonText: 'TRY AGAIN',
      headerText: 'An Error Occurred',
      bodyText:
        'We’re sorry. There was a problem signing you up for this notification. Please try again.',
    },
  };

  constructor(
    inventoryStore: InventoryStore,
    notifyMeStore: NotifyMeStore,
    notifyMeNetworker: NotifyMeNetworker
  ) {
    this.inventoryStore = inventoryStore;
    this.notifyMeStore = notifyMeStore;
    this.notifyMeNetworker = notifyMeNetworker;
  }

  getYearMakeModel(): string {
    const { year, make, model } = this.inventoryStore.vehicle._source;
    return `${year} ${make} ${model}`;
  }

  handleMount(): void {
    this.notifyMeStore.initClientSide();
    this.isLoggedIn() ? this.setSubscription() : this.setNotifyMeLoading(false);
  }

  handleClick(): void {
    if (!this.isOpen()) {
      analyticsHandler.trackNotifyMeClicked();
    }
    this.notifyMeStore.toggleModal();
    this.setError(false);
  }

  handleDialogActions(location: string): void {
    if (location === 'submit') {
      this.createNotifyMeSubscription();
      return;
    }
    const currentUrl = window.location.pathname;
    const newUrl = `/account/${location}?redirect=${currentUrl}`;
    window.location.href = newUrl;
  }

  // true the user is sub otherwise false
  async setSubscription(): Promise<void> {
    this.setNotifyMeLoading(true);
    this.setSuccessful(false);
    const accessToken = this.getAccessToken();
    const vin = this.getVin();
    try {
      const listResponse = await this.notifyMeNetworker.listSubscription(
        accessToken
      );
      this.setNotifyMeLoading(false);
      const vinList =
        listResponse.data.data.hornListSubscriptions.subscriptions;
      const found = vinList.find((element: VinList) =>
        element.filters.includes(vin)
      );
      if (found !== undefined) {
        this.setSuccessful(true);
      }
    } catch (err) {
      this.setNotifyMeLoading(false);
    }
  }

  createNotifyMeSubscription(): void {
    this.setDialogButtonLoading(true);
    const accessToken = this.getAccessToken();
    this.notifyMeNetworker
      .registerEmail(accessToken)
      .then(() => {
        this.notifyMeNetworker
          .createSubscription(this.getVin(), accessToken)
          .then(() => {
            this.setDialogButtonLoading(false);
            this.setSuccessful(true);
            this.handleClick();
            analyticsHandler.trackNotifyMeSuccess();
          })
          .catch(() => {
            this.setError(true);
            analyticsHandler.trackNotifyMeFailed();
          });
      })
      .catch(() => {
        this.setError(true);
        analyticsHandler.trackNotifyMeFailed();
      });
  }

  handleCheckbox(): void {
    this.notifyMeStore.toggleCheckbox();
  }

  hasError(): boolean {
    return this.notifyMeStore.isError;
  }

  isSuccessful(): {
    isSuccessful: boolean;
    dialogTitle: string;
    body: string;
    button: string;
  } {
    const isSuccessful = this.notifyMeStore.isSuccessful;
    return {
      isSuccessful,
      dialogTitle: isSuccessful ? this.dialogTitleSuccess : this.dialogTitle,
      body: isSuccessful ? this.dialogBodySuccess : this.loggedIn.header,
      button: isSuccessful ? this.notifiedButton : this.notifyMeButton,
    };
  }

  isNotifyButtonDisabled(): boolean {
    return this.isSuccessful().isSuccessful || this.getNotifyMeLoading();
  }

  dialogButtonDisabled(): boolean {
    return (
      !this.isChecked() ||
      this.isSuccessful().isSuccessful ||
      this.getDialogButtonLoading()
    );
  }

  setNotifyMeLoading(value: boolean): void {
    this.notifyMeStore.setNotifyMeLoading(value);
  }

  getNotifyMeLoading(): boolean {
    return this.notifyMeStore.notifyMeLoading;
  }

  setDialogButtonLoading(value: boolean): void {
    this.notifyMeStore.setDialogButtonLoading(value);
  }

  getDialogButtonLoading(): boolean {
    return this.notifyMeStore.dialogButtonLoading;
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

  setSuccessful(value: boolean): void {
    this.notifyMeStore.setSuccess(value);
  }

  setError(value: boolean): void {
    this.setNotifyMeLoading(false);
    this.setDialogButtonLoading(false);
    this.notifyMeStore.setError(value);
  }

  isLoggedIn(): boolean {
    return this.notifyMeStore.accessToken !== undefined;
  }

  getAccessToken(): string | undefined {
    return this.notifyMeStore.accessToken;
  }

  getCar(): Car {
    return this.inventoryStore.vehicle._source;
  }

  getVin(): string {
    return this.inventoryStore.vehicle._source.vin;
  }
}

export default NotifyMeViewModel;
