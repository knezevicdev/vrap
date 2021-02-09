import { Heading } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import DealDetails from './components/DealDetails';
import VehicleDetails from './components/VehicleDetails';
import { DealSummaryProps } from './types';

const Content = styled.div`
  padding: 24px 24px 40px 24px;
  display: flex;
  flex-direction: column;
`;

const DealSummary = ({
  vehicle,
  deal,
  trades,
}: DealSummaryProps): JSX.Element => {
  return (
    <Content>
      <Heading.Four>Purchase summary</Heading.Four>
      <VehicleDetails {...vehicle} />
      <DealDetails deal={deal} trades={trades} />
    </Content>
  );
};

export default DealSummary;
