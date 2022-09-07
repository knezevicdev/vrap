import { useRouter } from 'next/router';
import React from 'react';

import { useAppStore } from '../../../../../../context';
import ViewModel from './ViewModel';
import View from './VinInput';

const VinInput: React.FC = () => {
  const router = useRouter();
  const { store } = useAppStore();

  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} router={router} />;
};

export default VinInput;
