import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React from 'react';

const ContentLoadingView: React.FC = () => {
  return (
    <Box mt={4}>
      <Grid container justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentLoadingView;
