import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React from 'react';

const SignIn: React.FC = () => {
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const response = await axios.get('http://localhost:8080/api/signin');
    console.log(response);
  };

  const handleClick = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event?.preventDefault();
    try {
      const response = await axios.get(
        'http://localhost:8080/api/gearbox-shipments'
      );
      console.log(response);
    } catch (err) {
      console.log('fucked');
    }
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
                    label="Email"
                    variant="outlined"
                    fullWidth
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
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
                <Grid item xs={6}>
                  <Button
                    size="small"
                    type="button"
                    onClick={(event): void => {
                      handleClick(event);
                    }}
                  >
                    Booked Shipments
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

export default SignIn;
