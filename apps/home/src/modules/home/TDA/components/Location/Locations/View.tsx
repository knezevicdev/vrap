import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import LocationDetails from './LocationDetails';
import ViewModel from './ViewModel';

const ViewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto'),
  width: '100%',
  marginBottom: '64px',
}));

const ViewContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: 'black',
  lineHeight: '56px',
  fontSize: '48px',
  fontWeight: 600,
  fontFamily: 'RingsideCompressed',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '42px',
    lineHeight: '48px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '36px',
    lineHeight: '40px',
    marginBottom: theme.spacing(2),
  },
}));

const LocationsGrid = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
}));

const GridItem = styled('div')(({ theme }) => ({
  flex: '0 33.33%',
  padding: '12px',
  [theme.breakpoints.down('md')]: {
    flex: '0 50%',
  },
  [theme.breakpoints.down('sm')]: {
    flex: '0 100%',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <ViewContent>
        <Title>{viewModel.title}</Title>

        <LocationsGrid>
          {viewModel.locations.map((location, i) => {
            return (
              <GridItem key={i}>
                <LocationDetails location={location} />
              </GridItem>
            );
          })}
        </LocationsGrid>
      </ViewContent>
    </ViewContainer>
  );
};

export default View;
