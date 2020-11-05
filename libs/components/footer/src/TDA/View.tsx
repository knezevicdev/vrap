import { Link as MULink, useTheme, useMediaQuery } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(() => ({
  zIndex: 1,
}));

const MobileContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 4, 1),
  textAlign: 'center',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
}));

const DesktopContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 4),
  display: 'flex',
  textAlign: 'center',
  maxWidth: '700px',
  justifyContent: 'space-between',
  margin: 'auto',
}));

const CustomLink = styled(MULink)(() => ({
  textDecoration: 'underline',
  textDecorationColor: '#767676',
  color: '#767676',
}));

const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '14px',
  [theme.breakpoints.only('xs')]: {
    marginBottom: theme.spacing(2),
  },
}));

const View: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const { links, disclaimer } = viewModel;

  const Links = links.map((link) => {
    return (
      <CustomLink
        key={link.label}
        href={link.href}
        target={link.target}
        onClick={link.handleAnalytics}
      >
        <Text>{link.label}</Text>
      </CustomLink>
    );
  });

  return (
    <Container>
      {isMobile ? (
        <>
          <MobileContainer>{Links}</MobileContainer>
          <Text textAlign="center">{disclaimer}</Text>
        </>
      ) : (
        <DesktopContainer>
          <Text textAlign="center">{disclaimer}</Text>
          {Links}
        </DesktopContainer>
      )}
    </Container>
  );
};

export default View;
