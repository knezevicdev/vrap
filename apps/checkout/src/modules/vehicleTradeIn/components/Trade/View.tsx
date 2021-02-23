import {
  addStyleForMobile,
  addStyleForTablet,
  Body,
  ThemeProps,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import LicensePlate from './components/LicensePlate';
import Vin from './components/Vin';

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  margin: 0 auto;
  max-width: 416px;

  ${addStyleForTablet(`
    width: 100%;
    margin: 0px 10px 0px 10px;
  `)}

  ${addStyleForMobile(`
    width: 100%;
    margin: 0px 10px 0px 10px;
  `)}
`;

const TabContainer = styled.div`
  display: flex;
  margin-top: 44px;
`;

const Tab = styled(Body.Regular)<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  max-height: 48px;
  min-width: 50%;
  max-width: 50%;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  cursor: pointer;
  ${(props): string | false =>
    props.selected && `color: ${primaryBrand(props)}`};
  font-weight: 600;
`;

const BarContainer = styled.div`
  display: flex;
  position: relative;
  min-height: 2px;
  max-height: 2px;
  background: ${grayThree};
  margin-bottom: 16px;
`;

const Bar = styled.div<{ left: boolean }>`
  min-width: 50%;
  max-width: 50%;
  background: red;
  position: absolute;
  min-height: 2px;
  max-height: 2px;
  ${(props): string => (props.left ? `left: 0;` : 'left: 50%;')}
`;

export interface TradeProps {
  onLicensePlateClick: () => void;
  onVinClick: () => void;
  isLicensePlateActive: () => boolean;
  isVinActive: () => boolean;
  showLicensePlate: () => boolean;
  trackLicensePlateClick?: () => void;
  trackVinClick?: () => void;
}

const Trade: React.FC<TradeProps> = ({
  onLicensePlateClick,
  onVinClick,
  isLicensePlateActive,
  isVinActive,
  showLicensePlate,
  trackLicensePlateClick,
  trackVinClick, 
}): JSX.Element => { 
  const licensePlateSelected = isLicensePlateActive();
  const vinSelected = isVinActive();

  return (
    <Container>
      <TabContainer>
        <Tab selected={licensePlateSelected} onClick={onLicensePlateClick}>
          License Plate
        </Tab>
        <Tab selected={vinSelected} onClick={onVinClick}>
          Vin
        </Tab>
      </TabContainer>
      <BarContainer>
        <Bar left={licensePlateSelected} />
      </BarContainer>
      {showLicensePlate() ? (
        <LicensePlate trackLicensePlateClick={trackLicensePlateClick} />
      ) : (
        <Vin trackVinClick={trackVinClick} />
      )}
    </Container>
  );
};

export default observer(Trade);
