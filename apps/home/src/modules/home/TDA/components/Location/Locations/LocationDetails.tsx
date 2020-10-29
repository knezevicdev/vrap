import { styled } from '@material-ui/core';
import React, { FC } from 'react';

import Map from '../Map/Map';
import { LocationInfo } from './ViewModel';

interface LocationDetailsProps {
  location: LocationInfo;
}

const Container = styled('div')(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
}));

const MapContainer = styled('div')(() => ({
  height: '192px',
  flex: '0 0 192px',
}));

const TextColumn = styled('div')(() => ({
  paddingLeft: '10px',
}));

const SubtitleLink = styled('a')(() => ({
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: '0.25px',
  marginBottom: '8px',
  color: '#E7131A',
  textDecoration: 'none',
}));

const Description = styled('div')(() => ({
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '24px',
  letterSpacing: '0.25px',
  marginBottom: '8px',
}));

const Bold = styled('span')(() => ({
  fontWeight: 600,
}));

const AddressLink = styled('a')(() => ({
  color: 'black',
}));

const LocationDetails: FC<LocationDetailsProps> = ({
  location: { locationInfo, phone, title, urlPath, googleMapsUrl },
}) => {
  return (
    <Container>
      <MapContainer>
        <Map coords={locationInfo.coords} />
      </MapContainer>
      <TextColumn>
        <SubtitleLink href={urlPath}>{title}</SubtitleLink>
        <Description>
          <AddressLink href={googleMapsUrl} target="_blank">
            {locationInfo.address}
          </AddressLink>
        </Description>
        <Description>
          <Bold>Office: </Bold>
          {phone.office}
        </Description>
        <Description>
          <Bold>Fax: </Bold>
          {phone.fax}
        </Description>
      </TextColumn>
    </Container>
  );
};

export default LocationDetails;
