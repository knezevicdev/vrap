import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import CarDetails from './components/CarDetails';
import Features from './components/Features';
import Gallery from './components/Gallery/';
import PeaceOfMind from './components/PeaceOfMind';
import SimilarVehicles from './components/SimilarVehicles';
import StartPurchase from './components/StartPurchase';
import VehicleHeader from './components/VehicleHeader';
import ViewModel from './ViewModel';

import HowItWorks from 'src/components/HowItWorks';
import VehicleNotFound from 'src/components/VehicleNotFound';
import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

export interface Props {
  viewModel: ViewModel;
}

//#region Styling
const StickyTop = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const StickyBottom = styled(Box)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  zIndex: theme.zIndex.appBar,
}));
//#endregion

const VehicleDetails: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    viewModel.startReaction();
    return (): void => viewModel.stopReaction();
  }, [viewModel]);

  return (
    <>
      <SimpleHeader />
      {viewModel.error() && (
        <Box mt={4} mb={6}>
          <VehicleNotFound
            errorTop={viewModel.errorTop}
            errorBottom={viewModel.errorBottom}
          />
        </Box>
      )}
      {viewModel.loading() && (
        <Box mt={4}>
          <Grid container justify="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </Box>
      )}
      {viewModel.ready() && (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Gallery />
            </Grid>
          </Grid>
          {xsDown ? (
            <Box mb={6}>
              <Grid item xs={12}>
                <VehicleHeader />
              </Grid>
            </Box>
          ) : (
            <StickyTop mb={{ xs: 6, md: 4 }}>
              <Grid item xs={12}>
                <VehicleHeader />
              </Grid>
            </StickyTop>
          )}
          <Box mb={4}>
            <Grid container>
              {!xsDown && (
                <Grid item xs={12}>
                  <Box pb={6}>
                    <Breadcrumbs />
                  </Box>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box pb={{ xs: 2, sm: 6 }}>
                  <CarDetails />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Features />
              </Grid>
            </Grid>
          </Box>
          <Box mb={{ xs: 6, md: 12 }}>
            <HowItWorks />
            <PeaceOfMind />
          </Box>
        </>
      )}
      <Box mb={{ xs: 4, md: 12 }}>
        <Grid container>
          <Grid item xs={12}>
            <SimilarVehicles />
          </Grid>
          {viewModel.ready() && (
            <Grid item xs={12}>
              <Container content>
                <Box pt={{ xs: 4, md: 12 }}>
                  <Typography variant="overline" fontWeight="fontWeightLight">
                    {viewModel.disclaimer}
                  </Typography>
                </Box>
              </Container>
            </Grid>
          )}
        </Grid>
      </Box>
      <StandardFooter />
      {xsDown && viewModel.ready() && (
        <StickyBottom>
          <Box
            p={2}
            bgcolor="background.paper"
            borderTop="1px solid"
            borderColor="grey.400"
          >
            <StartPurchase />
          </Box>
        </StickyBottom>
      )}
    </>
  );
};

export default observer(VehicleDetails);
