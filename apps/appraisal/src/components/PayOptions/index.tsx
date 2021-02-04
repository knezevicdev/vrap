import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  selected: string;
  onPayOptionClick: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const PayOptions: React.FC<Props> = ({ selected, onPayOptionClick }) => {
  const viewModel = new ViewModel();
  return <View optionMeta={viewModel.optionMeta} selected={selected} onPayOptionClick={onPayOptionClick} />;
};

export default PayOptions;
