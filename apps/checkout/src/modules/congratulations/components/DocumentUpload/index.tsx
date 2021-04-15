import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  dealId: number;
  trackDocUploadClicked?: () => void;
}

const DocumentUpload = ({
  dealId,
  trackDocUploadClicked,
}: Props): JSX.Element => {
  const viewModel = new ViewModel(dealId, trackDocUploadClicked);
  return <View viewModel={viewModel} />;
};

export default DocumentUpload;
