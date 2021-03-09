import React, { useEffect } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useDeal } from 'src/core/hooks';
import { CatStore } from 'src/core/store';
import { headerAnalyticsHandler } from 'src/integrations/header/HeaderAnalyticsHandler';

const Header = (): JSX.Element => {
  const dealStore = useDeal();
  const store = new CatStore();
  const viewModel = new ViewModel(dealStore, headerAnalyticsHandler, store);

  useEffect(() => {
    viewModel.handleMount();
    return (): void => {
      viewModel.handleUnmount();
    };
  }, [viewModel]);

  return <View viewModel={viewModel} />;
};

export default Header;
