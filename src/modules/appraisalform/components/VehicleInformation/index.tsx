import { observer } from 'mobx-react';
import React from 'react';

import VehicleInformationView from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

interface Props {
  form: any;
  fields: any;
}

const VehicleInformation: React.FC<Props> = ({ form, fields }) => {
  const { store } = useAppStore();
  const viewModel = new ViewModel(store);

  return (
    <VehicleInformationView form={form} fields={fields} viewModel={viewModel} />
  );
};

export default observer(VehicleInformation);
