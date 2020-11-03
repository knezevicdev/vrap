import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { LocationInfo } from 'src/modules/locations/getLocations';

interface Props {
  locationInfo: LocationInfo;
}
const ContactInfoModule: React.FC<Props> = ({ locationInfo }) => {
  const viewModel = new ViewModel(locationInfo);
  return <View viewModel={viewModel} />;
};

export default ContactInfoModule;
