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
      <ColoredBullet>
        <StyledTitle>
          <Title.Three>{viewModel.verifyOwnership}</Title.Three>
        </StyledTitle>
        <StyledDiv>
          <Body.Regular>{viewModel.requestDocuments}</Body.Regular>
        </StyledDiv>
      </ColoredBullet>
      <ColoredBullet>
        <StyledTitle>
          <Title.Three>{viewModel.signContracts}</Title.Three>
        </StyledTitle>
        <StyledDiv>
          <Body.Regular>{viewModel.sendAnEmail}</Body.Regular>
        </StyledDiv>
      </ColoredBullet>
      <ColoredBullet>
        <StyledTitle>
          <Title.Three>{viewModel.wePickUp}</Title.Three>
        </StyledTitle>
        <StyledDiv>
          <Body.Regular>{viewModel.scheduleATime}</Body.Regular>
        </StyledDiv>
      </ColoredBullet>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
`;

const StyledHero = styled(Hero.Three)`
  padding: 0 0 35px 0;
  text-align: center;
`;

const ColoredBullet = styled.div`
  margin: 0;
  padding: 0 25px;
  counter-increment: section;
  position: relative;
  border-left: 1px solid #e7131a;
  margin-left: 20px;

  &:before {
    background-color: #e7131a;
    border-radius: 50%;
    color: white;
    content: counter(section);
    font-family: Calibre;
    height: 20px;
    left: -10px;
    position: absolute;
    text-align: center;
    width: 20px;
  }

  &:last-child {
    border-left: 0;
  }
`;

const StyledDiv = styled.div`
  padding: 0 0 20px 0;
`;

const StyledTitle = styled.div`
  top: -7px;
  position: relative;
`;

export default NextStepsView;
