import { Status } from '@vroom-web/networking';

import DealValidatorModel from './Model';

import DepositCaptured from 'src/modules/dealValidatorModal/samples/DepositCaptured';
import PurchasePending from 'src/modules/dealValidatorModal/samples/PendingPurchase';
import VehicleSold from 'src/modules/dealValidatorModal/samples/VehicleSold';
import Login from 'src/modules/login';

export enum ModalContentMapEnum {
  DEPOSIT_CAPTURED,
  PENDING_PURCHASE,
  VEHICLE_SOLD,
  LOGIN,
}

export type ModalContentList = {
  [key in ModalContentMapEnum]: ModalContentSelected;
};

export type ModalContentSelected = {
  height?: number;
  width?: number;
  onRequestClose: boolean;
  closeIconEnabled: boolean;
  contentLabel: string;
  component: () => JSX.Element;
};

/**
 * Handle the content view to render on validation Modal
 * @param viewSelection
 */
export const modalContentMap = (
  viewSelection: ModalContentMapEnum
): ModalContentSelected => {
  const contents = {
    [ModalContentMapEnum.DEPOSIT_CAPTURED]: {
      height: 300,
      width: 300,
      onRequestClose: false,
      closeIconEnabled: false,
      contentLabel: 'Deposit Captured',
      component: DepositCaptured,
    },
    [ModalContentMapEnum.PENDING_PURCHASE]: {
      height: 300,
      width: 300,
      onRequestClose: false,
      closeIconEnabled: false,
      contentLabel: 'pending Purchase',
      component: PurchasePending,
    },
    [ModalContentMapEnum.VEHICLE_SOLD]: {
      height: 300,
      width: 300,
      onRequestClose: false,
      closeIconEnabled: false,
      contentLabel: 'Vehicle Sold',
      component: VehicleSold,
    },
    [ModalContentMapEnum.LOGIN]: {
      height: 300,
      width: 300,
      onRequestClose: false,
      closeIconEnabled: false,
      contentLabel: 'Login',
      component: Login,
    },
  } as ModalContentList;

  return contents[viewSelection];
};
export default class DealValidatorModalViewModel {
  model: DealValidatorModel;
  modalContent: ModalContentSelected | null;
  openModal = false;

  constructor(model: DealValidatorModel) {
    this.model = model;
    this.modalContent = null;
  }

  getModal(): void {
    if (
      this.model.dataStatus === Status.SUCCESS &&
      !this.model.data.isAuthenticated
    ) {
      this.openModal = true;
      this.modalContent = modalContentMap(ModalContentMapEnum.LOGIN);
    } else if (
      this.model.dataStatus === Status.SUCCESS &&
      this.model.data.isVehicleSold
    ) {
      this.openModal = true;
      this.modalContent = modalContentMap(ModalContentMapEnum.VEHICLE_SOLD);
    } else if (
      this.model.dataStatus === Status.SUCCESS &&
      this.model.data.isDepositCaptured
    ) {
      this.openModal = true;
      this.modalContent = modalContentMap(ModalContentMapEnum.DEPOSIT_CAPTURED);
    } else if (
      this.model.dataStatus === Status.SUCCESS &&
      this.model.data.hasPendingDeal
    ) {
      this.openModal = true;
      this.modalContent = modalContentMap(ModalContentMapEnum.PENDING_PURCHASE);
    }
  }

  get isModalOpen(): boolean {
    this.getModal();
    return this.model.dataStatus === Status.SUCCESS && this.openModal;
  }

  get ModalContent(): ModalContentSelected | null {
    return this.model.dataStatus === Status.SUCCESS ? this.modalContent : null;
  }

  onClose = (): void => {
    this.openModal = false;
  };
}
