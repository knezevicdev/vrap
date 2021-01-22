import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { MailingAddress } from 'src/interfaces.d';

interface Props {
  mailingAddress: MailingAddress;
  isPrimaryAddress: string;
}

const CheckByMail: React.FC<Props> = ({ mailingAddress, isPrimaryAddress }) => {
  const viewModel = new ViewModel();
  return (
    <View
      mailingAddress={mailingAddress}
      isPrimaryAddress={isPrimaryAddress}
      viewModel={viewModel}
    />
  );
};

export default CheckByMail;
