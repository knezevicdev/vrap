import React from 'react';

import View from './View';
import ViewModel, { USE_ON_PAGE } from './ViewModel';

export { USE_ON_PAGE };
interface Props {
  close: () => void;
  isOpen: boolean;
  vehicles: { car: string; vin: string }[];
  useOnPage: USE_ON_PAGE;
  trackLicensePlateClick?: () => void;
}

class Modal extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      vehicles,
      isOpen,
      close,
      trackLicensePlateClick,
      useOnPage,
    } = this.props;
    const viewModel: ViewModel = new ViewModel(
      vehicles,
      close,
      isOpen,
      useOnPage,
      trackLicensePlateClick
    );

    return <View {...viewModel} />;
  }
}

export default Modal;
