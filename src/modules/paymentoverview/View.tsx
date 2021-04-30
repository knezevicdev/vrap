import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';

import PaymentOverviewViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero, Title } from 'src/core/Typography';

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

const StyledHero = styled(Hero.Five)`
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

const PaymentOverviewBody = styled(Body.Regular)``;

const PaymentOverviewPrice = styled(Body.Regular)`
  font-weight: 600;
`;

const TotalBody = styled(Title.Two)`
  font-weight: 600;
`;

const TotalPrice = styled(Title.Two)`
  font-weight: 600;
`;

export interface Props {
  viewModel: PaymentOverviewViewModel;
}

const PaymentOverviewView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: false });
  const [isExpanded, setIsExpanded] = useState<boolean>(isDesktop);

  const handleToggle = (): void => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <PaymentOverview>
      <OverviewHeader>
        <StyledHero>{viewModel.hero}</StyledHero>
        {!isDesktop && (
          <OverviewExpand onClick={handleToggle}>
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