import React from 'react';
import NextStepsViewModel from './ViewModel';
import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@vroom-web/ui';

const StyledContainer = styled(Container)(() => ({
  backgroundColor: 'white',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  [theme.breakpoints.only('xs')]: {
    textAlign: 'center',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: theme.spacing(2),
  },
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

const ColoredBulletContent = styled('div')(() => ({
  padding: '10px 0',
}));

export interface Props {
  viewModel: NextStepsViewModel;
}

const NextStepsView: React.FC<Props> = ({viewModel}) => {
  return (
    <StyledContainer>
      <Title variant="h2">{viewModel.nextSteps}</Title>
      <div>
        <ColoredBullet>
          <b>{viewModel.verifyOwnership}</b>
          <ColoredBulletContent>{viewModel.quicklyVerify}</ColoredBulletContent>
        </ColoredBullet>
        <ColoredBullet>
          <b>{viewModel.freePickup}</b>
          <ColoredBulletContent>{viewModel.scheduleATime}</ColoredBulletContent>
				</ColoredBullet>
				<ColoredBullet>
          <b>{viewModel.wePickIt}</b>
          <ColoredBulletContent>{viewModel.pickupYourVehicle}</ColoredBulletContent>
				</ColoredBullet>
      </div>
    </StyledContainer>
  );
};

export default NextStepsView;
