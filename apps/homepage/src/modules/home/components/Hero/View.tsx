import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Container, Typography } from '@vroom-web/ui';
import React from 'react';

import Autocomplete from './Autocomplete';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

const Background = styled('div')(({ theme }) => ({
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

const StyledContainer = styled(Container)(({ theme }) => ({
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

const CarImage = styled('img')(({ theme }) => ({
  gridArea: 'i',
  width: '150%',
  height: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    objectFit: 'contain',
  },
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

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleMobileButtonClick = (): void => {
    viewModel.handleMobileButtonClick();
  };

  const autocompleteOrButtonView = (): JSX.Element => {
    if (mdUp) {
      return <StyledAutocomplete />;
    }
    return (
      <StyledButton
        color="secondary"
        onClick={handleMobileButtonClick}
        variant="contained"
      >
        {viewModel.mobileButtonLabel}
      </StyledButton>
    );
  };

  const browseLinkOrNull = (): React.ReactNode => {
    if (mdUp) {
      return (
        <BrowseLink href={viewModel.link.href}>
          <Browse>{viewModel.link.label}</Browse>
        </BrowseLink>
      );
    }
    return null;
  };

  return (
    <Background>
      <StyledContainer>
        <Title variant="h1">{viewModel.title}</Title>
        <SubTitle>
          {viewModel.subtitle}{' '}
          <SubTitleLink href={viewModel.subtitleLink.href}>
            {viewModel.subtitleLink.label}
          </SubTitleLink>
        </SubTitle>
        <CarImage alt={viewModel.car.alt} src={viewModel.car.src} />
        {autocompleteOrButtonView()}
        {browseLinkOrNull()}
      </StyledContainer>
    </Background>
  );
};

export default HeroView;
