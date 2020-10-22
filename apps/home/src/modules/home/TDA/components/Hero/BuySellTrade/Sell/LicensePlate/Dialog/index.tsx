import React from 'react';

import { LicensePlateStore } from '../store';
import { LicensePlateDialogStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import { HomeStore } from 'src/modules/home/store';

interface Props {
  homeStore: HomeStore;
  licensePlateStore: LicensePlateStore;
}

const LicensePlateDialog: React.FC<Props> = ({
  homeStore,
  licensePlateStore,
}) => {
  const viewModel = new ViewModel(
    homeStore,
    licensePlateStore,
    new LicensePlateDialogStore()
  );
  return <View viewModel={viewModel} />;
};

export default LicensePlateDialog;
