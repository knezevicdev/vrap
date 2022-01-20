import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  handleEmailSubmit: any;
}

const EmailInput: React.FC<Props> = ({ handleEmailSubmit }) => {
  const viewModel = new ViewModel();
  return <View handleEmailSubmit={handleEmailSubmit} viewModel={viewModel} />;
};

export default EmailInput;
