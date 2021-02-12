import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Alert } from '@material-ui/lab';
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
    <Box py={{ xs: 0, sm: 6 }}>
      {viewModel.error && (
        <Box pb={4}>
          <Grid container justify="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Alert severity="error">{viewModel.error}</Alert>
            </Grid>
          </Grid>
        </Box>
      )}
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper variant="outlined" square>
            <Box py={3} px={{ xs: 2, md: 10 }}>
              {viewModel.success ? (
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <Box fontSize="7rem" width="7rem" height="7rem">
                      <CheckCircleIcon fontSize="inherit" color="primary" />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography align="center">
                      Request sent, if you have an account with us {`you'll`}{' '}
                      receive an email with a link shortly.
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Box pb={1} fontWeight={600} fontSize={18}>
                        Password Reset
                      </Box>
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
                    <Grid item>
                      <Button
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={viewModel.disabled}
                      >
                        {viewModel.loading ? (
                          <CircularProgress size="1.5rem" />
                        ) : (
                          'Forgot Password'
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default observer(ForgotView);
