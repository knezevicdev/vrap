import { observer } from 'mobx-react';
import React from 'react';

import { useAppStore } from '../../../../context';
import { UseForm } from '../componentInterfaces.d';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  fields: any;
  newForm?: boolean;
  form: UseForm;
}

const ExteriorConditions: React.FC<Props> = ({ fields, newForm, form }) => {
  const { store } = useAppStore();
  const viewModel = new ViewModel(store);
  return (
    <View fields={fields} viewModel={viewModel} newForm={newForm} form={form} />
  );
};

export default observer(ExteriorConditions);
