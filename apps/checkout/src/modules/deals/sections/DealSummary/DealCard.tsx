import { Heading, ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import DealDetails from './components/DealDetails';
import VehicleDetails from './components/VehicleDetails';
import { DealSummaryProps } from './types';

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Container = styled.div`
  box-shadow: 0 0 4px 0 #00000014;
  padding: 24px 24px 40px 24px;
  background: ${primaryWhite};
  max-width: 410px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const DealSummary = ({
  vehicle,
  deal,
  trades,
}: DealSummaryProps): JSX.Element => {
  return (
    <Container>
      <Content>
        <Heading.Four>Purchase summary</Heading.Four>
        <VehicleDetails {...vehicle} />
        <DealDetails deal={deal} trades={trades} />
      </Content>
    </Container>
  );
};

export default DealSummary;
