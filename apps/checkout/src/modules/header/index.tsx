import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useDeal } from 'src/core/hooks';

const Header = (): JSX.Element => {
  const store = useDeal();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Header;
