import { Body, Icon, Icons } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import { buildPrice } from '../buildPrice';
import ToolTipLink from '../ToolTipLink';
import ViewModel from './ViewModel';

import CustomToolTip from 'src/modules/common/ToolTip';

const ToolTipContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RegularText = styled(Body.Regular)`
  margin-right: 8px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  margin-right: 8px;
`;

const Value = styled(Body.Regular)`
  text-align: right;
`;
interface Props {
  viewModel: ViewModel;
}

const View = ({ viewModel }: Props): JSX.Element => {
  const {
    products: { gapCoverage, tireAndWheelCoverage, vehicleServiceProtection },
    hasVehicleServiceinDeal,
    hasTireinDeal,
    hasGapinDeal,
  } = viewModel;

  return (
    <>
      {hasVehicleServiceinDeal() && (
        <Row>
          <LeftColumn>
            <ToolTipContainer>
              <RegularText>Vehicle Service Protection</RegularText>
              <CustomToolTip
                component={<Icon icon={Icons.FEEDBACK_QUESTION} />}
                tooltipText={
                  <ToolTipLink href="https://vroom.zendesk.com/hc/en-us/articles/205444915-What-is-Vroom-Protect-" />
                }
              />
            </ToolTipContainer>
            <Body.Small bold>{vehicleServiceProtection?.summary}</Body.Small>
          </LeftColumn>
          <Value>{buildPrice(vehicleServiceProtection?.cost)}</Value>
        </Row>
      )}

      {hasTireinDeal() && (
        <Row>
          <LeftColumn>
            <ToolTipContainer>
              <RegularText>Tire & Wheel Coverage</RegularText>
              <CustomToolTip
                component={<Icon icon={Icons.FEEDBACK_QUESTION} />}
                tooltipText={
                  <ToolTipLink href="https://vroom.zendesk.com/hc/en-us/articles/360033879711-What-is-Tire-Wheel-Protection-" />
                }
              />
            </ToolTipContainer>
            <Body.Small bold>{tireAndWheelCoverage?.summary}</Body.Small>
          </LeftColumn>
          <Value>{buildPrice(tireAndWheelCoverage?.cost)}</Value>
        </Row>
      )}

      {hasGapinDeal() && (
        <Row>
          <LeftColumn>
            <ToolTipContainer>
              <RegularText>GAP Coverage</RegularText>
              <CustomToolTip
                component={<Icon icon={Icons.FEEDBACK_QUESTION} />}
                tooltipText={
                  <ToolTipLink href="https://vroom.zendesk.com/hc/en-us/articles/204740399-What-does-GAP-protection-cover-" />
                }
              />
            </ToolTipContainer>
            <Body.Small bold>{gapCoverage?.summary}</Body.Small>
          </LeftColumn>
          <Value>{buildPrice(gapCoverage?.cost)}</Value>
        </Row>
      )}
    </>
  );
};

export default View;
