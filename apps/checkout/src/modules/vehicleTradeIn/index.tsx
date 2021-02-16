import React from 'react';

import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

import { DealProvider } from 'src/core/contexts';
import { DealStore } from 'src/core/store';
import CheckoutLayout from 'src/modules/common/CheckoutLayout';
import { getCurrentVin } from 'src/networking/util/getCurrentVin';

class VehicleTradeIn extends React.Component {
  model = new Model();
  viewModel = new ViewModel(this.model);

  //Init Store for the deal summary and layout
  store = new DealStore(this.model, 1);

  componentDidMount(): void {
    const vin = getCurrentVin();
    this.model.getData(vin);
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
