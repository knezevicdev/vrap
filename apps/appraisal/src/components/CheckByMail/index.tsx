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

const CheckByMail: React.FC<Props> = ({
  mailingAddress,
  isPrimaryAddress,
  setFieldValue,
  state,
}) => {
  const viewModel = new ViewModel();
  return (
    <View
      mailingAddress={mailingAddress}
      isPrimaryAddress={isPrimaryAddress}
      setFieldValue={setFieldValue}
      viewModel={viewModel}
      state={state}
    />
  );
};

export default CheckByMail;
