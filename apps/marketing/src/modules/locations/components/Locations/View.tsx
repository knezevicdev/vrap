import { Link, styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',

  padding: theme.spacing(10, 6),
  [theme.breakpoints.down('sm')]: {
    maxWidth: '640px',
    padding: theme.spacing(4, 3),
  },
}));

const LocationsSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Heading = styled(Typography)(() => ({
  lineHeight: '32px',
  marginBottom: '20px',
  textAlign: 'center',
}));

const SubHeading = styled(Typography)(() => ({
  margin: '20px 25% 50px 25%',
  lineHeight: '26px',
  textAlign: 'center',
}));

const LocationInfo = styled('div')(({ theme }) => ({
  flexBasis: '25%',
  marginBottom: '30px',
  [theme.breakpoints.down('md')]: {
    flexBasis: '33.33%',
  },
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%',
  },
}));

const Section = styled('div')(() => ({
  marginBottom: '10px',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.primary.main,
  lineHeight: '30px',
  fontWeight: 600,
  letterSpacing: '0.23px',
}));

const Info = styled(Typography)(() => ({
  fontSize: '18px',
  lineHeight: '25px',
  letterSpacing: '0.23px',
}));

const Locations: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Heading variant="h2">{viewModel.title}</Heading>
      <SubHeading>{viewModel.subTitle} </SubHeading>
      <LocationsSection>
        {viewModel.locations.map((location) => (
          <LocationInfo key={location.name}>
            <Section>
              <Link href={location.href}>
                <Title>{location.name}</Title>
              </Link>
              <Info>{location.address.street}</Info>
              <Info>
                {location.address.city}, {location.address.state}{' '}
                {location.address.zipCode}
              </Info>
            </Section>
            <Section>
              <Link href={location.googleMapsUrl} target="_blank">
                <Info>{viewModel.mapText}</Info>
              </Link>
            </Section>
            <Section>
              <Info>{location.phone.office}</Info>
              <Info>{location.phone.fax}</Info>
              <Info>{location.businessHours}</Info>
            </Section>
          </LocationInfo>
        ))}
      </LocationsSection>
    </Container>
  );
};

export default Locations;
