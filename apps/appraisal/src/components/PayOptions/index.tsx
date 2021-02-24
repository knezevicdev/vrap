import React from 'react';

import { useOptionsStore } from '../../modules/options/store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  selected: string;
}

const PayOptions: React.FC<Props> = ({ selected }) => {
  const oStore = useOptionsStore();
  const viewModel = new ViewModel(oStore);

  return <View viewModel={viewModel} selected={selected} />;
};

export default PayOptions;
