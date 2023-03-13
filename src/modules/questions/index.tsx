import { useABSmartly } from '@vroom-web/analytics-integration';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Questions: React.FC = () => {
  const absmartly = useABSmartly();

  const viewModel = new ViewModel(absmartly);
  return <View viewModel={viewModel} />;
};

export default Questions;
