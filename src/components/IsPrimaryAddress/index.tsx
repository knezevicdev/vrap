import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  selected: string;
}

const IsPrimaryAddress: React.FC<Props> = ({ selected }) => {
  const viewModel = new ViewModel();
  return <View optionMeta={viewModel.optionMeta} selected={selected} />;
};

export default IsPrimaryAddress;
