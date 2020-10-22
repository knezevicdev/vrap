import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';
import ExternalLink from 'src/ui/ExternalLink';

const ViewContainer = styled('div')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(8, 2),
  textAlign: 'center',
  background: '#FFF',
}));

const Title = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    fontSize: '32px',
  },
}));

const VehiclesContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
}));

const VehicleContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(2),
  },
}));

const VehicleLink = styled(ExternalLink)(() => ({
  color: 'black',
}));

const VehicleImage = styled('img')(({ theme }) => ({
  paddingBottom: theme.spacing(1),
}));

const VehicleType = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: 600,
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
              <VehicleImage src={vehicle.image} alt={vehicle.type} />
              <VehicleType>{vehicle.type}</VehicleType>
            </VehicleLink>
          </VehicleContainer>
        ))}
      </VehiclesContainer>
    </ViewContainer>
  );
};

export default View;
