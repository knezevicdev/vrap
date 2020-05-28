import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import ViewModel from './ViewModel';

import CarCard from 'src/components/CarCard';
import VehicleNotFound from 'src/components/VehicleNotFound';

const ErrorAndNoResultsContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(4, 0),
  '& .MuiGrid-spacing-xs-6': {
    width: '100%',
    margin: 0,
  },
}));

interface Props {
  viewModel: ViewModel;
}

const CarsView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    viewModel.startReaction();
    return (): void => viewModel.stopReaction();
  }, [viewModel]);

  return (
    <>
      {viewModel.hasError() && (
        <ErrorAndNoResultsContainer>
          <VehicleNotFound
            errorTop={viewModel.errorTop()}
            errorBottom={viewModel.errorBottom()}
          />
        </ErrorAndNoResultsContainer>
      )}
      {viewModel.hasCars() && (
        <Grid container spacing={isMobile ? 0 : 2}>
          {viewModel.cars().map((car, index) => (
            <CarCard key={car ? car.vin : index} car={car} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default observer(CarsView);
