import { makeStyles, styled } from '@material-ui/core/styles';
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

const tabsStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    minHeight: theme.spacing(4),
    border: '1px solid #D6D7DA',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)',
    margin: theme.spacing(2, 0),
  },
  flexContainer: {
    position: 'relative',
    zIndex: 1,
  },
  indicator: {
    top: 0,
    bottom: 0,
    height: 'auto',
    borderRadius: 20,
    backgroundColor: '#fff',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)',
    border: '1px solid #041022',
  },
}));

const tabStyle = makeStyles((theme) => ({
  root: {
    fontWeight: 600,
    fontSize: '14px',
    letterSpacing: '1.25px',
    minHeight: theme.spacing(4),
    minWidth: '50%',
    color: theme.palette.grey['500'],
  },
  selected: {
    color: theme.palette.text.primary,
  },
}));

const SellView: React.FC<Props> = ({ viewModel }) => {
  const tabsClass = tabsStyles();
  const tabClass = tabStyle();

  return (
    <SellContainer>
      <Tabs
        classes={tabsClass}
        value={viewModel.getTab()}
        onChange={viewModel.handleChange}
      >
        <Tab disableRipple classes={tabClass} label={viewModel.buyTab} />
        <Tab disableRipple classes={tabClass} label={viewModel.sellTab} />
      </Tabs>
      {viewModel.showLicensePlate() ? <LicensePlate /> : <Vin />}
    </SellContainer>
  );
};

export default observer(SellView);
