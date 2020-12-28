import { Body, Title } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

export interface BillingAddressProps {
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

const BillingAddress: React.FC<BillingAddressProps> = ({ data }) => {
  const {
    address: { name, address, cityStateZip },
  } = data;
  return (
    <Container>
      <TitleHeader>Billing address</TitleHeader>
      <Body.Regular>{name}</Body.Regular>
      <Body.Regular>{address}</Body.Regular>
      <Body.Regular>{cityStateZip}</Body.Regular>
    </Container>
  );
};

export default BillingAddress;
