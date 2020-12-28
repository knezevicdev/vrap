import { Body, Title } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

export interface DeliveryAddressProps {
  data: {
    address: {
      name: string;
      address: string;
      cityStateZip: string;
    };
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleHeader = styled(Title.One)`
  margin-bottom: 8px;
`;

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ data }) => {
  const {
    address: { name, address, cityStateZip },
  } = data;

  return (
    <Container>
      <TitleHeader>Delivery address</TitleHeader>
      <Body.Regular>{name}</Body.Regular>
      <Body.Regular>{address}</Body.Regular>
      <Body.Regular>{cityStateZip}</Body.Regular>
    </Container>
  );
};

export default DeliveryAddress;
