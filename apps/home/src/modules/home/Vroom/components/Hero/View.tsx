import { makeStyles, styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container as VroomContainer, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';

import BuySellTrade from './BuySellTrade';
import ViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import experimentSDK from 'src/integrations/experimentSDK';
import { HomeStore, HomeStoreContext } from 'src/modules/home/store';
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

interface CarImageProps {
  alt: string;
  src: string;
  carImageHeight: string;
}

const useCarImageStyles = makeStyles((theme) => ({
  image: {
    gridArea: 'i',
    height: (props: CarImageProps): string => props.carImageHeight,
    width: '100%',
    objectFit: 'contain',
    alignSelf: 'end',
    [theme.breakpoints.only('xs')]: {
      width: '150%',
    },
  },
}));

const CarImage: React.FC<CarImageProps> = (props) => {
  const { alt, src } = props;
  const classes = useCarImageStyles(props);
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

  const homeStore = useContext<HomeStore>(HomeStoreContext);
  const [swapTabs, setSwapTabs] = useState<boolean>(false);
  const [changeTitle, setChangeTitle] = useState<boolean>(false);
  const [changeTabLabel, setChangeTabLabel] = useState<boolean>(false);
  const [analyticsHandler] = useState<AnalyticsHandler>(new AnalyticsHandler());

  useEffect(() => {
    const { experiments } = homeStore;
    const expId = 'cw-swap-tabs';
    const expId2 = 'cw-change-tab-label';

    const variantCalculatedExp = experimentSDK.determineVariantClientSide(
      experiments,
      expId
    );

    const variantCalculatedExp2 = experimentSDK.determineVariantClientSide(
      experiments,
      expId2
    );

    if (variantCalculatedExp) {
      analyticsHandler.registerExperiment(variantCalculatedExp);
      if (variantCalculatedExp.assignedVariant === 1) {
        setSwapTabs(true);
        setChangeTitle(true);
      }
    }

    if (variantCalculatedExp2) {
      analyticsHandler.registerExperiment(variantCalculatedExp2);
      if (variantCalculatedExp2.assignedVariant === 1) setChangeTabLabel(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Background>
      <Container maxWidth={smDown ? 'sm' : 'lg'}>
        <Title variant="h1">
          {changeTitle ? viewModel.titleExperiment : viewModel.title}
        </Title>
        <SubTitle>
          {changeTitle ? viewModel.subtitleExperiment : viewModel.subtitle}{' '}
          <SubTitleLink href={viewModel.subtitleLink.href}>
            {viewModel.subtitleLink.label}
          </SubTitleLink>
        </SubTitle>
        <CarImage
          alt={viewModel.car.alt}
          src={viewModel.car.src}
          carImageHeight={'225px'}
        />
        <BuySellTrade swapTabs={swapTabs} changeTabLabel={changeTabLabel} />
      </Container>
    </Background>
  );
};

export default observer(HeroView);
