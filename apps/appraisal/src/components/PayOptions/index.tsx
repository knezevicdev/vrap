import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import { useOptionsStore } from '../../modules/options/store';

interface Props {
  selected: string;
}

const PayOptions: React.FC<Props> = ({ selected }) => {
  const oStore = useOptionsStore();
  const viewModel = new ViewModel(oStore);

  return (
    <View
      viewModel={viewModel}
      selected={selected}
    />
  );
};

export default PayOptions;
