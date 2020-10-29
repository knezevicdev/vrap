import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import React from 'react';

import ContactModule from '../components/ContactModule';
import MarketingInfo from '../components/MarketingInfo';
import { LocationInfo } from '../getLocations';
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
      <ContactModule />
      <TDAFooter />
    </>
  );
};

export default LocationView;
