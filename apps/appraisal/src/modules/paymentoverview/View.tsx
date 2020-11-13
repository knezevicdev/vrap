import React from 'react';
import styled from 'styled-components';

import PaymentOverviewViewModel from './ViewModel';

import { Hero } from 'src/core/Typography';

const PaymentOverview = styled.div`
  background: white;
  width: 379px;
  height: 100%;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 0px 4px #e0e0e0;

  @media (max-width: 768px) {
    width: 100%;
    margin: 20px 20px 0;
    padding: 30px 60px;
  }

  @media (max-width: 420px) {
    width: 100%;
    padding: 20px;
    margin: 0;
    box-shadow: none;
  }
`;

const StyledHero = styled(Hero.Five)`
  padding: 0 0 35px 0;
  text-align: left;
`;

export interface Props {
  viewModel: PaymentOverviewViewModel;
}

const PaymentOverviewView: React.FC<Props> = ({ viewModel }) => {
  return (
    <PaymentOverview>
      <StyledHero>{viewModel.hero}</StyledHero>
    </PaymentOverview>
  );
};

export default PaymentOverviewView;
