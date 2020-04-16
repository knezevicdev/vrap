import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import CarCard from 'src/components/CarCard';
import Button from 'src/ui/Button';
import Container from 'src/ui/Container';
import InternalLink from 'src/ui/InternalLink';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const SimilarVehiclesView: React.FC<Props> = props => {
  const { viewModel } = props;

  if (viewModel.error()) {
    return (
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={viewModel.handleClick}
          >
            <Typography variant="body1" fontWeight="fontWeightMedium">
              {viewModel.viewAllCars}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    );
  }

  const limit = 4;
  const cards = [];
  for (let i = 0; i < limit; i++) {
    const car = viewModel.get(i);
    cards.push(<CarCard key={car.vin} car={car} />);
  }

  return (
    <Container content>
      <Box mb={{ xs: 2, md: 4 }}>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography
              variant="h2"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              {viewModel.title}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="right">
              <InternalLink href="/cars">
                <Typography
                  variant="body1"
                  fontWeight="fontWeightMedium"
                  display="inline"
                  color="secondary.main"
                >
                  {viewModel.viewAll}
                </Typography>
              </InternalLink>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} justify="space-evenly">
        {cards}
      </Grid>
    </Container>
  );
};

export default observer(SimilarVehiclesView);
