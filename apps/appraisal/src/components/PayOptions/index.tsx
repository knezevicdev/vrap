import React from 'react';

import View from './View';

interface Props {
  optionMeta: Array<string>;
  selected: string;
}

const PayOptions: React.FC<Props> = ({ optionMeta, selected }) => {
  return <View optionMeta={optionMeta} selected={selected} />;
};

export default PayOptions;
