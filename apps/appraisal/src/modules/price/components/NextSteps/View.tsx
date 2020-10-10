import React from 'react';
import styled from 'styled-components';
import NextStepsViewModel from './ViewModel';
import { Body, Hero, Title } from 'src/core/Typography';

const StyledContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
`;

const ColoredBullet = styled.div`
  margin: 0;
  padding: 0 30px;
  counter-increment: section;
  position: relative;
  border-left: 1px solid red;
  margin-left: 30px;

  &:before {
    content: counter(section);
    left: 0;
    position: absolute;
    border-radius: 50%;
    height: 18px;
    width: 18px;
    background-color: red;
    text-align: center;
    color: white;
  }

  &:last-child {
    border-left: 0;
  }
`;

export interface Props {
  viewModel: NextStepsViewModel;
}

const NextStepsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <Hero.Three>{viewModel.nextSteps}</Hero.Three>
      <div>
        <ColoredBullet>
          <Title.Three>{viewModel.verifyOwnership}</Title.Three>
          <Body.Regular>{viewModel.quicklyVerify}</Body.Regular>
        </ColoredBullet>
        <ColoredBullet>
          <Title.Three>{viewModel.freePickup}</Title.Three>
          <Body.Regular>{viewModel.scheduleATime}</Body.Regular>
        </ColoredBullet>
        <ColoredBullet>
          <Title.Three>{viewModel.wePickIt}</Title.Three>
          <Body.Regular>{viewModel.pickupYourVehicle}</Body.Regular>
        </ColoredBullet>
      </div>
    </StyledContainer>
  );
};

export default NextStepsView;
