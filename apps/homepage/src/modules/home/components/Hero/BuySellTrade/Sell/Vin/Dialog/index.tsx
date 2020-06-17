import React from 'react';

import { VinStore } from '../store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  store: VinStore;
}

const VinDialog: React.FC<Props> = ({ store }) => {
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default VinDialog;
