import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import PaymentOverviewViewModel from './ViewModel';

import { theme } from 'src/core/themes/Vroom';
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

const StyledHero = styled(Hero.Three)`
  text-align: center;
  font-style: italic;
  font-weight: 800;
  font-size: 35px;
  padding: 0 40px;
`;

const OverviewHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

const OverviewBody = styled.div``;

const Line = styled.hr`
  margin: 10px 0;
`;

const OverviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
`;

const PaymentOverviewBody = styled(Title.Three)`
  font-weight: 600;
  line-height: 24px;
`;

const PaymentOverviewPrice = styled(Body.Regular)`
  font-weight: 600;
  font-size: 18px;
`;

const TotalBody = styled(Title.Two)`
  font-weight: 600;
`;

const TotalPrice = styled(Title.Two)`
  font-weight: 600;
  color: ${theme.colors.primary.brand};
`;

export interface Props {
  viewModel: PaymentOverviewViewModel;
}

const PaymentOverviewView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: false });
  return (
    <PaymentOverview>
      <OverviewHeader>
        <StyledHero>
          {isDesktop ? viewModel.desktopTitle : viewModel.mobileTitle}
        </StyledHero>
      </OverviewHeader>
      <OverviewBody>
        <OverviewRow>
          <PaymentOverviewBody>{viewModel.carWorth}</PaymentOverviewBody>
          <PaymentOverviewPrice>{viewModel.carWorthPrice}</PaymentOverviewPrice>
        </OverviewRow>
        <OverviewRow>
          <PaymentOverviewBody>{viewModel.remainingLoan}</PaymentOverviewBody>
          <PaymentOverviewBody>
            {viewModel.remainingLoanBalance}
          </PaymentOverviewBody>
        </OverviewRow>
        <Line />
        <OverviewRow>
          <TotalBody>{viewModel.total}</TotalBody>
          <TotalPrice>{viewModel.totalPrice}</TotalPrice>
        </OverviewRow>
      </OverviewBody>
    </PaymentOverview>
  );
};

export default observer(PaymentOverviewView);
