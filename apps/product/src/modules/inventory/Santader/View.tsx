import { styled } from '@material-ui/core/styles';
import { SantanderFooter } from '@vroom-web/footer-components';
import { SantanderHeader } from '@vroom-web/header-components';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import CarDetails from './components/CarDetails';
import Features from './components/Features';
import Gallery from './components/Gallery/';
import LegalFooter from './components/LegalFooter';
import PeaceOfMind from './components/PeaceOfMind';
import SimilarVehicles from './components/SimilarVehicles';
import StartPurchase from './components/StartPurchase';
import VehicleHeader from './components/VehicleHeader';
import VehicleNotFound from './components/VehicleNotFound';
import ViewModel from './ViewModel';

export interface Props {
  viewModel: ViewModel;
}

const InventoryViewContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const StickyBottom = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'sticky',
  bottom: 0,
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderTop: `solid 1px ${theme.palette.grey.A100}`,
  [theme.breakpoints.only('xs')]: {
    display: 'flex',
  },
}));

const DesktopOnly = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.only('xs')]: {
    display: 'none',
  },
}));

const InventoryView: React.FC<Props> = (props) => {
  const { viewModel } = props;

  useEffect(() => {
    viewModel.startReaction();
    return (): void => viewModel.stopReaction();
  }, [viewModel]);

  return (
    <>
      <SantanderHeader />
      <InventoryViewContainer>
        {viewModel.error() && (
          <VehicleNotFound message={viewModel.noVehicleFound} />
        )}
        {viewModel.ready() && (
          <>
            <DesktopOnly>
              <Breadcrumbs />
            </DesktopOnly>
            <Gallery />
            <VehicleHeader />
            <CarDetails />
            <Features />
            <PeaceOfMind />
          </>
        )}
        <SimilarVehicles />
        <LegalFooter />
      </InventoryViewContainer>
      <SantanderFooter />
      {viewModel.ready() && (
        <StickyBottom>
          <StartPurchase />
        </StickyBottom>
      )}
    </>
  );
};

export default observer(InventoryView);
