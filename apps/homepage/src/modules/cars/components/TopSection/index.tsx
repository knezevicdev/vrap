import React from 'react';

import { TopSectionProps } from './types';
import View from './View';
import ViewModel from './ViewModel';

const TopSection: React.FC<TopSectionProps> = props => {
  const viewModel = new ViewModel();
  return <View {...props} viewModel={viewModel} />;
};

export default TopSection;
