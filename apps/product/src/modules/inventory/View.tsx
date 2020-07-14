import Box from '@material-ui/core/Box';
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

const StickyBottom = styled(Box)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  zIndex: theme.zIndex.appBar,
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
          <VehicleNotFound
            errorTop={viewModel.errorTop}
            errorBottom={viewModel.errorBottom}
          />
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
      </InventoryViewContainer>
      <StandardFooter />
      {xsDown && viewModel.ready() && (
        <StickyBottom>
          <StartPurchase />
        </StickyBottom>
      )}
    </>
  );
};

export default observer(InventoryView);
