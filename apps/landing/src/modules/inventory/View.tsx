import { observer } from 'mobx-react';
import { StandardFooter } from '@vroom-web/footer-components';

import React from 'react';

import ViewModel from './ViewModel';

export interface Props {
  viewModel: ViewModel;
}

const InventoryView: React.FC<Props> = ({ viewModel }) => {
  return (
    <>
      <pre>{viewModel.getCar()}</pre>
      <StandardFooter />
    </>
  );
};

export default observer(InventoryView);
