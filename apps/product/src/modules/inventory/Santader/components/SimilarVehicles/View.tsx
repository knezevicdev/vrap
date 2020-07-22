import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import CarCard from './components/CarCard';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

const SimilarVehiclesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto', 4, 'auto'),
  width: '100%',
  padding: theme.spacing(0, 3),
}));

const SimilarVehiclesContainerContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1232px',
  margin: '0 auto',
  padding: theme.spacing(5, 3),
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(0),
  },
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const Cars = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  [theme.breakpoints.only('sm')]: {
    '& #car:nth-child(n+4)': {
      display: 'none',
    },
    '& #car:nth-child(n+3)': {
      marginRight: 0,
    },
  },
  [theme.breakpoints.only('xs')]: {
    '& #car:nth-child(n+3)': {
      display: 'none',
    },
    flexDirection: 'column',
    margin: theme.spacing(0),
  },
  '& #car:last-child': {
    marginRight: 0,
  },
}));

const ViewAll = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  cursor: 'pointer',
  fontSize: '16px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
}));

const DesktopViewAll = styled(ExternalLink)(({ theme }) => ({
  display: 'flex',
  color: '#257FA4',
  [theme.breakpoints.only('xs')]: {
    display: 'none',
  },
}));

const MobileViewAll = styled(ExternalLink)(({ theme }) => ({
  display: 'none',
  color: '#257FA4',
  [theme.breakpoints.only('xs')]: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
}));

const ViewAllError = styled(Button)(() => ({
  maxWidth: '256px',
  minWidth: '256px',
  alignSelf: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '24px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '22px',
  },
  fontFamily: 'SantanderHeadline, Arial, sans-serif',
}));

interface Props {
  viewModel: ViewModel;
}

const SimilarVehiclesView: React.FC<Props> = ({ viewModel }) => {
  return (
    <SimilarVehiclesContainer>
      <SimilarVehiclesContainerContent>
        {viewModel.error() ? (
          <ViewAllError
            variant="contained"
            color="primary"
            onClick={viewModel.handleClick}
          >
            <Typography variant="body1" fontWeight={600}>
              {viewModel.viewAllCars}
            </Typography>
          </ViewAllError>
        ) : (
          <>
            <Content>
              <Title>{viewModel.title}</Title>
              <DesktopViewAll href="/cars">
                <ViewAll>{viewModel.viewAll}</ViewAll>
              </DesktopViewAll>
            </Content>
            <Cars>
              {viewModel.getCars().map((car) => (
                <CarCard car={car} key={car.vin} />
              ))}
            </Cars>
            <MobileViewAll href="/cars">
              <ViewAll>{viewModel.viewAll}</ViewAll>
            </MobileViewAll>
          </>
        )}
      </SimilarVehiclesContainerContent>
    </SimilarVehiclesContainer>
  );
};

export default observer(SimilarVehiclesView);
