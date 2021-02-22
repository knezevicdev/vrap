import { makeAutoObservable, runInAction } from 'mobx';

import ShipmentsModel from '../../Model';

import { ShipmentStatus } from 'src/networking/models/Shipments';
import {
  patchShipment,
  patchShipmentStop,
  Status,
} from 'src/networking/Networker';

class BookModel {
  status: Status = Status.INITIAL;
  shipmentId: number;
  originShipmentStopId: number;
  destinationShipmentStopId: number;
  shipmentsModel: ShipmentsModel;

  constructor(
    shipmentId: number,
    originShipmentStopId: number,
    destinationShipmentStopId: number,
    shipmentsModel: ShipmentsModel
  ) {
    this.shipmentId = shipmentId;
    this.originShipmentStopId = originShipmentStopId;
    this.destinationShipmentStopId = destinationShipmentStopId;
    this.shipmentsModel = shipmentsModel;
    makeAutoObservable(this, { shipmentsModel: false });
  }

  submitBook = async (
    pickup: string,
    delivery: string,
    shippingCost: number
  ): Promise<void> => {
    this.status = Status.FETCHING;
    const idType = 'shipment';
    try {
      await patchShipmentStop({
        shipmentId: this.shipmentId,
        shipmentStopId: this.originShipmentStopId,
        idType: 'shipment',
        estimatedArrival: pickup,
      });

      await patchShipmentStop({
        shipmentId: this.shipmentId,
        shipmentStopId: this.destinationShipmentStopId,
        idType: 'shipment',
        estimatedArrival: delivery,
      });

      await patchShipment({
        id: this.shipmentId,
        idType,
        status: ShipmentStatus.Booked,
        cost: shippingCost,
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

export default BookModel;
