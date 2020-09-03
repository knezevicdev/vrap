import React, { useContext } from 'react';

import { PhoneNumberContext } from '../../../PhoneNumberContext';
import View from './View';
import ViewModel from './ViewModel';

const Contact: React.FC = () => {
  const phoneNumber = useContext(PhoneNumberContext);
  const viewModel = new ViewModel(phoneNumber);
  return <View viewModel={viewModel} />;
};

export default Contact;
