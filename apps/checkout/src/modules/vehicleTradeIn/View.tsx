import {
  addStyleForMobile,
  Heading,
  Icon,
  Icons,
  Typography,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import Trade from './components/Trade';
import VehicleTradeInViewModel from './ViewModel';

const Page = styled.div`
  display: grid;
  justify-items: center;
  padding-top: 62px;
  padding-bottom: 65px;
  row-gap: 8px;
  grid-template-rows: auto 24px auto;

  ${addStyleForMobile(`
    padding: 8px;
  `)}
`;

const SubTitle = styled(Typography.Body.Regular)`
  display: grid;
  grid-template-columns: auto 16px;
  grid-gap: 8px;
  align-items: center;
`;

const ComponentTitle = styled(Heading.Three)`
  text-align: center;
`;

interface Props {
  viewModel: VehicleTradeInViewModel;
}

const VehicleTradeInView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Page>
      <ComponentTitle>your trade-in information</ComponentTitle>
      <SubTitle>
        Start by entering your license plate or VIN{' '}
        <Icon icon={Icons.FEEDBACK_QUESTION} />
      </SubTitle>
      <Trade />
    </Page>
  );
};

export default observer(VehicleTradeInView);
