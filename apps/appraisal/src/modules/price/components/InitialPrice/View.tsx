import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Body, Hero, Title } from 'src/core/Typography';
import { Button, Container } from '@vroom-web/ui';
import React from 'react';

import InitialPriceViewModel from './ViewModel';

const StyledContainer = styled(Container)(() => ({
  backgroundColor: 'white',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    flexGrow: 0,
    minWidth: 'auto',
    minHeight: '53px',
    maxHeight: '53px',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: '45px',
    maxHeight: '45px',
  },
  background: '#EC0000',
  color: '#FFFFFF',
  fontWeight: 'bold',
  '&:hover': {
    background: '#CC0000',
  },
  '&:active': {
    background: '#990000',
  },
}));

interface Props {
  viewModel: InitialPriceViewModel;
}

const handleButtonClick = (
  event: React.MouseEvent<HTMLButtonElement>
): void => {
  event.preventDefault();
  // viewModel.navigateUsingSearch();
};

const InitialPriceView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <Hero.Four>{viewModel.yourPrice}</Hero.Four>
      <Hero.One>{viewModel.price}</Hero.One>
      <Body.Regular>
        {viewModel.offerExpPreDate}
        <b>{viewModel.goodUntil}</b>
      </Body.Regular>
      <Body.Regular>{viewModel.offerExpPostDate}</Body.Regular>
      <Title.Three>{viewModel.miles}</Title.Three>
      <StyledButton onClick={handleButtonClick} variant="contained">
        {viewModel.continuePrice}
      </StyledButton>
    </StyledContainer>
  );
};

export default observer(InitialPriceView);
