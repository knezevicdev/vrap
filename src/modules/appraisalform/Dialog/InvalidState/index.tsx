import React from 'react';

import View from './View';

interface Props {
  state: string;
}

const Dialog: React.FC<Props> = ({ state }) => {
  return <View state={state} />;
};

export default Dialog;
