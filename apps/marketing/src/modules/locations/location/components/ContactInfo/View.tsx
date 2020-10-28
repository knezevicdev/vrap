import { styled } from '@material-ui/core';
import { Typography, Button } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';
import { useRouter } from 'next/dist/client/router';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(5, 3),
}));

const ContainerContent = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  lineHeight: '32px',
  paddingBottom: theme.spacing(5),
  textAlign: 'center',
}));

const ButtonWrapper = styled('div')(() => ({
  textAlign: 'center',
}));

const SuycButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    width: '100%',
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

const ContactInfo: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Heading variant="h2">{viewModel.title}</Heading>

      <ButtonWrapper>
        <SuycButton
          variant="contained"
          color="primary"
          href={viewModel.suycLink}
        >
          {viewModel.buttonLabel}
        </SuycButton>
      </ButtonWrapper>
    </Container>
  );
};

export default ContactInfo;
