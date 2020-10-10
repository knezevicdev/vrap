import InitialPrice from './components/InitialPrice';
import NextSteps from './components/NextSteps';
import PriceViewModel, { PriceStatus } from './ViewModel';
import React from 'react';
import getConfig from 'next/config';
import styled from 'styled-components';

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

interface Props {
  viewModel: PriceViewModel;
}

const HeroContainer = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  background-size: 100% 50%;
  background-repeat: no-repeat;
  background-image: url('${BASE_PATH}/images/offer-hero.png');
`;

const PriceContainer = styled.div`
  display: flex;
  margin: 50px;
  justify-content: center;
  position: relative;
`;

const PriceDetailContainer = styled.div`
	flex-basis: 60%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  margin: 10px;
`;

const NextStepsContainer = styled.div`
	flex-basis: 40%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  margin: 10px;
`;

const PriceView: React.FC<Props> = ({ viewModel }) => {
  let priceComponent = <InitialPrice />;

  switch (viewModel.priceStatus) {
    case PriceStatus.INITIAL:
      priceComponent = <InitialPrice />;
      break;
  }

  return (
    <HeroContainer>
      <PriceContainer>
        <PriceDetailContainer>
          {priceComponent}
        </PriceDetailContainer>
        <NextStepsContainer>
          <NextSteps />
        </NextStepsContainer>
      </PriceContainer>
    </HeroContainer>
  );
};

export default PriceView;
