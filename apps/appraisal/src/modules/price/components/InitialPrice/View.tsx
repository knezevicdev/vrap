import InitialPriceViewModel from './ViewModel';
import React from 'react';
import styled from 'styled-components';
import { Body, Hero, Title } from 'src/core/Typography';
import { Button } from 'src/core/Button';
import { observer } from 'mobx-react';

const StyledContainer = styled.div`
  background-color: white;
  padding: 200px;
  text-align: center;
`;

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
      <div>
        <Button.Primary onClick={handleButtonClick}>
          {viewModel.continuePrice}
        </Button.Primary>
      </div>
    </StyledContainer>
  );
};

export default observer(InitialPriceView);
