import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import ViewModel from './ViewModel';

import { Status as UserStatus } from 'src/networking/models/User';

interface Props {
  viewModel: ViewModel;
}
const FiltersView: React.FC<Props> = ({ viewModel }) => {
  const [carrier, setCarrier] = useState(viewModel.carrierFilter);
  const [status, setStatus] = useState(viewModel.statusFilter);

  const handleCarrierChange = (value: string): void => {
    setCarrier(value);
    viewModel.setCarrierFilter(value);
  };

  const handleChange = (value: UserStatus): void => {
    setStatus(value);
    viewModel.setStatusFilter(value);
  };

  return (
    <Paper square>
      <Box p={2}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="body1">Filter Menu</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Carrier</FormLabel>
              <RadioGroup
                name="carrier-filter"
                value={carrier}
                onChange={(event): void =>
                  handleCarrierChange(event.target.value)
                }
              >
                <FormControlLabel
                  value=""
                  control={<Radio color="primary" />}
                  label="All"
                />
                {viewModel.carrierOptions.length > 0 &&
                  viewModel.carrierOptions.map((i) => (
                    <FormControlLabel
                      key={i.key}
                      value={i.key}
                      control={<Radio />}
                      label={i.label}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup
                name="status-filter"
                value={status}
                onChange={(event): void =>
                  handleChange(event.target.value as UserStatus)
                }
              >
                {viewModel.statusOptions.length > 0 &&
                  viewModel.statusOptions.map((i) => (
                    <FormControlLabel
                      key={i.key}
                      value={i.key}
                      control={<Radio color="primary" />}
                      label={i.label}
                    />
                  ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default observer(FiltersView);
