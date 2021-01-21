import { makeAutoObservable, runInAction } from 'mobx';

import ShipmentsModel from '../../Model';

import { ShipmentStatus } from 'src/networking/models/Shipments';
import {
  patchShipment,
  patchShipmentStop,
  Status,
} from 'src/networking/Networker';

class DeliverModel {
  status: Status = Status.INITIAL;
  shipmentId: number;
  shipmentStopId: number;
  shipmentsModel: ShipmentsModel;

  constructor(
    shipmentId: number,
    shipmentStopId: number,
    shipmentsModel: ShipmentsModel
  ) {
    this.shipmentId = shipmentId;
    this.shipmentStopId = shipmentStopId;
    this.shipmentsModel = shipmentsModel;
    makeAutoObservable(this, { shipmentsModel: false });
  }

  submitBook = async (arrival: string): Promise<void> => {
    this.status = Status.FETCHING;
    const idType = 'shipment';
    try {
      await patchShipmentStop({
        shipmentId: this.shipmentId,
        shipmentStopId: this.shipmentStopId,
        idType,
        arrival,
      });

      await patchShipment({
        id: this.shipmentId,
        idType,
        status: ShipmentStatus.Delivered,
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

export default DeliverModel;
