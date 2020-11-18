import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { MailingAddress } from 'src/interfaces.d';

interface Props {
  mailingAddress: MailingAddress;
}

const CheckByMail: React.FC<Props> = ({ mailingAddress }) => {
  const viewModel = new ViewModel();
  return <View mailingAddress={mailingAddress} viewModel={viewModel} />;
};

export default CheckByMail;
