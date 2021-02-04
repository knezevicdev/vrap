import { makeAutoObservable, runInAction } from 'mobx';

import {
  Counts,
  Shipment,
  ShipmentStatus,
} from 'src/networking/models/Shipments';
import { getShipments, Status } from 'src/networking/Networker';

class ShipmentsModel {
  email: string;

  counts: Counts[] = [];
  selectedStatus = ShipmentStatus.Posted;
  shipments: Shipment[] = [];
  status: Status = Status.INITIAL;

  constructor(email: string) {
    this.email = email;
    makeAutoObservable(this, { email: false });
  }

  setSelectedStatus = (value: ShipmentStatus): void => {
    this.selectedStatus = value;
  };

  getShipments = async (): Promise<void> => {
    this.status = Status.FETCHING;

    try {
      const response = await getShipments(this.selectedStatus, this.email);
      runInAction(() => {
        this.shipments = response.data.shipments;
        this.counts = response.data.counts;
        this.status = Status.SUCCESS;
      });
    } catch (err) {
      console.error(err);
      this.status = Status.ERROR;
    }
  };
}

export default ShipmentsModel;
