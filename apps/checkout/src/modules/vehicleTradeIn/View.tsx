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
import Modal from './components/Trade/components/Vin/Modal';
import VehicleTradeInViewModel from './ViewModel';

const Page = styled.div`
  display: grid;
  justify-items: center;
  padding-top: 62px;
  padding-bottom: 64px;
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
  font-display: swap;
`;

const IconButton = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
interface Props {
  viewModel: VehicleTradeInViewModel;
}

const VehicleTradeInView: React.FC<Props> = ({ viewModel }) => {
  const {
    isOpen,
    closeDialog,
    openDialog,
    trackLicensePlateClick,
    trackVinClick,
    trackInitialAnalytics,
    onStepBack,
  } = viewModel;

  trackInitialAnalytics();

  return (
    <Page>
      <Modal isOpen={isOpen} close={closeDialog} />
      <ComponentTitle>your trade-in information</ComponentTitle>
      <SubTitle>
        Start by entering your license plate or VIN{' '}
        <IconButton onClick={openDialog}>
          <Icon icon={Icons.FEEDBACK_QUESTION} />
        </IconButton>
      </SubTitle>
      <Trade
        trackLicensePlateClick={trackLicensePlateClick}
        trackVinClick={trackVinClick}
        onStepBack={onStepBack}
      />
    </Page>
  );
};

export default observer(VehicleTradeInView);
