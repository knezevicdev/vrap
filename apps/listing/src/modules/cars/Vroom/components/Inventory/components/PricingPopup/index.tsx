import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

class PricingPopup extends React.Component {
  viewModel: ViewModel;

  constructor(props: any) {
    super(props);
    this.viewModel = new ViewModel();
  }

  render(): React.ReactNode {
    return <View viewModel={this.viewModel} />;
  }
}

export default PricingPopup;
