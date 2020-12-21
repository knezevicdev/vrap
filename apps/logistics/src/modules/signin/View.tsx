import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}
const SignIn: React.FC<Props> = ({ viewModel }) => {
  const router = useRouter();

  useEffect(() => {
    if (viewModel.success) {
      router.push(viewModel.previousUrl);
    }
  }, [router, viewModel.previousUrl, viewModel.success]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    viewModel.authenticate();
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={4}>
        <Paper variant="outlined" square>
          <Box p={2}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Sign In
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={viewModel.email}
                    onChange={(e): void => viewModel.setEmail(e.target.value)}
                    label="Email"
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={viewModel.password}
                    onChange={(e): void =>
                      viewModel.setPassword(e.target.value)
                    }
                    label="Password"
                    variant="outlined"
                    required
                    fullWidth
                    type="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button size="small" type="submit">
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

export default observer(SignIn);
