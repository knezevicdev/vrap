import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { observer } from 'mobx-react';
import Link from 'next/link';
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    viewModel.authenticate();
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
                        Sign In
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={viewModel.email}
                        onChange={(e): void =>
                          viewModel.setEmail(e.target.value)
                        }
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
                        'Sign In'
                      )}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Typography>
                      <Link href="/signup">
                        Need an account? Create one here.
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      <Link href="/forgot">Forgot your password?</Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default observer(SignIn);
