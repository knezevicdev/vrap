import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import PopoverButton from '../PopoverButton';

export interface BookViewProps {
  handleBook: (pickup: string, delivery: string, shippingCost: string) => void;
}

const BookPopover = ({ handleBook }: BookViewProps): JSX.Element => {
  const [pickupDate, setPickupDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [deliveryDate, setDeliveryDate] = useState(
    dayjs().format('YYYY-MM-DD')
  );
  const [shippingCost, setShippingCost] = useState('0.00');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const pickupIso = dayjs(pickupDate).toISOString();
    const deliveryIso = dayjs(deliveryDate).toISOString();
    handleBook(pickupIso, deliveryIso, shippingCost);
  };

  return (
    <PopoverButton text="Book" primary={true}>
      <Box p={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} direction="column">
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="pickup-date">
                  Estimated pickup date
                </InputLabel>
                <Input
                  id="pickup-date"
                  type="date"
                  value={pickupDate}
                  onChange={(event): void => setPickupDate(event.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="delivery-date">
                  Estimated delivery date
                </InputLabel>
                <Input
                  id="delivery-date"
                  type="date"
                  value={deliveryDate}
                  onChange={(event): void =>
                    setDeliveryDate(event.target.value)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="shipping-cost">
                  Estimated shipping cost
                </InputLabel>
                <Input
                  id="shipping-cost"
                  type="number"
                  value={shippingCost}
                  onChange={(event): void =>
                    setShippingCost(event.target.value)
                  }
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item>
              <InfoOutlinedIcon />
            </Grid>
            <Grid item>
              <p>Changes cannot be made once shipment is booked</p>
            </Grid>
          </Grid>
          <Grid container justify="flex-end" item>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </Grid>
        </form>
      </Box>
    </PopoverButton>
  );
};

export default BookPopover;
