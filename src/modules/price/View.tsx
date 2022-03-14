import { addStyleForMobile, addStyleForTablet } from '@vroom-web/ui-lib';
import getConfig from 'next/config';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import PriceViewModel from './ViewModel';

import NextSteps from 'src/components/NextSteps';
import PriceDetail from 'src/components/PriceDetail';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH;

interface Props {
  viewModel: PriceViewModel;
}

const PriceView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.onPageLoad();
  }, []);

  return (
    <HeroContainer>
      <PriceContainer>
        <PriceDetailContainer>
          <PriceDetail store={viewModel.store} />
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
  background-size: 100% 50%;
  background-repeat: no-repeat;
  background-image: url('${BASE_PATH}/images/offer-hero.png');
  width: 100%;

  @media (max-width: 768px) {
    background-size: 100% 200px;
    background-image: url('${BASE_PATH}/images/offer-hero.png');
  }
`;

const PriceContainer = styled.div`
  display: flex;
  margin: 40px auto;
  justify-content: center;
  position: relative;
  max-width: 1360px;
  padding: 0px 40px;

  ${addStyleForTablet(`
    flex-direction: column;
  `)}

  ${addStyleForMobile(`
    margin: 0;
    flex-direction: column;
    padding: 24px;
  `)}
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

export default PriceView;
