import { action, makeObservable, observable } from 'mobx';
import { GQLTypes, Status } from '@vroom-web/networking';
import AnalyticsHandler from 'src/integrations/vehicleTradeIn/VehicleTradeInAnalyticsHandler';
import { datadogRum } from '@datadog/browser-rum';
import Model from './Model';


interface AnalyticsData {
  UUID?: string;
  username: string;
  vin?: string;
  paymentMethod?: string;
  step?: string;
  orderId?: number;
  productId?: string;
  productName?: string;
  hasTrade: boolean;
}

export default class VehicleTradeInViewModel {
  model: Model;
  isOpen = false;
  analyticsHandler: AnalyticsHandler;

  constructor(model: Model) {
    this.model = model;
    this.analyticsHandler = new AnalyticsHandler();
    makeObservable(this, {
      isOpen: observable,
      setIsOpen: action,
    });
  }
  get showLoading(): boolean {
    return this.model.dataStatus === Status.LOADING;
  }

  private get error(): boolean {
    return this.model.dataStatus === Status.ERROR;
  }

  private get empty(): boolean {
    if (this.model.dataStatus !== Status.SUCCESS) {
      return false;
    }
    if (!this.model.data.user.deals) {
      return true;
    }
    return this.model.data.user.deals.length === 0;
  }

  get showError(): boolean {
    return this.empty || this.error;
  }
  get showSuccess(): boolean {
    return !this.empty && !this.error && !this.showLoading;
  }
  openDialog = (): void => {
    this.setIsOpen(true);
  };
  setIsOpen = (isOpen: boolean): void => {
    this.isOpen = isOpen;
  };

  closeDialog = (): void => {
    this.setIsOpen(false);
  };

  getIsOpen = (): boolean => {
    return this.isOpen;
  };

  trackLicensePlateClick = (): void => {
    this.analyticsHandler.trackLicensePlateClick();
  };

  trackVinClick = (): void => {
    this.analyticsHandler.trackVinClick();
  };

  private get summary(): GQLTypes.DealSummary {
    return (this.model.data.user.deals as Array<GQLTypes.Deal>)[0].dealSummary;
  }

  private get dealId(): number {
    return (this.model.data.user.deals as Array<GQLTypes.Deal>)[0].dealID;
  }

  get analyticsData(): AnalyticsData {
    return {
      username: this.model.data.user.username,
      vin: this.summary.inventory?.vehicle?.vin,
      paymentMethod: this.summary.paymentType,
      step: this.summary.dealStatus.step,
      orderId: this.dealId,
      productId: this.summary.inventory?.id,
      productName: this.summary.inventory?.vehicle?.vin,
      hasTrade: this.summary.dealStatus.interestedInTrade,
    };
  }

  trackInitialAnalytics = (): void => {
    if (this.showSuccess) { 
      const { orderId, productId } = this.analyticsData;
      datadogRum.addUserAction('vehicleTradeIn', {
        deal: {
          dealId: orderId,
          inventoryId: productId,
        },
      });
    }
  }

}
