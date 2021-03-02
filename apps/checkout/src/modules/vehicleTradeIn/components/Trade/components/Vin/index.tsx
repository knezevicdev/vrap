import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  trackVinClick?: () => void;
  onStepBack?: () => void;
}

class Vin extends React.Component<Props> {
  viewModel: ViewModel;

  constructor(props: Props) {
    super(props);
    this.viewModel = new ViewModel(props.trackVinClick, props.onStepBack);
  }

  render(): React.ReactNode {
    return <View {...this.viewModel} />;
  }
}

export default Vin;