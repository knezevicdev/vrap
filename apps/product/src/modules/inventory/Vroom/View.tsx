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
import LegalFooter from './components/LegalFooter';
import NeedHelp from './components/NeedHelp';
import NotifyMe from './components/NotifyMe';
import PeaceOfMind from './components/PeaceOfMind';
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
  position: 'sticky',
  bottom: 0,
  zIndex: theme.zIndex.appBar,
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  borderTop: `solid 1px ${theme.palette.grey.A100}`,
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
      <SimpleHeader />
      <InventoryViewContainer>
        {viewModel.error() && (
          <VehicleNotFound message={viewModel.noVehicleFound} />
        )}
        {viewModel.ready() && (
          <>
            {!xsDown && <Breadcrumbs />}
            <Gallery />
            <VehicleHeader />
            <CarDetails />
            <Features />
            <PeaceOfMind />
          </>
        )}
        <SimilarVehicles />
        <NeedHelp />
        <LegalFooter />
      </InventoryViewContainer>
      <StandardFooter />
      {xsDown && viewModel.ready() && (
        <StickyBottom>
          {viewModel.isAvailableSoon() ? <NotifyMe /> : <StartPurchase />}
        </StickyBottom>
      )}
    </>
  );
};

export default observer(InventoryView);
