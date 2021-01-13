import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { AxiosResponse } from 'axios';
import cookie from 'js-cookie';
import React, { useState } from 'react';

import Table from './Table';
import BookedVM from './viewModels/booked';
import CancelledVM from './viewModels/cancelled';
import DeliveredVM from './viewModels/delivered';
import TenderedVM from './viewModels/tendered';
import TransitVM from './viewModels/transit';

import mvvm from 'src/mvvm';
import {
  Address,
  Shipment,
  ShipmentStatus,
} from 'src/networking/models/Shipments';
import { getShipments } from 'src/networking/Networker';
import theme from 'src/theme';

const nav = [
  {
    display: 'Tendered',
    status: ShipmentStatus.Tendered,
    data: TenderedVM,
  },
  {
    display: 'Booked',
    status: ShipmentStatus.Booked,
    data: BookedVM,
  },
  {
    display: 'In Transit',
    status: ShipmentStatus.InTransit,
    data: TransitVM,
  },
  {
    display: 'Cancelled',
    status: ShipmentStatus.Cancelled,
    data: CancelledVM,
  },
  {
    display: 'Delivered',
    status: ShipmentStatus.Delivered,
    data: DeliveredVM,
  },
];

const BorderedTabs = styled(Tabs)({
  border: `1px solid ${theme.palette.grey.A100}`,
});

export const addressToStringArray = ({
  // eslint-disable-next-line @typescript-eslint/camelcase
  street_line_1,
  city,
  state,
  // eslint-disable-next-line @typescript-eslint/camelcase
  zip_code,
}: Address): string[] => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  return [street_line_1, `${city}, ${state} ${zip_code}`];
};

const Shipments: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleNav = (
    _e: React.SyntheticEvent<EventTarget>,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  const DataTable = mvvm({
    model: {
      onload: (): Promise<AxiosResponse<{ shipments: Shipment[] }>> => {
        const decoded: { email: string } = cookie.getJSON('authData');
        return getShipments(nav[value].status, decoded.email);
      },
    },
    viewModel: nav[value].data,
    View: Table,
  });

  return (
    <Box m={12}>
      <Typography variant="h1">Header for everything</Typography>
      <BorderedTabs
        value={value}
        onChange={handleNav}
        variant="fullWidth"
        indicatorColor="primary"
      >
        {nav.map((tab) => (
          <Tab key={tab.display} label={tab.display} />
        ))}
      </BorderedTabs>
      <DataTable />
    </Box>
  );
};

export default Shipments;
