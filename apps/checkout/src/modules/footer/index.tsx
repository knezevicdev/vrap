import React, { FC } from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Footer: FC = () => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} />;
};

export default Footer;
