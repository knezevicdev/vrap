import { makeAutoObservable, runInAction } from 'mobx';

import ShipmentsModel from '../../Model';

import { ShipmentStatus } from 'src/networking/models/Shipments';
import { patchShipment, Status } from 'src/networking/Networker';

class CancelModel {
  reasons = [
    'Weather',
    'Personal Emergency',
    'Weight',
    'Wrong Load',
    'Mechanical Issue',
    'DOT',
    'Hours of Service',
    'Better Offer',
    'Other',
    'On-site Delays',
  ];
  status: Status = Status.INITIAL;
  shipmentId: number;

  shipmentsModel: ShipmentsModel;

  constructor(shipmentId: number, shipmentsModel: ShipmentsModel) {
    this.shipmentId = shipmentId;
    this.shipmentsModel = shipmentsModel;
    makeAutoObservable(this, { shipmentsModel: false });
  }

  submitCancel = async (reasonCode: string): Promise<void> => {
    this.status = Status.FETCHING;
    const idType = 'shipment';
    try {
      await patchShipment({
        id: this.shipmentId,
        idType,
        status: ShipmentStatus.Cancelled,
        cancelReasonCode: reasonCode,
      });

      await this.shipmentsModel.getShipments();

      runInAction(() => {
        this.status = Status.SUCCESS;
      });
    } catch (err) {
      console.error(err);
      this.status = Status.ERROR;
    }
  };
}

export default CancelModel;
