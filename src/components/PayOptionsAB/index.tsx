import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { MailingAddress } from 'src/interfaces.d';

interface Props {
  selected: string;
  mailingAddress: MailingAddress;
  isPrimaryAddress: string;
  setFieldValue: (field: string, value: string) => void;
  state: string;
  instituteNotFound: boolean;
}

const PayOptions: React.FC<Props> = (props) => {
  const viewModel = new ViewModel();

  return <View viewModel={viewModel} {...props} />;
};

export default PayOptions;
