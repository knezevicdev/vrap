import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import {VinStore} from "../store";

interface Props {
  store: VinStore;
}

const VinDialog: React.FC<Props> = ({store}) => {
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default VinDialog;
