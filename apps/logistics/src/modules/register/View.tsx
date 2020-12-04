import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const UsersView: React.FC<Props> = ({ viewModel }) => {
  return (
    <div>
      <Box p={4} width="40%" mx="auto">
        <Paper square>
          <form>
            <Grid container direction="column" spacing={2}>
              <Grid item container justify="center">
                <TextField
                  required
                  label="Email"
                  type="email"
                  autoComplete="email"
                  defaultValue={viewModel.getEmail()}
                />
              </Grid>
              <Grid item container justify="center">
                <TextField
                  required
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item container justify="center">
                <TextField
                  required
                  label="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item container justify="center">
                <Button variant="contained" color="primary">
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
        </Paper>
      </Box>
    </div>
  );
};

export default UsersView;
