import React from 'react';

import View from './View';

interface Props {
  closeModalHandler: () => void;
}

const Dialog: React.FC<Props> = ({ closeModalHandler }) => {
  return <View closeModalHandler={closeModalHandler} />;
};

export default Dialog;
