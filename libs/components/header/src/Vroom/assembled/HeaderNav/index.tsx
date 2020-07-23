import React from 'react';

import HeaderNavStore from './store';
import View from './View';
import ViewModel from './ViewModel';

const HeaderNav: React.FC = () => {
  const store = new HeaderNavStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default HeaderNav;
