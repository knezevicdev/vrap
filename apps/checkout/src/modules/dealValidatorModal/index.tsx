import React from 'react';

import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';
class DealValidator extends React.Component {
  model = new Model();
  viewModel = new ViewModel(this.model);

  componentDidMount(): void {
    this.model.getData();
  }

  render(): React.ReactNode {
    return (
      <>
        <View viewModel={this.viewModel} />
        {this.props.children}
      </>
    );
  }
}

export default DealValidator;
