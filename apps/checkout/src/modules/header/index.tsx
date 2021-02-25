import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useDeal } from 'src/core/hooks';
import { headerAnalyticsHandler } from 'src/integrations/header/HeaderAnalyticsHandler';

const Header = (): JSX.Element => {
  const store = useDeal();
  const viewModel = new ViewModel(store, headerAnalyticsHandler);
  return <View viewModel={viewModel} />;
};

export default Header;
