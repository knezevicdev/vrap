export enum DialogTypeEnum {
  DEPOSIT_CAPTURED,
  PENDING_PURCHASE,
  VEHICLE_SOLD,
  LOGIN,
}

export type ModalContentList = {
  [key in DialogTypeEnum]: ModalContentSelected;
};

export type ModalContentSelected = {
  height?: number;
  width?: number;
  dialogType: DialogTypeEnum;
  onRequestClose: boolean;
  closeIconEnabled: boolean;
  component: () => JSX.Element;
  title?: string;
  contentMsg?: string;
};
