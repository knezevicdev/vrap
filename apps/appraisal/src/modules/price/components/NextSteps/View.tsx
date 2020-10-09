import { styled } from '@material-ui/core/styles';
import { Container } from '@vroom-web/ui';
import React from 'react';

import NextStepsViewModel from './ViewModel';

import { Body, Hero, Title } from 'src/core/Typography';

const StyledContainer = styled(Container)(() => ({
  backgroundColor: 'white',
}));

const ColoredBullet = styled('div')(() => ({
  margin: '0',
  padding: '0 30px',
  counterIncrement: 'section',
  position: 'relative',
  borderLeft: '1px solid red',
  marginRight: '30px',

  '&:before': {
    content: 'counter(section)',
    left: '0',
    marginLeft: '-10px',
    position: 'absolute',
    borderRadius: '50%',
    height: '18px',
    width: '18px',
    backgroundColor: 'red',
    textAlign: 'center',
    color: 'white',
  },

  '&:last-child': {
    borderLeft: '0',
  },
}));

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
