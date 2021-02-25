import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  dealId: number;
}

const DocumentUpload = ({ dealId }: Props): JSX.Element => {
  const viewModel = new ViewModel(dealId);
  return <View viewModel={viewModel} />;
};

export default DocumentUpload;
