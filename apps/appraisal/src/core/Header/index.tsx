import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Header: React.FC = () => {
  return <View viewModel={new ViewModel()} />;
};

export default Header;
