import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { MailingAddress } from 'src/interfaces.d';

export type Props = {
  mailingAddress: MailingAddress;
  isPrimaryAddress: string;
  setFieldValue: (field: string, value: string) => void;
  state: string;
};

const CheckByMail: React.FC<Props> = (props) => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} {...props} />;
};

export default CheckByMail;
