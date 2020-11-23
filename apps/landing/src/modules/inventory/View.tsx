import { observer } from 'mobx-react';

import React from 'react';

import ViewModel from './ViewModel';

export interface Props {
  viewModel: ViewModel;
}

const InventoryView: React.FC<Props> = ({ viewModel }) => {
  return <pre>{viewModel.getCar()}</pre>;
};

export default observer(InventoryView);
