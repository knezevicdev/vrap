import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

const ViewContainer = styled('div')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
  background: '#fff',
}));

const Title = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 4, 2),
  [theme.breakpoints.only('xs')]: {
    fontSize: '32px',
  },
}));

const VehiclesContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

const VehicleContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 4),
  [theme.breakpoints.down('md')]: {
    flexBasis: '20%',
  },
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(2),
  },
}));

const VehicleLink = styled(ExternalLink)(() => ({
  color: '#000',
  '&:hover': {
    color: 'red',
  },
}));

const VehicleImage = styled('img')(({ theme }) => ({
  height: '50px',
  width: '80px',
  paddingBottom: theme.spacing(1),
}));

const VehicleType = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: 600,
  textDecoration: 'underline',
}));

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <Title variant="h2">{viewModel.title}</Title>
      <VehiclesContainer>
        {viewModel.vehicles.map((vehicle) => (
          <VehicleContainer key={vehicle.type}>
            <VehicleLink href={vehicle.link}>
              <VehicleImage
                src={vehicle.image}
                alt={vehicle.type}
                onMouseOver={(e) =>
                  (e.currentTarget.src = vehicle.imageSelected)
                }
                onMouseOut={(e) => (e.currentTarget.src = vehicle.image)}
              />
              <VehicleType>{vehicle.type}</VehicleType>
            </VehicleLink>
          </VehicleContainer>
        ))}
      </VehiclesContainer>
    </ViewContainer>
  );
};

export default View;
