import React from 'react';

import { useAppStore } from '../../context';
import { useOptionsStore } from '../../modules/options/store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  selected: string;
  handleAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const PayOptions: React.FC<Props> = ({
  selected,
  handleAddressChange,
  setFieldValue,
}) => {
  const { store } = useAppStore();
  const oStore = useOptionsStore();
  const viewModel = new ViewModel(oStore, store);

  return (
    <View
      viewModel={viewModel}
      selected={selected}
      handleAddressChange={handleAddressChange}
      setFieldValue={setFieldValue}
    />
  );
};

export default PayOptions;
