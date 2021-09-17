import React from 'react';
import styled from 'styled-components';

import PriceViewModel from './ViewModel';

import NextSteps from 'src/components/NextSteps';
import PriceDetail from 'src/components/PriceDetail';
import Icon, { Icons } from 'src/core/Icon';

interface Props {
  viewModel: PriceViewModel;
}

const PriceView: React.FC<Props> = ({ viewModel }) => {
  return (
    <PriceContainer>
      <PriceDetailContainer>
        <PriceDetail store={viewModel.store} />
      </PriceDetailContainer>
      <NextStepsContainer>
        <NextSteps />
      </NextStepsContainer>
      <IconContainer>
        <Icon icon={Icons.VROOM_TRUCK} />
      </IconContainer>
    </PriceContainer>
  );
};

const PriceContainer = styled.div`
  display: flex;
  margin: 50px 100px;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;

  @media (max-width: 1024px) {
    margin: 20px 40px;
  }

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

const PriceDetailContainer = styled.div`
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  padding: 32px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 650px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 24px;
    margin-top: 8px;
  }
`;

const NextStepsContainer = styled.div`
  padding: 64px 50px;
  z-index: 0;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
  @media (max-width: 420px) {
    padding: 48px 0 64px 0;
  }
`;

const IconContainer = styled.div`
  @media (max-width: 620px) {
    position: relative;
    height: 250px;
    width: 100%;
    overflow: hidden;
    > img {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

export default PriceView;
