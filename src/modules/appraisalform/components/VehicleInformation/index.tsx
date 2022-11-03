import { observer } from 'mobx-react';
import React from 'react';

import { useFingerprint } from '../../../../context/FigerprintContext';
import VehicleInformationView from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

interface Props {
  form: any;
  fields: any;
  hideButtonCallback: (hide: boolean) => void;
}

const VehicleInformation: React.FC<Props> = ({
  form,
  fields,
  hideButtonCallback,
}) => {
  const fingerprintResult = useFingerprint();
  const { store } = useAppStore();
  const viewModel = new ViewModel(store, fingerprintResult);

  return (
    <VehicleInformationView
      form={form}
      fields={fields}
      viewModel={viewModel}
      hideButtonCallback={hideButtonCallback}
    />
  );
};

export default observer(VehicleInformation);
