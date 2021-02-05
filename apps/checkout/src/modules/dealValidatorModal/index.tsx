import React from 'react';
import { DealValidatorProps } from "src/core/dealValidator";
import View from './View';
import ViewModel from './ViewModel';
class Congratulations extends React.Component {
  viewModel:ViewModel;

  constructor(props: DealValidatorProps){ 
    super(props);
    this.viewModel = new ViewModel(props);
  }
  
  render(): React.ReactNode {
    return <View viewModel={this.viewModel} />;
  }
}

export default Congratulations;
