import React from 'react';
import styled from 'styled-components';

import LoadingPriceViewModel from './ViewModel';

import { Body, Hero } from 'src/core/Typography';
interface Props {
  viewModel: LoadingPriceViewModel;
}

const LoadingPriceView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <Hero.Four>{viewModel.loading}</Hero.Four>

      <StyledBody>
        <Body.Regular>{viewModel.pleaseWait}</Body.Regular>
      </StyledBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
`;

const StyledBody = styled.div`
  margin: auto;
  padding: 30px;
`;

export default LoadingPriceView;
