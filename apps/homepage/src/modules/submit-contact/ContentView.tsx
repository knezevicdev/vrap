import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React from 'react';

import CarCard from './components/CarCard';
import Form from './components/Form';
import Success from './components/Success';
import ViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const ContentView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      <Box mb={1}>
        <Typography fontWeight="fontWeightMedium" variant="h2">
          {viewModel.title}
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography fontWeight="fontWeightLight" variant="h2">
          {viewModel.directions}
        </Typography>
      </Box>
      <Grid container alignItems="flex-start" spacing={4}>
        <Grid item xs={12} md={6}>
          {viewModel.showSuccess() ? <Success /> : <Form />}
        </Grid>
        {mdAndUp && (
          <Grid item xs={12} md={6}>
            <CarCard />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default observer(ContentView);
