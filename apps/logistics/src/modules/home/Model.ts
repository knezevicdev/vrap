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
  selectedTab = 0;
  shipments: Shipment[] = [];
  status: Status = Status.INITIAL;
  offset = 0;
  limit = 50;

  constructor(email: string) {
    this.email = email;
    makeAutoObservable(this, { email: false });
  }

  setSelectedTab = (tab: number, status: ShipmentStatus): void => {
    this.selectedTab = tab;
    this.selectedStatus = status;
    this.offset = 0;
  };

  nextPage = (): void => {
    this.offset += this.limit;
    this.getShipments();
  };

  prevPage = (): void => {
    this.offset -= this.limit;
    this.getShipments();
  };

  getShipments = async (): Promise<void> => {
    this.status = Status.FETCHING;

    try {
      const response = await getShipments(
        this.selectedStatus,
        this.email,
        this.offset,
        this.limit
      );
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
