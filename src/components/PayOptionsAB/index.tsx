import React from 'react';

import { useOptionsStore } from '../../modules/optionsAB/store';
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
  const oStore = useOptionsStore();
  const viewModel = new ViewModel(oStore);

  return <View viewModel={viewModel} {...props} />;
};

export default PayOptions;
