import React from 'react';

import HeaderSearchDialogView from './View';
import HeaderSearchDialogViewModel from './ViewModel';

const HeaderSearchDialog: React.FC = () => {
  const viewModel = new HeaderSearchDialogViewModel();
  return <HeaderSearchDialogView viewModel={viewModel} />;
};

export default HeaderSearchDialog;
