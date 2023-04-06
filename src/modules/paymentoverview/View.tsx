import { Icon, Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';

import useMediaQuery from '../../hooks/useMediaQuery';
import PaymentOverviewViewModel from './ViewModel';

import { Icons } from 'src/core/Icon';

const PaymentOverview = styled.div`
  background: white;
  width: 379px;
  height: 100%;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 4px #e0e0e0;
  padding: 30px 16px 16px;

  @media (max-width: 1280px) {
    width: 100%;
    margin: 20px 20px 0;
    padding: 20px;
  }

  @media (max-width: 420px) {
    width: 100%;
    margin: 0;
    box-shadow: none;
  }
`;

const StyledHero = styled(Typography.Heading.Four)`
  font-size: 28px;
  padding: 0 0 8px 0;
  text-align: left;
`;

const OverviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OverviewBody = styled.div``;

const OverviewExpand = styled.div`
  margin: auto 0;
`;

const ExpandArrowUp = styled(Icon)``;
const ExpandArrowDown = styled(Icon)``;

const Line = styled.hr`
  margin: 16px 0;
`;

const OverviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
`;

const PaymentOverviewBody = styled(Typography.Body.Regular)``;

const PaymentOverviewPrice = styled(Typography.Body.Regular)`
  font-weight: 600;
`;

const TotalBody = styled(Typography.Title.Two)`
  font-weight: 600;
`;

const TotalPrice = styled(Typography.Title.Two)`
  font-weight: 600;
`;

export interface Props {
  viewModel: PaymentOverviewViewModel;
}

const PaymentOverviewView: React.FC<Props> = ({ viewModel }) => {
  const isDesktop = useMediaQuery('desktop');
  const [isExpanded, setIsExpanded] = useState<boolean>(isDesktop);

  const handleToggle = (): void => setIsExpanded((isExpanded) => !isExpanded);
  const handleToggleKeyDown = (event: any): void => {
    if (event.key === 'Enter') {
      setIsExpanded((isExpanded) => !isExpanded);
    }
  };

  return (
    <PaymentOverview>
      <OverviewHeader>
        <StyledHero>{viewModel.hero}</StyledHero>
        {!isDesktop && (
          <OverviewExpand
            role="button"
            tabIndex={0}
            onClick={handleToggle}
            onKeyDown={handleToggleKeyDown}
          >
            {isExpanded ? (
              <ExpandArrowUp icon={Icons.CHEVRON_UP} />
            ) : (
              <ExpandArrowDown icon={Icons.CHEVRON_DOWN} />
            )}
          </OverviewExpand>
        )}
      </OverviewHeader>
      {(isDesktop || isExpanded) && (
        <OverviewBody>
          <Line />
          <OverviewRow>
            <PaymentOverviewBody>{viewModel.carWorth}</PaymentOverviewBody>
            <PaymentOverviewPrice>
              {viewModel.carWorthPrice}
            </PaymentOverviewPrice>
          </OverviewRow>
          <OverviewRow>
            <PaymentOverviewBody>{viewModel.remainingLoan}</PaymentOverviewBody>
            <PaymentOverviewPrice>
              {viewModel.remainingLoanBalance}
            </PaymentOverviewPrice>
          </OverviewRow>
          <Line />
          <OverviewRow>
            <TotalBody>{viewModel.total}</TotalBody>
            <TotalPrice>{viewModel.totalPrice}</TotalPrice>
          </OverviewRow>
        </OverviewBody>
      )}
    </PaymentOverview>
  );
};

export default observer(PaymentOverviewView);
