import { makeStyles, styled } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { observer } from 'mobx-react';
import React from 'react';

import Buy from './Buy';
import Sell from './Sell';
import ViewModel from './ViewModel';

const TabsContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(2),
  },
  marginTop: theme.spacing(2),
  maxWidth: '570px',
  gridArea: 'sv',
  textAlign: 'left',
}));

const tabsStyles = makeStyles((theme) => ({
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
    color: theme.palette.text.primary,
  },
}));

interface Props {
  viewModel: ViewModel;
  swapTabs: boolean;
  changeTabLabel: boolean;
}

const BuySellTradeView: React.FC<Props> = ({
  viewModel,
  swapTabs,
  changeTabLabel,
}) => {
  const tabsClass = tabsStyles();
  const tabClass = tabStyle();
  const sellTabLabel = changeTabLabel
    ? viewModel.sellTabExperiment
    : viewModel.sellTab;

  // TODO: Looks really bad. If we don't do this way and put it as
  // a react conditional rendering, there's some weird race condition
  // between Mui and the useEffect which sets A/B tests
  const labelOne = swapTabs ? sellTabLabel : viewModel.buyTab;
  const labelTwo = swapTabs ? viewModel.buyTab : sellTabLabel;

  const componentOne = swapTabs ? <Sell /> : <Buy />;
  const componentTwo = swapTabs ? <Buy /> : <Sell />;

  return (
    <TabsContainer>
      <Tabs
        classes={tabsClass}
        value={viewModel.getTab()}
        onChange={viewModel.handleChange}
      >
        <Tab classes={tabClass} label={labelOne} />
        <Tab classes={tabClass} label={labelTwo} />
      </Tabs>
      {viewModel.showBuy() ? componentOne : componentTwo}
    </TabsContainer>
  );
};

export default observer(BuySellTradeView);
