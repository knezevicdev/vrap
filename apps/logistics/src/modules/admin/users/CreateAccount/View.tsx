import { Box, Button, Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}
const FiltersView: React.FC<Props> = ({ viewModel }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    viewModel.createAccount(email);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={10}>
            <TextField
              value={email}
              onChange={(e): void => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              required
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default observer(FiltersView);
