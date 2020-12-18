import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import PriceViewModel from './ViewModel';

import InitialPrice from 'src/components/InitialPrice';
import LoadingPrice from 'src/components/LoadingPrice';
import NextSteps from 'src/components/NextSteps';
import PendingPrice from 'src/components/PendingPrice';
import ENVS from 'src/integrations/Envs';

interface Props {
  viewModel: PriceViewModel;
}

const PriceView: React.FC<Props> = ({ viewModel }) => {
  let priceView;

  switch (viewModel.getStatus()) {
    case 'success':
      if (viewModel.getAutomated()) {
        priceView = <InitialPrice store={viewModel.store} />;
      } else {
        priceView = <PendingPrice />;
      }
      break;
    case 'error':
      priceView = <PendingPrice />;
      break;
    default:
      priceView = <LoadingPrice />;
  }

  return (
    <HeroContainer>
      <PriceContainer>
        <PriceDetailContainer>{priceView}</PriceDetailContainer>
        <NextStepsContainer>
          <NextSteps />
        </NextStepsContainer>
      </PriceContainer>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  background-color: #f5f5f5;
  background-size: 100% 50%;
  background-repeat: no-repeat;
  background-image: url('${ENVS.BASE_PATH}/images/offer-hero.png');
  width: 100%;

  @media (max-width: 768px) {
    background-size: 100% 200px;
    background-image: url('${ENVS.BASE_PATH}/images/offer-hero.png');
  }
`;

const PriceContainer = styled.div`
  display: flex;
  margin: 50px 100px;
  justify-content: center;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
    margin: 20px 40px;
  }

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const NextStepsContainer = styled.div`
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  flex-basis: 40%;
  padding: 50px;
  z-index: 0;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

export default observer(PriceView);
