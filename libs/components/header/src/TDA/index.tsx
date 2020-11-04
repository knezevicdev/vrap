import React from 'react';

import Store from './store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  vroomUrl: string;
}

const TDAHeader: React.FC<Props> = ({ vroomUrl }) => {
  const viewModel = new ViewModel(new Store(), vroomUrl);
  return <View viewModel={viewModel} />;
};

export default TDAHeader;
