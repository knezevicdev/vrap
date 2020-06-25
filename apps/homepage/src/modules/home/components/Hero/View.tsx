import { makeStyles, styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container as VroomContainer, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import BuySellTrade from './BuySellTrade';
import Search from './Search';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

//#region Styling
const useBackgroundStyles = makeStyles((theme) => ({
  background: {
    overflow: 'hidden',
    background: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
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
  },
}));

const Background: React.FC = ({ children }) => {
  const classes = useBackgroundStyles();
  return <div className={classes.background}>{children}</div>;
};

const useContainerStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    gridTemplateAreas: `
      "t t t t . ."
      "s s s i i i"
      "sv sv sv i i i" 
    `,
    [theme.breakpoints.only('sm')]: {
      textAlign: 'center',
      gap: `${theme.spacing(1)}px`,
      gridTemplateAreas: `
      "i"
      "t"
      "s"
      "sv"
      `,
      gridTemplateColumns: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      gap: `${theme.spacing(1)}px`,
      gridTemplateAreas: `
      "t"
      "s"
      "i"
      "sv"
    `,
      gridTemplateColumns: 'none',
    },
  },
}));

const Container: React.FC<{ maxWidth?: 'sm' | 'lg' }> = ({
  children,
  maxWidth,
}) => {
  const classes = useContainerStyles();

  return (
    <VroomContainer className={classes.grid} maxWidth={maxWidth}>
      {children}
    </VroomContainer>
  );
};

const useCarImageStyles = makeStyles((theme) => ({
  image: {
    gridArea: 'i',
    height: '176px',
    width: '100%',
    objectFit: 'contain',
    alignSelf: 'end',
    [theme.breakpoints.only('xs')]: {
      width: '150%',
    },
  },
}));

interface CarImageProps {
  alt: string;
  src: string;
}

const CarImage: React.FC<CarImageProps> = ({ alt, src }) => {
  const classes = useCarImageStyles();
  return <img className={classes.image} alt={alt} src={src} loading="lazy" />;
};

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
//#endregion

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Background>
      <Container maxWidth={smDown ? 'sm' : 'lg'}>
        <Title variant="h1">{viewModel.title}</Title>
        <SubTitle>
          {viewModel.subtitle}{' '}
          <SubTitleLink href={viewModel.subtitleLink.href}>
            {viewModel.subtitleLink.label}
          </SubTitleLink>
        </SubTitle>
        <CarImage alt={viewModel.car.alt} src={viewModel.car.src} />
        {viewModel.sellTradeExperimentVariant ? <Search /> : <BuySellTrade />}
      </Container>
    </Background>
  );
};

export default observer(HeroView);
