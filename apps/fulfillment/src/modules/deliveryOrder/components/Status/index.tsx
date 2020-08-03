import React from 'react';

import { DeliveryOrderStore, DeliveryOrderStoreContext } from '../../store';
import View from './View';
import ViewModel from './ViewModel';

const Status: React.FC = () => {
  return (
    <DeliveryOrderStoreContext.Consumer>
      {(store: DeliveryOrderStore): JSX.Element => {
        const viewModel = new ViewModel(store.deliveryOrder.orderStatus);
        return <View viewModel={viewModel} />;
      }}
    </DeliveryOrderStoreContext.Consumer>
  );
};

export default Status;
