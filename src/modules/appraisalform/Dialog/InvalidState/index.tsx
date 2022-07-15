import React from 'react';

import View from './View';

interface Props {
  state: string;
  closeModalHandler: any;
}

const Dialog: React.FC<Props> = ({ state, closeModalHandler }) => {
  return <View state={state} closeModalHandler={closeModalHandler} />;
};

export default Dialog;
