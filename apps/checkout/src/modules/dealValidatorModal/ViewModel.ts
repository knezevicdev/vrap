import { makeAutoObservable } from 'mobx';

import { DealValidatorProps } from 'src/core/dealValidator';
import PurchasePending from 'src/modules/dealValidatorModal/samples/PendingPurchase';
import VehicleSold from 'src/modules/dealValidatorModal/samples/VehicleSold';
import Login from 'src/modules/login';

export enum ModalContentMapEnum {
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
const modalContentMap = (
  viewSelection: ModalContentMapEnum
): ModalContentSelected => {
  const contents = {
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
  initialData: DealValidatorProps;
  modalContent: ModalContentSelected;
  openModal = false;

  constructor(initialProps: DealValidatorProps) {
    makeAutoObservable(this);
    this.initialData = initialProps;
    this.modalContent = modalContentMap(ModalContentMapEnum.LOGIN); //Default View Selected
    this.init();
  }

  private init(): void {
    if (!this.initialData.isAuthenticated) {
      this.openModal = true;
      this.modalContent = modalContentMap(ModalContentMapEnum.LOGIN);
    }
    if (this.initialData.isVehicleSold) {
      this.openModal = true;
      this.modalContent = modalContentMap(ModalContentMapEnum.VEHICLE_SOLD);
    }
    if (this.initialData.isDepositCaptured) {
      this.openModal = true;
      this.modalContent = modalContentMap(ModalContentMapEnum.PENDING_PURCHASE);
    }
  }

  get isModalOpen(): boolean {
    return this.openModal;
  }

  get ModalContent(): ModalContentSelected {
    return this.modalContent;
  }

  onClose = (): void => {
    this.openModal = false;
  };
}
