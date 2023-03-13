import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import useMediaQuery from '../../hooks/useMediaQuery';
import PaymentOverviewViewModel from './ViewModel';

import { theme } from 'src/core/themes/Vroom';
import { Body, Hero, Title } from 'src/core/Typography';

const PaymentOverview = styled.div`
  background: white;
  width: 416px;
  height: 100%;
  box-shadow: 0px 0px 4px #e0e0e0;
  padding: 30px 16px 16px;

  @media (max-width: 1280px) {
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
  flex-direction: column;
  justify-content: center;
  margin-bottom: 32px;
  @media (min-width: 1280px) {
    margin-bottom: 8px;
  }
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

const CarInformationContainer = styled.div`
  margin-top: 32px;
`;

const CarModelDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CarModelDetailText = styled(Body.Regular)`
  font-weight: 400;
`;

const CarModelDetailDivide = styled(CarModelDetailText)`
  margin: 0 8px;
`;

const CarModelText = styled(Title.Two)`
  font-weight: 600;
`;

export interface Props {
  viewModel: PaymentOverviewViewModel;
}

const PaymentOverviewView: React.FC<Props> = ({ viewModel }) => {
  const isDesktop = useMediaQuery('desktop');
  return (
    <PaymentOverview>
      <OverviewHeader>
        <StyledHero>
          {isDesktop ? viewModel.desktopTitle : viewModel.mobileTitle}
        </StyledHero>
        {isDesktop && (
          <CarInformationContainer>
            {viewModel.carDetail.maker.length > 0 && (
              <div>
                <CarModelText>
                  {viewModel.carDetail.year} {viewModel.carDetail.maker}{' '}
                  {viewModel.carDetail.model}
                </CarModelText>
                <CarModelDetailContainer>
                  <CarModelDetailText>
                    {viewModel.carDetail.trim}
                  </CarModelDetailText>
                  <CarModelDetailDivide>|</CarModelDetailDivide>
                  <CarModelDetailText>
                    {viewModel.carDetail.miles} miles
                  </CarModelDetailText>
                </CarModelDetailContainer>
              </div>
            )}
            <Line />
          </CarInformationContainer>
        )}
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
