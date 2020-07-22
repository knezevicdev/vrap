import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import { ReactComponent as VroomLogoSvg } from './svg/logo.svg';
import { ReactComponent as PhoneSvg } from './svg/phone.svg';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ViewContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
}));

const VroomLogo = styled(VroomLogoSvg)(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

const Phone = styled(PhoneSvg)(({ theme }) => ({
  marginRight: theme.spacing(1),
  minWidth: '32px',
  maxWidth: '32px',
  [theme.breakpoints.only('xs')]: { marginRight: theme.spacing(2) },
}));

const ViewContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(8),
  maxWidth: '1280px',
  margin: '0 auto',
  [theme.breakpoints.only('sm')]: {
    padding: theme.spacing(8, 4),
  },
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(4, 2),
  },
}));

const Header = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.only('xs')]: { marginBottom: theme.spacing(2) },
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '32px',
  [theme.breakpoints.only('xs')]: { whiteSpace: 'pre-wrap' },
}));

const ComponentsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  [theme.breakpoints.only('xs')]: {
    flexDirection: 'column',
  },
}));

const Component = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  background: '#FFFFFF',
  padding: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    width: '100%',
    padding: theme.spacing(4, 2),
  },
}));

const Vehicle = styled(Component)(({ theme }) => ({
  marginRight: theme.spacing(3),
  [theme.breakpoints.only('xs')]: {
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
}));

const Account = styled(Component)(() => ({}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  lineHeight: '32px',
  whiteSpace: 'pre-wrap',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.only('xs')]: {
    marginBottom: theme.spacing(1),
  },
}));

const PhoneNumber = styled('a')(() => ({
  color: '#444444',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Link = styled('a')(() => ({
  color: '#257FA4',
}));

const Description = styled(Typography)(() => ({
  fontSize: '16px',
  whiteSpace: 'pre-wrap',
  lineHeight: '24px',
}));

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <ViewContent>
        <Header>
          <Phone />
          <HeaderText>{viewModel.header}</HeaderText>
        </Header>
        <ComponentsContainer>
          <Vehicle>
            <Title>{viewModel.vehicleTitle}</Title>
            <Description>
              {viewModel.callVroom}
              <VroomLogo />
              <PhoneNumber href={viewModel.vroomNumber.href}>
                {viewModel.vroomNumber.label}.
              </PhoneNumber>
            </Description>
          </Vehicle>
          <Account>
            <Title>{viewModel.accountTitle}</Title>
            <Description>
              {viewModel.callSantander}
              <PhoneNumber href={viewModel.santanderNumber.href}>
                {viewModel.santanderNumber.label}
              </PhoneNumber>
              {viewModel.afterSantanderNumber}
              <Link
                href={viewModel.supportOptions.href}
                target={viewModel.supportOptions.target}
              >
                {viewModel.supportOptions.label}
              </Link>
            </Description>
          </Account>
        </ComponentsContainer>
      </ViewContent>
    </ViewContainer>
  );
};

export default View;
