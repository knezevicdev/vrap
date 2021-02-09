import { Body, Picture } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import { VehicleProps } from '../types';
import { buildPrice } from './buildPrice';

const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

const CarInfo = styled.div`
  margin-left: 16px;
  display: grid;
  flex-direction: column;
`;

const VehicleDetails = (vehicle: VehicleProps): JSX.Element => {
  const {
    vehicle: { year, make, model },
    trim,
    miles,
    leadPhotoURL,
    listingPrice,
  } = vehicle;

  return (
    <Container>
      <Picture
        alt={`${make} ${model}`}
        src={leadPhotoURL || ''}
        width="110px"
        height="80px"
        objectFit="contain"
      />

      <CarInfo>
        <Body.Regular bold>{`${year} ${make} ${model}`}</Body.Regular>
        <Body.Small>{trim}</Body.Small>
        <Body.Small>
          {miles ? `${miles.toLocaleString()} miles` : `-`}
        </Body.Small>
        <Body.Regular bold>{buildPrice(listingPrice)}</Body.Regular>
      </CarInfo>
    </Container>
  );
};

export default VehicleDetails;
