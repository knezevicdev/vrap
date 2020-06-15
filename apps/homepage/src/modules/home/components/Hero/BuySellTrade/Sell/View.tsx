import { styled } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { observer } from 'mobx-react';
import React from 'react';

import LicensePlate from './LicensePlate';
import ViewModel from './ViewModel';
import Vin from './Vin';

interface Props {
  viewModel: ViewModel;
}

const SellContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  maxWidth: '570px',
}));

const CustomTab = styled(Tab)(() => ({
  width: '50%',
}));

const SellView: React.FC<Props> = ({ viewModel }) => {
  return (
    <SellContainer>
      <Tabs value={viewModel.getTab()} onChange={viewModel.handleChange}>
        <CustomTab label={viewModel.buyTab} />
        <CustomTab label={viewModel.sellTab} />
      </Tabs>
      {viewModel.showLicensePlate() ? <LicensePlate /> : <Vin />}
    </SellContainer>
  );
};

export default observer(SellView);
