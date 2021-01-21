import { makeStyles, styled } from '@material-ui/core/styles';
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
  backgroundColor: `rgb(255, 255, 255, 0.9)`,
  padding: theme.spacing(3, 5),
  width: '496px',
  gridArea: 'sv',
  textAlign: 'left',
  [theme.breakpoints.only('xs')]: {
    width: '100%',
    padding: theme.spacing(3),
  },
}));

const tabsStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
    height: '2px',
  },
  flexContainer: {
    borderBottom: 'solid 1px #E0E0E0',
  },
}));

const tabStyle = makeStyles((theme) => ({
  root: {
    fontWeight: 600,
    fontSize: '18px',
    letterSpacing: '0.225px',
    minWidth: '50%',
    color: theme.palette.grey['700'],
  },
  selected: {
    color: theme.palette.primary.main,
  },
}));

const BuySellTradeView: React.FC<Props> = ({ viewModel }) => {
  const tabsClass = tabsStyles();
  const tabClass = tabStyle();

  return (
    <TabsContainer>
      <Tabs
        classes={tabsClass}
        value={viewModel.getTab()}
        onChange={viewModel.handleChange}
      >
        <Tab classes={tabClass} label={viewModel.buyTab} />
        <Tab classes={tabClass} label={viewModel.sellTab} />
      </Tabs>
      {viewModel.showBuy() ? <Buy /> : <Sell />}
    </TabsContainer>
  );
};

export default observer(BuySellTradeView);
