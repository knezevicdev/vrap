import { Divider } from '@material-ui/core';
import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import React from 'react';

import ContactModule from '../locations/components/ContactModule';
import MarketingInfo from '../locations/components/MarketingInfo';
import { LocationInfo } from '../locations/getLocations';
import ContactInfo from './components/ContactInfo';
import Hero from './components/Hero';

interface Props {
  locationInfo: LocationInfo;
}

const LocationView: React.FC<Props> = ({ locationInfo }) => {
  const { name, mapsImgUrl, googleMapsUrl } = locationInfo;
  return (
    <>
      <TDAHeader />
      <Hero
        locationTitle={name}
        imgUrl={mapsImgUrl}
        googleMapsUrl={googleMapsUrl}
      />
      <ContactInfo locationInfo={locationInfo} />
      <MarketingInfo />
      <Divider />
      <ContactModule />
      <TDAFooter />
    </>
  );
};

export default LocationView;
