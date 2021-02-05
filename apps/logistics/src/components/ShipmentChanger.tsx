import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

import { ShipmentStatus } from 'src/networking/models/Shipments';
import { patchShipment } from 'src/networking/Networker';

const ShipmentChanger: React.FC = () => {
  const [shipmentId, setShipmentId] = useState('472');
  const [shipmentStatus, setShipmentStatus] = useState(ShipmentStatus.Posted);
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    patchShipment({
      id: parseInt(shipmentId, 10),
      idType: 'shipment',
      status: shipmentStatus,
    });
  };
  return (
    <Box p={4} bgcolor="white">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          value={shipmentId}
          onChange={(event): void => setShipmentId(event.target.value)}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            value={shipmentStatus}
            onChange={(event): void =>
              setShipmentStatus(event.target.value as ShipmentStatus)
            }
          >
            <FormControlLabel
              value={ShipmentStatus.Posted}
              control={<Radio />}
              label="Posted"
            />
            <FormControlLabel
              value={ShipmentStatus.Booked}
              control={<Radio />}
              label="Booked"
            />
            <FormControlLabel
              value={ShipmentStatus.InTransit}
              control={<Radio />}
              label="In Transit"
            />
            <FormControlLabel
              value={ShipmentStatus.Cancelled}
              control={<Radio />}
              label="Cancelled"
            />
            <FormControlLabel
              value={ShipmentStatus.Delivered}
              control={<Radio />}
              label="Delivered"
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ShipmentChanger;
