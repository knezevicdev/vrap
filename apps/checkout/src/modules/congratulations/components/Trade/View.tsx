import {
  Body,
  Heading,
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
  max-width: 416px;
  width: 100%;
`;

const TabContainer = styled.div`
  display: flex;
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
  min-height: 4px;
  max-height: 4px;
  background: ${grayThree};
  margin-bottom: 16px;
`;

const Bar = styled.div<{ left: boolean }>`
  min-width: 50%;
  max-width: 50%;
  background: red;
  position: absolute;
  min-height: 4px;
  max-height: 4px;
  ${(props): string => (props.left ? `left: 0;` : 'left: 50%;')}
`;

const ComponentTitle = styled(Heading.Two)`
  text-align: center;
  margin-bottom: 32px;
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
      <ComponentTitle>Ready to trade in?</ComponentTitle>
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
