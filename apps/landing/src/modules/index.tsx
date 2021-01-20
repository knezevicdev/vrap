import React from 'react';

import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';
class Landing extends React.Component {
  viewModel: ViewModel;
  constructor(props: {}) {
    super(props);
    this.viewModel = new ViewModel(new Model());
  }
  render(): React.ReactNode {
    return <View {...this.viewModel} />;
  }
}
export default Landing;
