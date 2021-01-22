import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { MailingAddress } from 'src/interfaces.d';

export type Props = {
  mailingAddress: MailingAddress;
  isPrimaryAddress: string;
  address: string;
  apartment: string;
  city: string;
  zip: string;
}

const CheckByMail: React.FC<Props> = ({
  mailingAddress,
  isPrimaryAddress,
  address,
  apartment,
  city,
  zip,
}) => {
  const viewModel = new ViewModel();
  return (
    <View
      mailingAddress={mailingAddress}
      isPrimaryAddress={isPrimaryAddress}
      viewModel={viewModel}
      address={address}
      apartment={apartment}
      city={city}
      zip={zip}
    />
  );
};

export default CheckByMail;
