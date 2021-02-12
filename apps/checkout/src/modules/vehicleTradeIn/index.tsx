import React from 'react';

import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';
import { DealStore } from 'src/core/store';
import { DealProvider } from 'src/core/contexts';
import CheckoutLayout from 'src/modules/common/CheckoutLayout';

//Testing
import { dealState } from 'src/stories/pages/layout/ViewModel';
class VehicleTradeIn extends React.Component {
  model = new Model();
  viewModel = new ViewModel(this.model);
  store = new DealStore(dealState);

  componentDidMount(): void {
    this.model.getData();
  }

  render(): React.ReactNode {
    return (
      <DealProvider value={this.store}>
        <CheckoutLayout showCarCard={true}>
          <View viewModel={this.viewModel} />
        </CheckoutLayout>
      </DealProvider>
    );
  }
}

export default VehicleTradeIn;
