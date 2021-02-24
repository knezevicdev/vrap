import React, { useContext } from 'react';

import { DealContext } from '../store/DealStore';
import View from './View';
import ViewModel from './ViewModel';

import { headerAnalyticsHandler } from 'src/integrations/header/HeaderAnalyticsHandler';

const Header = (): JSX.Element => {
  const store = useContext(DealContext);
  const viewModel = new ViewModel(store, headerAnalyticsHandler);
  return <View viewModel={viewModel} />;
};

export default Header;
