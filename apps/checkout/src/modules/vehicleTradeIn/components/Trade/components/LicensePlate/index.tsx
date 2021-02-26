import React from 'react';

import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

import client from 'src/networking/client';

interface Props {
  trackLicensePlateClick?: () => void;
  onStepBack?: () => void;
}

class LicensePlate extends React.Component<Props> {
  viewModel: ViewModel;

  constructor(props: Props) {
    super(props);
    const model = new Model(client);
    this.viewModel = new ViewModel(
      model,
      props.trackLicensePlateClick,
      props.onStepBack
    );
  }

  render(): React.ReactNode {
    return (
      <View
        {...this.viewModel}
        trackLicensePlateClick={this.props.trackLicensePlateClick}
      />
    );
  }
}

export default LicensePlate;
