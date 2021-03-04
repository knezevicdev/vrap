import { Status } from '@vroom-web/networking';

import { PendingDealDepositCaptured, VehicleSold } from './content';
import DealValidatorModel from './Model';
import {
  DialogTypeEnum,
  ModalContentList,
  ModalContentSelected,
} from './types';
import DealValidatorAnalyticsHandler from "src/integrations/dealValidator/dealValidatorAnalyticsHandler";
import Login from 'src/modules/login';

/**
 * Dynamically inject the content for the dialogs
 * @param viewSelection
 */
export const dialogInnerContent = (
  viewSelection: DialogTypeEnum
): ModalContentSelected => {
  const contents = {
    [DialogTypeEnum.DEPOSIT_CAPTURED]: {
      onRequestClose: false,
      closeIconEnabled: false,
      component: PendingDealDepositCaptured,
      dialogType: DialogTypeEnum.DEPOSIT_CAPTURED,
      title: 'pending purchase',
      contentMsg: `You have placed deposit for another vehicle. Once that purchase is
      complete, you’ll be able to make another purchase. For further
      assistance give us a call at (855) 524-1300.`,
    },
    [DialogTypeEnum.PENDING_PURCHASE]: {
      onRequestClose: false,
      closeIconEnabled: false,
      dialogType: DialogTypeEnum.PENDING_PURCHASE,
      component: PendingDealDepositCaptured,
      title: `pending purchase`,
      contentMsg: `You are currently in the process of purchasing another vehicle. Once that purchase is complete, you'll be able to make another purchase.`,
    },
    [DialogTypeEnum.VEHICLE_SOLD]: {
      onRequestClose: false,
      closeIconEnabled: false,
      dialogType: DialogTypeEnum.VEHICLE_SOLD,
      component: VehicleSold,
      title: 'oh no!',
      contentMsg: `is no longer available.
      Don’t worry. We have thousands of low-mileage, high-quality vehicles for
      you to choose from.`,
    },
    [DialogTypeEnum.LOGIN]: {
      dialogType: DialogTypeEnum.LOGIN,
      onRequestClose: false,
      closeIconEnabled: false,
      component: Login,
    },
  } as ModalContentList;

  return contents[viewSelection];
};
export default class DealValidatorModalViewModel {
  model: DealValidatorModel;
  modalContent: ModalContentSelected | null;
  analyticsHandler: DealValidatorAnalyticsHandler;
  openModal = false;

  constructor(model: DealValidatorModel) {
    this.model = model;
    this.modalContent = null;
    this.analyticsHandler = new DealValidatorAnalyticsHandler();
  }

  getModal(): void {
    if (
      this.model.dataStatus === Status.SUCCESS &&
      this.model.data && !this.model.data.isAuthenticated
    ) {
      //TODO: Finish the Login Modal View
      //this.openModal = true;
      //this.modalContent = dialogInnerContent(DialogTypeEnum.LOGIN);
    } else if (
      this.model.dataStatus === Status.SUCCESS &&
      this.model.data && this.model.data.isVehicleSold
    ) {
      this.openModal = true;
      this.modalContent = dialogInnerContent(DialogTypeEnum.VEHICLE_SOLD);
      this.analyticsHandler.trackVehicleSoldModal();
    } else if (
      this.model.dataStatus === Status.SUCCESS &&
      this.model.data && this.model.data.isDepositCaptured
    ) {
      this.openModal = true;
      this.modalContent = dialogInnerContent(DialogTypeEnum.DEPOSIT_CAPTURED);
      this.analyticsHandler.trackDepositModal();
    } else if (
      this.model.dataStatus === Status.SUCCESS &&
      this.model.data && this.model.data.hasPendingDeal
    ) {
      this.openModal = true;
      this.modalContent = dialogInnerContent(DialogTypeEnum.PENDING_PURCHASE);
      this.analyticsHandler.trackPendingDealModal();
    }
  }

  get isModalOpen(): boolean {
    this.getModal();
    return this.model.dataStatus === Status.SUCCESS && this.openModal;
  }

  get ModalContent(): ModalContentSelected | null {
    return this.model.dataStatus === Status.SUCCESS ? this.modalContent : null;
  }

  get carName(): string {
    if (this.model.dataStatus === Status.SUCCESS) {
      const { year, make, model } = this.model.data && this.model.data.vehicleInfo || {};
      return `${year} ${make} ${model}`;
    }
    return '';
  }

  dialogAction = (dialogType?: DialogTypeEnum): void => {
    //Use DialogType to perform different actions depending of the modal
    //currently each modal send the user to my account.
    location.href = '/my-account/transactions';
    console.log('dialogType', dialogType); //Track Analytic
  };
}
