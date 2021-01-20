import { Box, Button, Grid, TextField } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import PopoverButton from '../PopoverButton';

export interface DeliverViewProps {
  handleDeliver: (date: string) => void;
}

const DeliverPopover = ({ handleDeliver }: DeliverViewProps): JSX.Element => {
  const [value, setValue] = useState(dayjs().format('YYYY-MM-DD'));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const iso = dayjs(value).toISOString();
    handleDeliver(iso);
  };

  return (
    <PopoverButton text="Delivered" primary={true}>
      <Box p={2}>
        <form onSubmit={handleSubmit}>
          <Box pb={2}>
            <label htmlFor="delivery-date">Actual delivery date</label>
            <TextField
              id="delivery-date"
              type="date"
              variant="outlined"
              fullWidth
              value={value}
              onChange={(event): void => setValue(event.target.value)}
            />
          </Box>
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
              disabled={!value}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Box>
    </PopoverButton>
  );
};

export default DeliverPopover;
