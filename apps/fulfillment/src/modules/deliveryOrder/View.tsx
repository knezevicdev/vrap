import { Container } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import Header from 'src/components/Header';

interface Props {
  viewModel: ViewModel;
}
const DeliveryOrderView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const deliveryOrder = viewModel.getDeliveryOrder();

  return (
    <>
      <Header />
      <Container>{deliveryOrder.vehicle.make}</Container>
    </>
  );
};

export default observer(DeliveryOrderView);
