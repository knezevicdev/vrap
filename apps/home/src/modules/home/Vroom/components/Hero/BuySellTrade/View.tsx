import { makeStyles, styled } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { observer } from 'mobx-react';
import { HomeStore, HomeStoreContext } from 'src/modules/home/store';
import React, { useState, useEffect, useContext } from 'react';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import experimentSDK from 'src/integrations/experimentSDK';

import Buy from './Buy';
import Sell from './Sell';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

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

const BuySellTradeView: React.FC<Props> = ({ viewModel }) => {
  const tabsClass = tabsStyles();
  const tabClass = tabStyle();

  const homeStore = useContext<HomeStore>(HomeStoreContext);
  const [analyticsHandler] = useState<AnalyticsHandler>(new AnalyticsHandler());
  const [swapTabs, setSwapTabs] = useState<boolean>(false);

  useEffect(() => {
    const { experiments } = homeStore;
    const expId = 'cw-swap-tabs';
    const variantCalculatedExp = experimentSDK.determineVariantClientSide(
      experiments,
      expId
    );

    if (variantCalculatedExp) {
      analyticsHandler.registerExperiment(variantCalculatedExp);
      if (variantCalculatedExp.assignedVariant === 1)
        setSwapTabs(true);
    }
  });

  const defaultTabs = () => {
    return (
      <>
        <Tabs
          classes={tabsClass}
          value={viewModel.getTab()}
          onChange={viewModel.handleChange}
        >
          <Tab classes={tabClass} label={viewModel.buyTab} />
          <Tab classes={tabClass} label={viewModel.sellTab} />
        </Tabs>
        {viewModel.showBuy() ? <Buy /> : <Sell />}
      </>
    )
  }

  const swappedTabs = () => {
    return (
      <>
        <Tabs
          classes={tabsClass}
          value={viewModel.getTab()}
          onChange={viewModel.handleChange}
        >
          <Tab classes={tabClass} label={viewModel.sellTab} />
          <Tab classes={tabClass} label={viewModel.buyTab} />
        </Tabs>
        {viewModel.showBuy() ? <Sell /> : <Buy /> }
      </>
    )
  }

  return (
    <TabsContainer>
      { swapTabs ? swappedTabs() : defaultTabs() }
    </TabsContainer>
  );
};

export default observer(BuySellTradeView);
