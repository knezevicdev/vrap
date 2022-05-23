import { observer } from 'mobx-react';
import React from 'react';

import { FormField } from '../../../../interfaces.d';
import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

interface Props {
  fields: Record<string, FormField>;
  disableExperiments: boolean;
}

const VehicleHistory: React.FC<Props> = ({ fields, disableExperiments }) => {
  const { store } = useAppStore();
  const viewModel = new ViewModel(store);

  return (
    <View
      fields={fields}
      disableExperiments={disableExperiments}
      viewModel={viewModel}
    />
  );
};

export default observer(VehicleHistory);
