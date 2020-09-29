import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Footer: React.FC = () => {
  return <View viewModel={new ViewModel()} />;
};

export default Footer;
