import Grid from '@material-ui/core/Grid';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import CarCard from './components/CarCard';
import Error from './components/Error';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const CarsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

const Message = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(3),
}));

const CarsView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    viewModel.startReaction();
    return (): void => viewModel.stopReaction();
  }, [viewModel]);

  return (
    <CarsContainer>
      {(viewModel.hasNoInventory() || viewModel.hasError()) && (
        <Error
          isError={viewModel.hasError()}
          message={viewModel.getErrorMessage()}
        />
      )}
      {viewModel.hasCars() && (
        <>
          {viewModel.hasNoInventory() && (
            <Message fontWeight="fontWeightMedium" textAlign="center">
              {viewModel.getPopularCarsMessage()}
            </Message>
          )}
          <Grid container spacing={isMobile ? 0 : 2}>
            {viewModel.cars().map((car, index) => (
              <CarCard
                key={index}
                car={car}
                position={index + viewModel.getPage()}
              />
            ))}
          </Grid>
        </>
      )}
    </CarsContainer>
  );
};

export default observer(CarsView);
