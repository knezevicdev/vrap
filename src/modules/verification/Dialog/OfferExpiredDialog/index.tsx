import React from 'react';

import View from './View';

interface Props {
  vin: string;
}

const Dialog: React.FC<Props> = ({ vin }) => {
  return <View vin={vin} />;
};

export default Dialog;
