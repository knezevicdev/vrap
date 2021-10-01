import React from 'react';
import styled from 'styled-components';

import NextStepsViewModel from './ViewModel';

import { Body, Hero, Title } from 'src/core/Typography';

export interface Props {
  viewModel: NextStepsViewModel;
}

const NextStepsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <StyledHero>{viewModel.nextSteps}</StyledHero>
      {viewModel.nextStepsAB.map((item, i) => {
        return (
          <NextItemContainer key={i}>
            <NextStepTitle>{item.title}</NextStepTitle>
            <NextStepText>{item.description}</NextStepText>
          </NextItemContainer>
        );
      })}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  max-width: 460px;
  width: 100%;
`;

const StyledHero = styled(Hero.Two)`
  text-align: center;
  font-weight: 800;
  font-size: 48px;
  line-height: 48px;
  color: #e7131a;
  margin-bottom: 32px;
  @media (max-width: 420px) {
    font-size: 36px;
    line-height: 40px;
  }
`;

const NextItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const NextStepTitle = styled(Title.Two)`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 8px;
`;

const NextStepText = styled(Body.Regular)`
  font-size: 18px;
  line-height: 24px;
`;

export default NextStepsView;
