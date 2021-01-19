import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Header: React.FC<{ isVariant?: boolean }> = ({ isVariant }) => {
  return <View viewModel={new ViewModel(isVariant)} />;
};

export default Header;
