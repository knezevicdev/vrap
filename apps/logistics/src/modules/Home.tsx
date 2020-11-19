import { Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';

import { viewModel } from './Table';

import SimpleTable from 'src/components/SimpleTable';
import mvvm from 'src/mvvm';
import {
  getBookedShipments,
  getCancelledShipments,
  getDeliveredShipments,
  getInTransitShipments,
  getTenderedShipments,
} from 'src/networking/Networker';

const nav = [
  { display: 'Tendered', api: getTenderedShipments },
  { display: 'Booked', api: getBookedShipments },
  { display: 'In Transit', api: getInTransitShipments },
  { display: 'Cancelled', api: getCancelledShipments },
  { display: 'Delivered', api: getDeliveredShipments },
];

const Shipments: React.FC = () => {
  const [api, setApi] = useState(() => getTenderedShipments);
  const [value, setValue] = useState(0);

  const handleNav = (
    _e: React.SyntheticEvent<EventTarget>,
    newValue: number
  ): void => {
    setApi(() => nav[newValue].api);
    setValue(newValue);
  };

  const Table = mvvm({
    model: { onload: api },
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
