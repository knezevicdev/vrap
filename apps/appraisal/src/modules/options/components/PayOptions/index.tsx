import React from 'react';

import View from './View';

interface Props {
  optionMeta: Array<string>;
  selected: string;
  handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PayOptions: React.FC<Props> = ({ optionMeta, selected, handleClick }) => {
  return (
    <View
      optionMeta={optionMeta}
      selected={selected}
      handleClick={handleClick}
    />
  );
};

export default PayOptions;
