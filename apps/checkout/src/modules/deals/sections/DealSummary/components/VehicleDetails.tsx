import { Body, Picture } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import { VehicleProps } from '../types';
import { buildPrice } from './buildPrice';

const Container = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
  max-width: 450px;
`;

const CarInfo = styled.div`
  display: grid;
  flex-direction: column;
`;

const Title = styled(Body.Regular)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
interface VehicleDetailsProps {
  vehicle: VehicleProps;
}
/**
 * Use vehicle information from the deal object
 * @param vehicle
 */
const VehicleDetails = ({ vehicle }: VehicleDetailsProps): JSX.Element => {
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
        width="100%"
        height="88px"
        objectFit="cover"
      />

      <CarInfo>
        <Title bold>{`${year} ${make} ${model}`}</Title>
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
