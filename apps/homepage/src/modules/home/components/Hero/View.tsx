import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Container, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Autocomplete from './Autocomplete';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

//#region Styling
//#region Desktop
const DesktopBackground = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  background: `linear-gradient(100deg, ${theme.palette.primary.main} 71.9%, ${theme.palette.background.paper} 72%)`,
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.only('xs')]: {
    paddingTop: 0,
    paddingBottom: 0,
    background: theme.palette.primary.main,
  },
  [theme.breakpoints.only('sm')]: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  [theme.breakpoints.only('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
}));

const DesktopContainer = styled(Container)(({ theme }) => ({
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  gap: `${theme.spacing(2)}px`,
  gridTemplateAreas: `
      "t t t t . ."
      "s s s i i i"
      "a a a i i i"
      "l l l i i i"
    `,
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  [theme.breakpoints.only('xs')]: {
    gap: `${theme.spacing(1)}px`,
    gridTemplateAreas: `
    "t"
    "s"
    "i"
    "b"
  `,
    gridTemplateColumns: 'none',
  },
  [theme.breakpoints.only('sm')]: {
    gap: `${theme.spacing(1)}px`,
    gridTemplateAreas: `
      "t t t t t ."
      "s s s i i i"
      "b b b i i i"
    `,
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  },
}));

const DesktopCarImage = styled('img')(({ theme }) => ({
  gridArea: 'i',
  height: 'auto',
  width: '100%',
  objectFit: 'contain',
  [theme.breakpoints.only('xs')]: {
    width: '150%',
  },
}));
//#endregion

//#region Mobile
const MobileBackground = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  background: theme.palette.primary.main,
  [theme.breakpoints.up('sm')]: {
    background: `linear-gradient(100deg, ${theme.palette.primary.main} 71.9%, ${theme.palette.background.paper} 72%)`,
  },
  [theme.breakpoints.only('md')]: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));

const MobileContainer = styled(Container)(({ theme }) => ({
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
  gap: `${theme.spacing(1)}px`,
  gridTemplateAreas: `
    "t"
    "s"
    "i"
    "b"
  `,
  [theme.breakpoints.only('sm')]: {
    gridTemplateAreas: `
      "t t t t t ."
      "s s s i i i"
      "b b b i i i"
    `,
    gridTemplateRows: 'auto',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  },
  [theme.breakpoints.up('md')]: {
    gap: `${theme.spacing(2)}px`,
    gridTemplateAreas: `
      "t t t t . ."
      "s s s i i i"
      "a a a i i i"
      "l l l i i i"
    `,
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  },
}));

const MobileCarImage = styled('img')(({ theme }) => ({
  gridArea: 'i',
  width: '150%',
  height: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    objectFit: 'contain',
  },
}));
//#endregion

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  gridArea: 't',
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  gridArea: 's',
  letterSpacing: '0.25px',
  lineHeight: '1.3',
}));

const SubTitleLink = styled(ExternalLink)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 600,
  textDecoration: 'underline',
}));

const StyledButton = styled(Button)(() => ({
  gridArea: 'b',
  minHeight: '48px',
}));

const StyledAutocomplete = styled(Autocomplete)(() => ({
  gridArea: 'a',
}));

const BrowseLink = styled(ExternalLink)(() => ({
  gridArea: 'l',
}));

const Browse = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
  fontWeight: 600,
  textDecoration: 'underline',
}));
//#endregion

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleMobileButtonClick = (): void => {
    viewModel.handleMobileButtonClick();
  };

  const mobileButton = (
    <StyledButton
      color="secondary"
      onClick={handleMobileButtonClick}
      variant="contained"
    >
      {viewModel.mobileButtonLabel}
    </StyledButton>
  );

  const browse = (
    <BrowseLink href={viewModel.link.href}>
      <Browse>{viewModel.link.label}</Browse>
    </BrowseLink>
  );

  if (viewModel.getDeviceType() === 'desktop') {
    return (
      <DesktopBackground>
        <DesktopContainer>
          <Title variant="h1">{viewModel.title}</Title>
          <SubTitle>
            {viewModel.subtitle}{' '}
            <SubTitleLink href={viewModel.subtitleLink.href}>
              {viewModel.subtitleLink.label}
            </SubTitleLink>
          </SubTitle>
          <DesktopCarImage alt={viewModel.car.alt} src={viewModel.car.src} />
          {smDown ? mobileButton : <StyledAutocomplete />}
          {!smDown && browse}
        </DesktopContainer>
      </DesktopBackground>
    );
  } else {
    return (
      <MobileBackground>
        <MobileContainer>
          <Title variant="h1">{viewModel.title}</Title>
          <SubTitle>
            {viewModel.subtitle}{' '}
            <SubTitleLink href={viewModel.subtitleLink.href}>
              {viewModel.subtitleLink.label}
            </SubTitleLink>
          </SubTitle>
          <MobileCarImage alt={viewModel.car.alt} src={viewModel.car.src} />
          {mdUp ? <StyledAutocomplete /> : mobileButton}
          {mdUp && browse}
        </MobileContainer>
      </MobileBackground>
    );
  }
};

export default observer(HeroView);
