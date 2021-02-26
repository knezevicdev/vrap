import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface Props {
  close: () => void;
  isOpen: boolean;
  vehicles: { car: string; vin: string }[];
  trackLicensePlateClick?: () => void;
}

class Modal extends React.Component<Props> {
  render(): React.ReactNode {
    const { vehicles, isOpen, close, trackLicensePlateClick } = this.props;
    const viewModel: ViewModel = new ViewModel(
      vehicles,
      close,
      isOpen,
      trackLicensePlateClick
    );

    return <View {...viewModel} />;
  }
}

export default Modal;
