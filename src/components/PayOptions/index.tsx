import React from 'react';

import { useOptionsStore } from '../../modules/options/store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  selected: string;
  handleAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PayOptions: React.FC<Props> = ({ selected, handleAddressChange }) => {
  const oStore = useOptionsStore();
  const viewModel = new ViewModel(oStore);

  return (
    <View
      viewModel={viewModel}
      selected={selected}
      handleAddressChange={handleAddressChange}
    />
  );
};

export default PayOptions;
