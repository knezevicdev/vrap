import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import CarDetails from './components/CarDetails';
import Favorites from './components/Favorites';
import Features from './components/Features';
import Gallery from './components/Gallery';
import LegalFooter from './components/LegalFooter';
import NeedHelp from './components/NeedHelp';
import NotifyMe from './components/NotifyMe';
import PeaceOfMind from './components/PeaceOfMind';
import SafetyAndQuality from './components/SafetyAndQuality';
import SalesContact from './components/SalesContact';
import SimilarVehicles from './components/SimilarVehicles';
import StartPurchase from './components/StartPurchase';
import VehicleHeader from './components/VehicleHeader';
import VehicleNotFound from './components/VehicleNotFound';
import ViewModel from './ViewModel';

export interface Props {
  viewModel: ViewModel;
}

//#region Styling
const InventoryViewContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const StickyBottom = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  bottom: 0,
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderTop: `solid 1px ${theme.palette.grey.A100}`,
  alignItems: 'center',
}));
//#endregion

const InventoryView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    viewModel.startReaction();
    return (): void => viewModel.stopReaction();
  }, [viewModel]);

  return (
    <>
      {/* TDA header goes here */}
      <InventoryViewContainer>
        {viewModel.error() && (
          <VehicleNotFound message={viewModel.noVehicleFound} />
        )}
        {viewModel.ready() && (
          <>
            {!xsDown && <Breadcrumbs />}
            <Gallery />
            <VehicleHeader />
            <SalesContact />
            <CarDetails />
            <Features />
            <SafetyAndQuality />
            <PeaceOfMind />
          </>
        )}
        <SimilarVehicles />
        <NeedHelp />
        <LegalFooter />
      </InventoryViewContainer>
      {/* TDA footer goes here */}
      {xsDown && viewModel.ready() && (
        <StickyBottom>
          {viewModel.isAvailableSoon() ? <NotifyMe /> : <StartPurchase />}
          <Favorites />
        </StickyBottom>
      )}
    </>
  );
};

export default observer(InventoryView);
