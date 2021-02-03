import dayjs from 'dayjs';
import React from 'react';

import BookButton from './buttons/Book';
import CancelButton from './buttons/Cancel';
import DeliverButton from './buttons/Deliver';
import PickupButton from './buttons/Pickup';
import ShipmentsModel from './Model';
import { Accessor, TableData } from './Table';

import { ShipmentStatus } from 'src/networking/models/Shipments';
import { Status } from 'src/networking/Networker';

class ShipmentsViewModel {
  private model: ShipmentsModel;

  constructor(shipmentsModel: ShipmentsModel) {
    this.model = shipmentsModel;
  }

  private datefmt(date: string | undefined): string {
    return date ? dayjs(date).format('YYYY-MM-DD') : '';
  }

  setSelectedStatus(tabValue: number): void {
    this.model.setSelectedStatus(this.tabs[tabValue].status);
  }

  getShipments(): void {
    this.model.getShipments();
  }

  get tabs(): {
    display: string;
    status: ShipmentStatus;
    tableData: TableData;
  }[] {
    const displayCount = (value: string): string => {
      const found = this.model.counts.find((j) => j.status === value);
      return `${value} (${found ? found.count : 0})`;
    };
    return [
      {
        display: displayCount('Posted'),
        status: ShipmentStatus.Posted,
        tableData: this.posted,
      },
      {
        display: displayCount('Booked'),
        status: ShipmentStatus.Booked,
        tableData: this.booked,
      },
      {
        display: displayCount('In Transit'),
        status: ShipmentStatus.InTransit,
        tableData: this.inTransit,
      },
      {
        display: displayCount('Cancelled'),
        status: ShipmentStatus.Cancelled,
        tableData: this.cancelled,
      },
      {
        display: displayCount('Delivered'),
        status: ShipmentStatus.Delivered,
        tableData: this.delivered,
      },
    ];
  }

  get loading(): boolean {
    return this.model.status === Status.FETCHING;
  }

  get posted(): TableData {
    return {
      headers: [
        { display: 'VIN', accessor: Accessor.vin },
        { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
        { display: 'Posted Date', accessor: Accessor.postedDate, sortBy: true },
        { display: 'Origin', accessor: Accessor.originAddress },
        { display: 'Destination', accessor: Accessor.destinationAddress },
        { display: 'Action(s)', accessor: Accessor.actions },
      ],
      rows:
        this.model.shipments.map((row) => ({
          id: row.shipment_id,
          data: {
            [Accessor.vin]: row.vin,
            [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
            [Accessor.postedDate]: this.datefmt(row.date_posted),
            [Accessor.originAddress]: row.origin_address.to_string,
            [Accessor.destinationAddress]: row.destination_address.to_string,
            [Accessor.actions]: [
              <BookButton
                key="book"
                shipmentId={row.shipment_id}
                originShipmentStopId={row.origin_address.stop_id}
                destinationShipmentStopId={row.destination_address.stop_id}
                shipmentsModel={this.model}
              />,
            ],
          },
        })) || [],
    };
  }

  get booked(): TableData {
    return {
      headers: [
        { display: 'VIN', accessor: Accessor.vin },
        { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
        { display: 'Booked Date', accessor: Accessor.bookedDate, sortBy: true },
        { display: 'Origin', accessor: Accessor.originAddress },
        { display: 'Destination', accessor: Accessor.destinationAddress },
        { display: 'Blackout Dates', accessor: Accessor.blackoutDates },
        { display: 'Estimated Pickup', accessor: Accessor.estimatedPickupDate },
        { display: 'Action(s)', accessor: Accessor.actions },
      ],
      rows: this.model.shipments.map((row) => ({
        id: row.shipment_id,
        data: {
          [Accessor.vin]: row.vin,
          [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
          [Accessor.bookedDate]: this.datefmt(row.booked_date),
          [Accessor.originAddress]: row.origin_address.to_string,
          [Accessor.destinationAddress]: row.destination_address.to_string,
          [Accessor.blackoutDates]:
            row.blackout_dates?.map((date) => date.to_string).join(', ') || '',
          [Accessor.estimatedPickupDate]: this.datefmt(row.estimated_pickup),
          [Accessor.actions]: [
            <PickupButton
              key="pickup"
              shipmentId={row.shipment_id}
              shipmentStopId={row.origin_address.stop_id}
              shipmentsModel={this.model}
            />,
            <CancelButton
              key="cancel"
              shipmentId={row.shipment_id}
              shipmentsModel={this.model}
            />,
          ],
        },
      })),
    };
  }

  get inTransit(): TableData {
    return {
      headers: [
        { display: 'VIN', accessor: Accessor.vin },
        { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
        {
          display: 'Picked Up Date',
          accessor: Accessor.pickedUpDate,
          sortBy: true,
        },
        { display: 'Origin', accessor: Accessor.originAddress },
        { display: 'Destination', accessor: Accessor.destinationAddress },
        { display: 'Blackout Dates', accessor: Accessor.blackoutDates },
        {
          display: 'Estimated Delivery',
          accessor: Accessor.estimatedDeliveryDate,
        },
        { display: 'Action(s)', accessor: Accessor.actions },
      ],
      rows:
        this.model.shipments.map((row) => ({
          id: row.shipment_id,
          data: {
            [Accessor.vin]: row.vin,
            [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
            [Accessor.pickedUpDate]: this.datefmt(row.actual_pickup),
            [Accessor.originAddress]: row.origin_address.to_string,
            [Accessor.destinationAddress]: row.destination_address.to_string,
            [Accessor.blackoutDates]:
              row.blackout_dates?.map((date) => date.start).join(', ') || '',
            [Accessor.estimatedDeliveryDate]: this.datefmt(
              row.estimated_delivery
            ),
            [Accessor.actions]: [
              <DeliverButton
                key="deliver"
                shipmentId={row.shipment_id}
                shipmentStopId={row.destination_address.stop_id}
                shipmentsModel={this.model}
              />,
              <CancelButton
                key="cancel"
                shipmentId={row.shipment_id}
                shipmentsModel={this.model}
              />,
            ],
          },
        })) || [],
    };
  }

  get cancelled(): TableData {
    return {
      headers: [
        { display: 'VIN', accessor: Accessor.vin },
        { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
        {
          display: 'Cancelled Date',
          accessor: Accessor.cancelledDate,
          sortBy: true,
        },
        { display: 'Posted Date', accessor: Accessor.postedDate, sortBy: true },
        { display: 'Origin', accessor: Accessor.originAddress },
        { display: 'Destination', accessor: Accessor.destinationAddress },
        { display: 'Blackout Dates', accessor: Accessor.blackoutDates },
        { display: 'Reason', accessor: Accessor.reason },
      ],
      rows:
        this.model.shipments.map((row) => ({
          id: row.shipment_id,
          data: {
            [Accessor.vin]: row.vin,
            [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
            [Accessor.cancelledDate]: this.datefmt(row.date_cancelled),
            [Accessor.postedDate]: this.datefmt(row.date_posted),
            [Accessor.originAddress]: row.origin_address.to_string,
            [Accessor.destinationAddress]: row.destination_address.to_string,
            [Accessor.blackoutDates]:
              row.blackout_dates?.map((date) => date.start).join(', ') || '',
            [Accessor.reason]: row.cancel_reason || '',
          },
        })) || [],
    };
  }

  get delivered(): TableData {
    return {
      headers: [
        { display: 'VIN', accessor: Accessor.vin },
        { display: 'Year, Make, Model', accessor: Accessor.yearMakeModel },
        {
          display: 'Delivery Date',
          accessor: Accessor.deliveredDate,
          sortBy: true,
        },
        {
          display: 'Estimated Delivery',
          accessor: Accessor.estimatedDeliveryDate,
          sortBy: true,
        },
        { display: 'Origin', accessor: Accessor.originAddress },
        { display: 'Destination', accessor: Accessor.destinationAddress },
        { display: 'Blackout Dates', accessor: Accessor.blackoutDates },
      ],
      rows:
        this.model.shipments.map((row) => ({
          id: row.shipment_id,
          data: {
            [Accessor.vin]: row.vin,
            [Accessor.yearMakeModel]: `${row.year} ${row.make} ${row.model}`,
            [Accessor.deliveredDate]: this.datefmt(row.date_delivered),
            [Accessor.estimatedDeliveryDate]: this.datefmt(
              row.estimated_delivery
            ),
            [Accessor.originAddress]: row.origin_address.to_string,
            [Accessor.destinationAddress]: row.destination_address.to_string,
            [Accessor.blackoutDates]:
              row.blackout_dates?.map((date) => date.to_string).join(', ') ||
              '',
          },
        })) || [],
    };
  }
}

export default ShipmentsViewModel;
