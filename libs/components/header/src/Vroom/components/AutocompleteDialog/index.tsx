import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  invSearchV3Url: string;
}

const AutocompleteDialog: React.FC<Props> = ({ invSearchV3Url }) => {
  const viewModel = new ViewModel({ invSearchV3Url });
  return <View viewModel={viewModel} />;
};

export default AutocompleteDialog;
