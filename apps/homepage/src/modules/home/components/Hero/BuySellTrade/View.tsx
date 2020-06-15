import { styled } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { observer } from 'mobx-react';
import React from 'react';

import Buy from './Buy';
import Sell from './Sell';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const TabsContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  maxWidth: '570px',
}));

const CustomTab = styled(Tab)(() => ({
  width: '50%',
}));

const BuySellTradeView: React.FC<Props> = ({ viewModel }) => {
  return (
    <TabsContainer>
      <Tabs value={viewModel.getTab()} onChange={viewModel.handleChange}>
        <CustomTab label={viewModel.buyTab} />
        <CustomTab label={viewModel.sellTab} />
      </Tabs>
      {viewModel.showBuy() ? <Buy /> : <Sell />}
    </TabsContainer>
  );
};

export default observer(BuySellTradeView);
