import { observer } from 'mobx-react';
import React from 'react';

import { useAppStore } from '../../../../context';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  fields: any;
}

const ExteriorConditions: React.FC<Props> = ({ fields }) => {
  const { store } = useAppStore();
  const viewModel = new ViewModel(store);
  return <View fields={fields} viewModel={viewModel} />;
};

export default observer(ExteriorConditions);
