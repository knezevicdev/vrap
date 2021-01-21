import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React, { useState } from 'react';

import PopoverButton from '../PopoverButton';

export interface CancelViewProps {
  reasons: string[];
  handleCancel: (reasonCode: string) => void;
}

const CancelPopover = ({
  reasons,
  handleCancel,
}: CancelViewProps): JSX.Element => {
  const [value, setValue] = useState('');

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ): void => {
    const value = event.target.value as string;
    setValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleCancel(value);
  };

  return (
    <PopoverButton text="Cancel">
      <Box p={2}>
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" fullWidth>
            <label htmlFor="cancel-reason-label">
              Choose reason for cancelling
            </label>
            <Select
              value={value}
              onChange={handleChange}
              labelId="cancel-reason-label"
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Change Reason</em>
              </MenuItem>
              {reasons.map((i, index) => (
                <MenuItem key={index} value={i}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default CancelPopover;
