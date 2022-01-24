import { useRouter } from 'next/router';
import React from 'react';

import ViewModel from './ViewModel';
import View from './VinInput';

const VinInput: React.FC = () => {
  const router = useRouter();

  const viewModel = new ViewModel();
  return <View viewModel={viewModel} router={router} />;
};

export default VinInput;
