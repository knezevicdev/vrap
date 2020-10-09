import React from 'react';
import styled from 'styled-components';

import InitialPrice from './components/InitialPrice';
import NextSteps from './components/NextSteps';
import PriceViewModel, { PriceStatus } from './ViewModel';

interface Props {
  viewModel: PriceViewModel;
}

const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
`;

const PriceContainer = styled.div`
  border: 1px solid;
  display: flex;
  justify-content: space-between;
`;

const PriceView: React.FC<Props> = ({ viewModel }) => {
  let priceComponent = <InitialPrice />;

  switch (viewModel.priceStatus) {
    case PriceStatus.INITIAL:
      priceComponent = <InitialPrice />;
      break;
  }

  return (
    <BackgroundContainer>
      <PriceContainer>
        {priceComponent}
        <NextSteps />
      </PriceContainer>
    </BackgroundContainer>
  );
};

export default PriceView;
