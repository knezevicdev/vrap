import {
  Body,
  Picture,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import { VehicleProps } from './types';

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const Container = styled.div`
  box-shadow: 0 0 4px 0 #00000014;
  display: inline-flex;
  flex-direction: column;
`;

const CarInfo = styled.div`
  margin: 16px;
  display: grid;
  grid-template-rows: 1fr;
  gap: 8px;
`;

const Divider = styled(Body.Regular)`
  color: ${grayThree};
`;

const SelectedCar = (props: VehicleProps): JSX.Element => {
  const {
    vehicle: { year, make, model },
    trim,
    miles,
    leadPhotoURL,
    listingPrice,
  } = props;

  return (
    <Container>
      <Picture
        alt={`${make} ${model}`}
        src={leadPhotoURL || ''}
        width="410px"
        height="310px"
        objectFit="contain"
      />

      <CarInfo>
        <Title.Two>{`${year} ${make} ${model}`}</Title.Two>
        <Body.Regular>
          {trim} <Divider>|</Divider> {miles ? miles.toLocaleString() : `-`}{' '}
          miles
        </Body.Regular>
        <Title.Two>{listingPrice}</Title.Two>
      </CarInfo>
    </Container>
  );
};

export default SelectedCar;
