import React, { useContext } from 'react';

import View from './View';
import ViewModel from './ViewModel';
import { DealContext } from '../store/DealStore';

const Header = (): JSX.Element => {
  const store = useContext(DealContext);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Header;
