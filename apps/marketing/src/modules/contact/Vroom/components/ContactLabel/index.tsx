import React from 'react';

//import { PhoneNumberContext } from '../../../PhoneNumberContext';
import View from './View';
import ViewModel from './ViewModel';

const Contact: React.FC = () => {
  //const phoneNumber = useContext(PhoneNumberContext);
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} />;
};

export default Contact;
