import { Car } from '@vroom-web/inv-search-networking';
import React from 'react';

import LoadingCard from '../../Loading';
import { EmailCaptureStore } from './store';
import View from './View';
import EmailCaptureCardViewModel from './ViewModel';

interface EmailCaptureCardProps {
  car: Car | undefined;
}

class EmailCaptureCard extends React.Component<EmailCaptureCardProps> {
  viewModel: EmailCaptureCardViewModel;

  constructor(props: EmailCaptureCardProps) {
    super(props);
    const emailCaptureStore = new EmailCaptureStore();
    this.viewModel = new EmailCaptureCardViewModel(emailCaptureStore);
  }

  render(): React.ReactNode {
    const car = this.props.car;
    if (!car) {
      return <LoadingCard />;
    }
    return <View viewModel={this.viewModel} />;
  }
}
export default EmailCaptureCard;
