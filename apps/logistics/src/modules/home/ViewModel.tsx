import { Grid } from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';

import BookButton from './buttons/Book';
import CancelButton from './buttons/Cancel';
import DeliverButton from './buttons/Deliver';
import PickupButton from './buttons/Pickup';
import ShipmentsModel from './Model';
import { Accessor, TableData } from './Table';

import {
  Address,
  BlackoutDate,
  ShipmentStatus,
} from 'src/networking/models/Shipments';
import { Status } from 'src/networking/Networker';

class ShipmentsViewModel {
  private model: ShipmentsModel;

  constructor(shipmentsModel: ShipmentsModel) {
    this.model = shipmentsModel;
  }

  private datefmt(date?: string): string {
    return date ? dayjs(date).format('YYYY-MM-DD') : '';
  }

  private blackoutdatesfmt(dates?: BlackoutDate[]): JSX.Element[] {
    return dates
      ? dates.map((date) => (
          <>
            {this.datefmt(date.start)} - {this.datefmt(date.stop)} <br />
          </>
        ))
      : [];
  }

  private actionfmt(actions: JSX.Element[]): JSX.Element {
    return (
      <Grid container spacing={1}>
        {actions.map((Button: JSX.Element) => (
          <Grid item xs={6} key={Button.key}>
            {Button}
          </Grid>
        )) ?? null}
      </Grid>
    );
  }

  /* eslint-disable @typescript-eslint/camelcase */
  private addressfmt({
    street_line_1,
    street_line_2,
    city,
    state,
    zipcode,
  }: Address): JSX.Element {
    return (
      <>
        {street_line_1}
        <br />
        {street_line_2}
        {street_line_2 && <br />}
        {city}, {state} {zipcode}
      </>
    );
  }
  /* eslint-enable @typescript-eslint/camelcase */

  setSelectedTab(value: number): void {
    this.model.setSelectedTab(value, this.tabs[value].status);
  }

  getShipments(): void {
    this.model.getShipments();
  }

  get tab(): number {
    return this.model.selectedTab;
  }

  get offset(): number {
    return this.model.offset;
  }

  get limit(): number {
    return this.model.limit;
  }

  get total(): number {
    return this.tabs[this.model.selectedTab].count;
  }

  get from(): number {
    return Math.min(this.offset + 1, this.total);
  }

  get until(): number {
    return this.offset + Math.min(this.limit, this.total);
  }

  get lastOffset(): number {
    return this.total - this.limit;
  }

  nextPage(): void {
    this.model.nextPage();
  }

  prevPage(): void {
    this.model.prevPage();
  }

  get tabs(): {
    display: string;
    count: number;
    status: ShipmentStatus;
    tableData: TableData;
  }[] {
    const count = (display: string): number =>
      this.model.counts.find((j) => j.status === display)?.count || 0;
    return [
      {
        display: 'Posted',
        count: count('Posted'),
        status: ShipmentStatus.Posted,
        tableData: this.posted,
      },
      {
        display: 'Booked',
        count: count('Booked'),
        status: ShipmentStatus.Booked,
        tableData: this.booked,
      },
      {
        display: 'In Transit',
        count: count('In Transit'),
        status: ShipmentStatus.InTransit,
        tableData: this.inTransit,
      },
      {
        display: 'Cancelled',
        count: count('Cancelled'),
        status: ShipmentStatus.Cancelled,
        tableData: this.cancelled,
      },
      {
        display: 'Delivered',
        count: count('Delivered'),
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
            [Accessor.originAddress]: this.addressfmt(row.origin_address),
            [Accessor.destinationAddress]: this.addressfmt(
              row.destination_address
            ),
            [Accessor.actions]: this.actionfmt([
              <BookButton
                key="book"
                shipmentId={row.shipment_id}
                originShipmentStopId={row.origin_address.stop_id}
                destinationShipmentStopId={row.destination_address.stop_id}
                shipmentsModel={this.model}
              />,
            ]),
          },
          details: [
            {
              title: 'Blackout Dates',
              content: this.blackoutdatesfmt(row.blackout_dates),
            },
            { title: 'Destination Phone Number', content: row.customer?.phone },
            { title: 'Notes', content: row.notes },
          ],
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
          [Accessor.originAddress]: this.addressfmt(row.origin_address),
          [Accessor.destinationAddress]: this.addressfmt(
            row.destination_address
          ),
          [Accessor.blackoutDates]: this.blackoutdatesfmt(row.blackout_dates),
          [Accessor.estimatedPickupDate]: this.datefmt(row.estimated_pickup),
          [Accessor.actions]: this.actionfmt([
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
          ]),
        },
        details: [
          {
            title: 'Origin Address',
            content: this.addressfmt(row.origin_address),
          },
          { title: 'Origin Contact', content: row.customer?.name },
          { title: 'Origin Phone Number', content: row.customer?.phone },
          { title: 'Posted Date', content: this.datefmt(row.date_posted) },
          { title: 'Notes', content: row.notes },
        ],
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
            [Accessor.originAddress]: this.addressfmt(row.origin_address),
            [Accessor.destinationAddress]: this.addressfmt(
              row.destination_address
            ),
            [Accessor.blackoutDates]: this.blackoutdatesfmt(row.blackout_dates),
            [Accessor.estimatedDeliveryDate]: this.datefmt(
              row.estimated_delivery
            ),
            [Accessor.actions]: this.actionfmt([
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
            ]),
          },
          details: [
            {
              title: 'Destination Address',
              content: this.addressfmt(row.origin_address),
            },
            { title: 'Destination Contact', content: row.customer?.name },
            { title: 'Destination Phone Number', content: row.customer?.phone },
            { title: 'Posted Date', content: this.datefmt(row.date_posted) },
            { title: 'Notes', content: row.notes },
          ],
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
            [Accessor.originAddress]: this.addressfmt(row.origin_address),
            [Accessor.destinationAddress]: this.addressfmt(
              row.destination_address
            ),
            [Accessor.blackoutDates]: this.blackoutdatesfmt(row.blackout_dates),
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
            [Accessor.originAddress]: this.addressfmt(row.origin_address),
            [Accessor.destinationAddress]: this.addressfmt(
              row.destination_address
            ),
            [Accessor.blackoutDates]: this.blackoutdatesfmt(row.blackout_dates),
          },
        })) || [],
    };
  }
}

export default ShipmentsViewModel;
