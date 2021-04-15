import React from 'react';

import View from './View';
import ViewModel from './ViewModel';
import { UploadedDocumentsProps } from './ViewModel';

const UploadDocuments = ({
  documents,
  showInsuranceDisclaimer,
}: UploadedDocumentsProps): JSX.Element => {
  const viewModel = new ViewModel(documents, showInsuranceDisclaimer);
  return <View viewModel={viewModel} />;
};

export default UploadDocuments;
