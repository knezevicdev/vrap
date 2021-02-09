import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ForgotView: React.FC<Props> = ({ viewModel }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    viewModel.setEmail(e.target.value);
  };
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    viewModel.handleSubmit();
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={4}>
        <Paper variant="outlined" square>
          <Box p={2}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Forgot Password
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={viewModel.email}
                    onChange={handleChange}
                    label="Email"
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    size="small"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default observer(ForgotView);
