import { Body, Icon, Icons } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import { buildPrice } from '../buildPrice';
import ToolTipLink from '../ToolTipLink';

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
import ViewModel from './ViewModel';

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
        <div>
          <Row>
            <ToolTipContainer>
              <RegularText>Vehicle Service Protection</RegularText>
              <CustomToolTip
                component={<Icon icon={Icons.FEEDBACK_QUESTION} />}
                tooltipText={
                  <ToolTipLink href="https://vroom.zendesk.com/hc/en-us/articles/205444915-What-is-Vroom-Protect-" />
                }
              />
            </ToolTipContainer>
            <Body.Regular>
              {buildPrice(vehicleServiceProtection?.cost)}
            </Body.Regular>
          </Row>
          <Body.Small bold>{vehicleServiceProtection?.summary}</Body.Small>
        </div>
      )}

      {hasTireinDeal() && (
        <div>
          <Row>
            <ToolTipContainer>
              <RegularText>Tire & Wheel Coverage</RegularText>
              <CustomToolTip
                component={<Icon icon={Icons.FEEDBACK_QUESTION} />}
                tooltipText={
                  <ToolTipLink href="https://vroom.zendesk.com/hc/en-us/articles/360033879711-What-is-Tire-Wheel-Protection-" />
                }
              />
            </ToolTipContainer>
            <Body.Regular>
              {buildPrice(tireAndWheelCoverage?.cost)}
            </Body.Regular>
          </Row>
          <Body.Small bold>{tireAndWheelCoverage?.summary}</Body.Small>
        </div>
      )}

      {hasGapinDeal() && (
        <div>
          <Row>
            <ToolTipContainer>
              <RegularText>GAP Coverage</RegularText>
              <CustomToolTip
                component={<Icon icon={Icons.FEEDBACK_QUESTION} />}
                tooltipText={
                  <ToolTipLink href="https://vroom.zendesk.com/hc/en-us/articles/204740399-What-does-GAP-protection-cover-" />
                }
              />
            </ToolTipContainer>
            <Body.Regular>{buildPrice(gapCoverage?.cost)}</Body.Regular>
          </Row>
          <Body.Small bold>{gapCoverage?.summary}</Body.Small>
        </div>
      )}
    </>
  );
};

export default View;
