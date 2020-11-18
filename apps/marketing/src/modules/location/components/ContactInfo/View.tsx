import { styled } from '@material-ui/core';
import { Button, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(5, 3),
}));

const Heading = styled(Typography)(({ theme }) => ({
  lineHeight: '32px',
  paddingBottom: theme.spacing(5),
  textAlign: 'center',
}));

const ButtonWrapper = styled('div')(() => ({
  textAlign: 'center',
}));

const InfoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  marginBottom: '50px',
  [theme.breakpoints.only('xs')]: {
    flexDirection: 'column',
  },
}));

const ContainerItem = styled('div')(({ theme }) => ({
  flex: '0 0 33.33%',
  textAlign: 'center',
  [theme.breakpoints.only('xs')]: {
    flex: '0 0 1',
    textAlign: 'initial',
    marginBottom: '10px',
  },
}));

const ItemHeader = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  fontSize: '24px',
  letterSpacing: '0.3px',
  marginBottom: '5px',
  [theme.breakpoints.down('sm')]: {
    lineHeight: 1.39,
    fontSize: '18px',
    letterSpacing: '0.23px',
  },
}));

const TextLine = styled('div')(() => ({
  fontFamily: 'Calibre',
  fontSize: '18px',
  marginBottom: '0px',
  lineHeight: 1.39,
}));

const StyledLink = styled('a')(() => ({
  color: 'rgb(231, 19, 26)',
}));

const SuycButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    width: '100%',
  },
}));

const ContactInfo: React.FC<Props> = ({ viewModel }) => (
  <Container>
    <Heading variant="h2">{viewModel.title}</Heading>

    <InfoContainer>
      <ContainerItem>
        <ItemHeader variant="h2">Address</ItemHeader>
        <TextLine>{viewModel.locationInfo.address.street}</TextLine>
        <TextLine>{`${viewModel.locationInfo.address.city}, ${viewModel.locationInfo.address.state} ${viewModel.locationInfo.address.zipCode}`}</TextLine>
        <TextLine>
          <StyledLink
            href={viewModel.locationInfo.googleMapsUrl}
            target="_blank"
          >
            Map This Location
          </StyledLink>
        </TextLine>
      </ContainerItem>

      <ContainerItem>
        <ItemHeader variant="h2">Phone</ItemHeader>
        <TextLine>{viewModel.locationInfo.phone.office}</TextLine>
        <TextLine>{viewModel.locationInfo.phone.fax}</TextLine>
      </ContainerItem>
      <ContainerItem>
        <ItemHeader variant="h2">Hours of Operation</ItemHeader>
        <TextLine>{viewModel.locationInfo.businessHours.days}</TextLine>
        <TextLine>{viewModel.locationInfo.businessHours.hours}</TextLine>
      </ContainerItem>
    </InfoContainer>

    <ButtonWrapper>
      <SuycButton
        variant="contained"
        color="primary"
        onClick={viewModel.handleClick}
      >
        {viewModel.buttonLabel}
      </SuycButton>
    </ButtonWrapper>
  </Container>
);

export default ContactInfo;
