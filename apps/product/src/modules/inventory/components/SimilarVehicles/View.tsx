import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Button, Container, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import CarCard from './components/CarCard';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

interface Props {
  viewModel: ViewModel;
}

const SimilarVehiclesView: React.FC<Props> = (props) => {
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

  const cards = [];
  for (let i = 0; i < viewModel.getNumCards(); i++) {
    const car = viewModel.get(i);
    cards.push(<CarCard key={car.vin} car={car} />);
  }

  return (
    <Container>
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
              <ExternalLink href="/cars">
                <Typography
                  variant="body1"
                  fontWeight="fontWeightMedium"
                  display="inline"
                  color="primary.main"
                >
                  {viewModel.viewAll}
                </Typography>
              </ExternalLink>
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
