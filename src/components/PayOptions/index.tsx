import { useABSmartly } from '@vroom-web/analytics-integration';
import React from 'react';

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
  const oStore = useOptionsStore();
  const absmartly = useABSmartly();
  const viewModel = new ViewModel(oStore, absmartly);

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
