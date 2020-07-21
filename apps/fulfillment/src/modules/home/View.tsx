import { Container } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import Header from 'src/components/Header';

interface Props {
  viewModel: ViewModel;
}
const HomeView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const deliveryOrders = viewModel.getDeliveryOrders();

  return (
    <>
      <Header />
      <Container>{deliveryOrders.map((i) => i)}</Container>
    </>
  );
};

export default observer(HomeView);
