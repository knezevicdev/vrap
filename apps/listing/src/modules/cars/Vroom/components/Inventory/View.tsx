import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import Cars from './components/Cars';
import Count from './components/Count';
import LandingBanner from './components/LandingBanner';
import Pagination from './components/Pagination';
import PricingPopup from './components/PricingPopup';
import TopSection from './components/TopSection';
import ViewModel from './ViewModel';

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    padding: '0',
    paddingBottom: theme.spacing(4),
  },
  padding: theme.spacing(4, 2),
  borderBottom: 'solid 1px #bebebe',
}));

interface Props {
  viewModel: ViewModel;
}

const InventoryView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledGrid container direction="column">
      <TopSection />
      <LandingBanner />
      {viewModel.getGoBiasExperimentAssignedExperiment() && (
        <span id="go-bias"></span>
      )}
      <Cars />
      {!viewModel.hideVehicleCount() && <Count />}
      {viewModel.showWhenInventory() && <Pagination />}
      {viewModel.showWhenInventory() && <PricingPopup />}
    </StyledGrid>
  );
};

export default observer(InventoryView);
