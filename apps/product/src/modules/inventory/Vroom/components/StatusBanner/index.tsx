import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import withData from 'src/modules/inventory/withData';

class StatusBanner extends React.Component {
  viewModel: ViewModel;

  constructor(props: Record<string, never>) {
    super(props);
    this.viewModel = new ViewModel(props.data);
  }

  render(): React.ReactNode {
    return <View viewModel={this.viewModel} />;
  }
}

export default withData(StatusBanner);
