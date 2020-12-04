import { Tab, Tabs } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import React, { useState } from 'react';

import { viewModel } from './Table';

import SimpleTable from 'src/components/SimpleTable';
import mvvm from 'src/mvvm';
import { Shipment, ShipmentStatus } from 'src/networking/models/Shipments';
import { getShipments } from 'src/networking/Networker';

const nav = [
  {
    display: 'Tendered',
    status: ShipmentStatus.Tendered,
  },
  {
    display: 'Booked',
    status: ShipmentStatus.Booked,
  },
  {
    display: 'In Transit',
    status: ShipmentStatus.InTransit,
  },
  {
    display: 'Cancelled',
    status: ShipmentStatus.Cancelled,
  },
  {
    display: 'Delivered',
    status: ShipmentStatus.Delivered,
  },
];

const Shipments: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleNav = (
    _e: React.SyntheticEvent<EventTarget>,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  const Table = mvvm({
    model: {
      onload: (): Promise<AxiosResponse<Shipment[]>> =>
        getShipments(nav[value].status),
    },
    viewModel,
    View: SimpleTable,
  });

  return (
    <>
      <Tabs value={value} onChange={handleNav}>
        {nav.map((tab) => (
          <Tab key={tab.display} label={tab.display} />
        ))}
      </Tabs>
      <Table />
    </>
  );
};

export default Shipments;
