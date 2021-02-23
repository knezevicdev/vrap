import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
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

const SignupView: React.FC<Props> = ({ viewModel }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    viewModel.handleSubmit();
  };

  return (
    <Box py={{ xs: 0, sm: 6 }}>
      {viewModel.error && (
        <Box pb={4}>
          <Grid container justify="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Alert
                severity="error"
                onClose={(): void => viewModel.clearError()}
              >
                {viewModel.error}
              </Alert>
            </Grid>
          </Grid>
        </Box>
      )}
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper variant="outlined" square>
            <Box py={3} px={{ xs: 2, md: 10 }}>
              {viewModel.success ? (
                <Box py={17}>
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
                        Thank you for creating an account
                        <br />
                        {`We'll`} email you after {`we've`} verified your
                        account
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Box pb={3}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <Box pb={1} fontWeight={600} fontSize={18}>
                          Create an account
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          label="First Name"
                          type="text"
                          autoComplete="given-name"
                          variant="outlined"
                          value={viewModel.value('firstName')}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ): void => viewModel.handleChange('firstName', e)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          label="Last Name"
                          type="text"
                          autoComplete="family-name"
                          variant="outlined"
                          value={viewModel.value('lastName')}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ): void => viewModel.handleChange('lastName', e)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          label="Email"
                          type="email"
                          autoComplete="email"
                          variant="outlined"
                          value={viewModel.value('email')}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ): void => viewModel.handleChange('email', e)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          label="Password"
                          type="password"
                          autoComplete="new-password"
                          helperText="Use 8 or more characters with a mix of uppercase, lowercase, & numbers"
                          variant="outlined"
                          value={viewModel.value('password')}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ): void => viewModel.handleChange('password', e)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          label="Confirm Password"
                          type="password"
                          autoComplete="new-password"
                          variant="outlined"
                          value={viewModel.value('passwordConfirm')}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ): void =>
                            viewModel.handleChange('passwordConfirm', e)
                          }
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={2}
                  >
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
                          'Sign Up'
                        )}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Typography>
                        <Link href="/signin">
                          Already signed up? Log in here!
                        </Link>
                      </Typography>
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

export default observer(SignupView);
