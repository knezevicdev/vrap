import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const SignupView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Box p={4} width="40%" mx="auto">
      <Paper square>
        <Box p={4} width="60%" mx="auto">
          <form onSubmit={viewModel.handleSubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item container justify="center">
                <TextField
                  required
                  label="First Name"
                  type="text"
                  autoComplete="given-name"
                  value={viewModel.firstName}
                  onChange={viewModel.changeFirst}
                  fullWidth={true}
                />
              </Grid>
              <Grid item container justify="center">
                <TextField
                  required
                  label="Last Name"
                  type="text"
                  autoComplete="family-name"
                  value={viewModel.lastName}
                  onChange={viewModel.changeLast}
                  fullWidth={true}
                />
              </Grid>
              <Grid item container justify="center">
                <TextField
                  required
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={viewModel.email}
                  onChange={viewModel.changeEmail}
                  fullWidth={true}
                />
              </Grid>
              <Grid item container justify="center">
                <TextField
                  required
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  helperText="Use 8 or more characters with a mix of uppercase, lowercase, and numbers"
                  value={viewModel.password}
                  onChange={viewModel.changePassword}
                  fullWidth={true}
                />
              </Grid>
              <Grid item container justify="center">
                <TextField
                  required
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  value={viewModel.passwordConfirm}
                  onChange={viewModel.changePasswordConfirm}
                  fullWidth={true}
                />
              </Grid>
              <Grid item container justify="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={viewModel.disabled}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item container justify="center">
                <Typography>
                  <Link href="/login">Already signed up? Log in here!</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default observer(SignupView);
