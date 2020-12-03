import React from 'react';

import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

import client from 'src/networking/client';

class Congrats extends React.Component {
  model = new Model(client);
  viewModel = new ViewModel(this.model);

  componentDidMount(): void {
    this.model.getData();
  }

  render(): React.ReactNode {
    return <View viewModel={this.viewModel} />;
  }
}

export default Congrats;
