import {
  Box,
  Button,
  Grid,
  Icon,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}
const CreateAccountView: React.FC<Props> = ({ viewModel }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    viewModel.createAccount();
  };

  return (
    <>
      <Paper square>
        <Box p={2}>
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12}>
                <label htmlFor="create-account-email">
                  <Typography>
                    To invite a user, enter their email in the box below and
                    click send
                  </Typography>
                </label>
                <TextField
                  id="create-account-email"
                  value={viewModel.email}
                  onChange={(e): void => {
                    viewModel.email = e.target.value;
                  }}
                  placeholder="Email"
                  variant="outlined"
                  required
                  fullWidth
                  autoComplete="email"
                  type="email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          type="submit"
                          color="primary"
                          endIcon={<Icon>send</Icon>}
                          disabled={viewModel.disabled}
                        >
                          Send
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={viewModel.snackbar}
        autoHideDuration={6000}
        onClose={viewModel.resetSnackbar}
      >
        <Alert severity="success" onClose={viewModel.resetSnackbar}>
          Approval email successfully sent to new user
        </Alert>
      </Snackbar>
    </>
  );
};

export default observer(CreateAccountView);
