import GoogleMapReact, { Coords } from 'google-map-react';
import getConfig from 'next/config';
import React, { FC } from 'react';

import MarkerIcon from './MarkerIcon';

interface MapProps {
  coords: Coords;
}

const {
  publicRuntimeConfig: { GOOGLE_MAPS_API_KEY },
} = getConfig();

const Map: FC<MapProps> = ({ coords }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        defaultZoom={13}
      >
        <MarkerIcon lat={coords.lat} lng={coords.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
