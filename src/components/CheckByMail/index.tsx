import React from 'react';

import View from './View';

import { MailingAddress } from 'src/interfaces.d';

export type Props = {
  mailingAddress: MailingAddress;
  isPrimaryAddress: string;
  setFieldValue: (field: string, value: string) => void;
  state: string;
};

const CheckByMail: React.FC<Props> = (props) => {
  return <View {...props} />;
};

export default CheckByMail;
