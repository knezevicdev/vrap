import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  vroomUrl: string;
}

const TDAFooter: React.FC<Props> = ({ vroomUrl }) => {
  const viewModel = new ViewModel(vroomUrl);
  return <View viewModel={viewModel} />;
};

export default TDAFooter;
