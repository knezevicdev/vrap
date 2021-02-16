import {
  Body,
  Picture,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import { buildPrice } from './components/buildPrice';
import { GQLTypes } from '@vroom-web/networking';

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const CarInfo = styled.div`
  margin: 16px;
  display: grid;
  grid-template-rows: 1fr;
  gap: 8px;
`;

const Divider = styled(Body.Regular)`
  color: ${grayThree};
`;

interface Props {
  vehicle: GQLTypes.InvSearchVehicleData;
}

const SelectedCar = ({ vehicle }: Props): JSX.Element => {
  const {
    year, 
    make, 
    model,
    trim,
    miles,
    leadPhotoUrl,
    listingPrice,
  } = vehicle;

  return (
    <>
      <Picture
        alt={`${make} ${model}`}
        src={leadPhotoUrl || ''}
        width="100%"
        height="260px"
        objectFit="cover"
      />

      <CarInfo>
        <Title.Two>{`${year} ${make} ${model}`}</Title.Two>
        <Body.Regular>
          {trim} <Divider>|</Divider> {miles ? miles.toLocaleString() : `-`}{' '}
          miles
        </Body.Regular>
        <Title.Two>{buildPrice(listingPrice)}</Title.Two>
      </CarInfo>
    </>
  );
};

export default SelectedCar;
