import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  selected: string;
}

const PayOptions: React.FC<Props> = ({ selected }) => {
  const viewModel = new ViewModel();
  return <View optionMeta={viewModel.optionMeta} selected={selected} />;
};

export default PayOptions;
