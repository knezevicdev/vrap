import React from 'react';

import { LocationInfo } from '../locations/getLocations';
import View from './View';

interface Props {
  locationInfo: LocationInfo;
}
const Locations: React.FC<Props> = ({ locationInfo }) => {
  return <View locationInfo={locationInfo} />;
};

export default Locations;
