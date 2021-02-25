import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

export interface Props {
  trackLicensePlateClick?: () => void;
  trackVinClick?: () => void;
  onStepBack?: () => void;
}

class Trade extends React.Component<Props> {
  viewModel: ViewModel;

  constructor(props: Props) {
    super(props);
    this.viewModel = new ViewModel();
  }

  render(): React.ReactNode {
    const { trackLicensePlateClick, trackVinClick, onStepBack } = this.props;

    return (
      <View
        {...this.viewModel}
        trackLicensePlateClick={trackLicensePlateClick}
        trackVinClick={trackVinClick}
        onStepBack={onStepBack}
      />
    );
  }
}

export default Trade;
