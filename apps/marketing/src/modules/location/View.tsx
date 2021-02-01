import { Divider } from '@material-ui/core';
import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import ContactModule from '../locations/components/ContactModule';
import MarketingInfo from '../locations/components/MarketingInfo';
import { LocationInfo } from '../locations/getLocations';
import ContactInfo from './components/ContactInfo';
import Hero from './components/Hero';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();
interface Props {
  locationInfo: LocationInfo;
}

const LocationView: React.FC<Props> = ({ locationInfo }) => {
  const { name, mapsImgUrl, googleMapsUrl, closed } = locationInfo;
  return (
    <>
      <TDAHeader vroomUrl={VROOM_URL} />
      <Hero
        locationTitle={name}
        imgUrl={mapsImgUrl}
        googleMapsUrl={googleMapsUrl}
        closed={closed}
      />
      <ContactInfo locationInfo={locationInfo} />
      <MarketingInfo />
      <Divider />
      <ContactModule />
      <TDAFooter vroomUrl={VROOM_URL} />
    </>
  );
};

export default LocationView;
