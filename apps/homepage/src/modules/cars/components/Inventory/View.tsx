import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Pagination from '@material-ui/lab/Pagination';
import { observer } from 'mobx-react';
import React from 'react';

import TopSection from '../TopSection';
import { InventoryViewsProps } from './types';

import CarCard from 'src/components/CarCard';
import VehicleNotFound from 'src/components/VehicleNotFound';

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    padding: '0',
  },
  padding: theme.spacing(4, 2),
  borderBottom: 'solid 1px #bebebe',
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.only('xs')]: {
    margin: theme.spacing(6, 2),
  },
  marginTop: theme.spacing(4),
  '& .MuiPaginationItem-page.Mui-selected': {
    backgroundColor: '#c8102e',
    color: 'white',
  },
}));

const ErrorAndNoResultsContainer = styled('div')(({ theme }) => ({
  margin: theme.spacing(4, 0),
  '& .MuiGrid-spacing-xs-6': {
    width: '100%',
    margin: 0,
  },
}));

const InventoryView: React.FC<InventoryViewsProps> = ({
  areFiltersClosed,
  toggleFiltersState,
  viewModel,
}) => {
  const { cars, areTheyPopularCars } = viewModel.getCars();
  const pageInfo = viewModel.getPageAndCount();
  const { top: errorTop, bottom: errorBottom } = viewModel.getErrorMessages();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <StyledGrid container direction="column">
      <TopSection
        toggleFiltersState={toggleFiltersState}
        areFiltersClosed={areFiltersClosed}
      />
      {viewModel.hasError() ? (
        <ErrorAndNoResultsContainer>
          <VehicleNotFound errorTop={errorTop} errorBottom={errorBottom} />
        </ErrorAndNoResultsContainer>
      ) : (
        <>
          {areTheyPopularCars && (
            <ErrorAndNoResultsContainer>
              <VehicleNotFound errorTop={errorTop} errorBottom={errorBottom} />
            </ErrorAndNoResultsContainer>
          )}
          <Grid container spacing={isMobile ? 0 : 2}>
            {cars.map((car, index) => (
              <CarCard key={car ? car.vin : index} car={car} />
            ))}
          </Grid>
        </>
      )}
      {/*TODO: Second pass - extract into own view*/}
      {pageInfo && !viewModel.hidePagination() && (
        <StyledPagination
          size={isMobile ? 'small' : 'medium'}
          count={pageInfo.count}
          page={pageInfo.page}
          onChange={viewModel.onPageChange}
          showFirstButton
          showLastButton
        />
      )}
    </StyledGrid>
  );
};

export default observer(InventoryView);
