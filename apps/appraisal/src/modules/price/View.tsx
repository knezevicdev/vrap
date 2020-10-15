import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

import InitialPrice from './components/InitialPrice';
import NextSteps from './components/NextSteps';
import PendingPrice from './components/PendingPrice';
import PriceViewModel from './ViewModel';

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

interface Props {
  viewModel: PriceViewModel;
}

const PriceView: React.FC<Props> = ({ viewModel }) => {
  return (
    <HeroContainer>
      <PriceContainer>
        <PriceDetailContainer>
          {viewModel.automatedAppraisal ? <InitialPrice /> : <PendingPrice />}
        </PriceDetailContainer>
        <NextStepsContainer>
          <NextSteps />
        </NextStepsContainer>
      </PriceContainer>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  background-size: 100% 50%;
  background-repeat: no-repeat;
  background-image: url('${BASE_PATH}/images/offer-hero.png');
`;

const PriceContainer = styled.div`
  display: flex;
  margin: 50px 100px;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 20px 40px;
  }

  @media (max-width: 320px) {
    flex-direction: column;
    margin: 20px;
  }
`;

const PriceDetailContainer = styled.div`
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  flex-basis: 60%;
  padding: 50px;
  z-index: 1;
`;

const NextStepsContainer = styled.div`
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  flex-basis: 40%;
  padding: 50px;
  z-index: 0;
`;

export default PriceView;
