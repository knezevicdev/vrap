import { ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import VehicleTradeInViewModel from './ViewModel';

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  background: ${primaryWhite};
`;

interface Props {
  viewModel: VehicleTradeInViewModel;
}

const VehicleTradeInView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Page>
      {viewModel.dealId} <br />
      This is the Vehicle Trade View Component
    </Page>
  );
};

export default observer(VehicleTradeInView);
