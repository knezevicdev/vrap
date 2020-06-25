import React from 'react';

import { LicensePlateStore } from '../store';
import { LicensePlateDialogStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  licensePlateStore: LicensePlateStore;
}

const LicensePlateDialog: React.FC<Props> = ({ licensePlateStore }) => {
  const viewModel = new ViewModel(
    licensePlateStore,
    new LicensePlateDialogStore()
  );
  return <View viewModel={viewModel} />;
};

export default LicensePlateDialog;
