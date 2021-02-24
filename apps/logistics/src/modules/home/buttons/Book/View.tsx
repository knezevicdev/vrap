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
import { observer } from 'mobx-react';
import React from 'react';

import PopoverButton from '../PopoverButton';
import ViewModel from './ViewModel';

export interface Props {
  viewModel: ViewModel;
}

const BookPopover = ({ viewModel }: Props): JSX.Element => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    viewModel.handleBook();
  };

  return (
    <PopoverButton text="Book" primary={true}>
      <Box p={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} direction="column">
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="pickup-date" shrink>
                  Estimated pickup date
                </InputLabel>
                <Input
                  id="pickup-date"
                  type="date"
                  value={viewModel.pickupDate}
                  inputProps={{ min: viewModel.pickupDateMin }}
                  onChange={(event): void => {
                    viewModel.pickupDate = event.target.value;
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="delivery-date" shrink>
                  Estimated delivery date
                </InputLabel>
                <Input
                  id="delivery-date"
                  type="date"
                  inputProps={{ min: viewModel.deliveryDateMin }}
                  value={viewModel.deliveryDate}
                  onChange={(event): void => {
                    viewModel.deliveryDate = event.target.value;
                  }}
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
                  value={viewModel.shippingCost}
                  onChange={(event): void => {
                    viewModel.shippingCost = event.target.value;
                  }}
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
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={viewModel.disabled}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Box>
    </PopoverButton>
  );
};

export default observer(BookPopover);
