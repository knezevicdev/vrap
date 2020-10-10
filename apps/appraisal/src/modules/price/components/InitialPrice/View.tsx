import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import Icon, { Icons } from 'src/core/Icon';

import InitialPriceViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import { Body, Hero, Title } from 'src/core/Typography';

const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
`;

const StyledIcon = styled(Icon)`
  padding: 20px;
`;

const StyledButton = styled(Button.Primary)`
  margin: 30px;
  width: 300px;
`;

interface Props {
  viewModel: InitialPriceViewModel;
}

const handleButtonClick = (): void => {
  event.preventDefault();
  // viewModel.navigateUsingSearch();
};

const InitialPriceView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <Hero.Four>{viewModel.yourPrice}</Hero.Four>
      <Hero.One>{viewModel.price}</Hero.One>
      <StyledIcon icon={Icons.CAR_OFFER} />

      <div>
        <Body.Regular>
          {viewModel.offerExpPreDate}
          <b>{viewModel.goodUntil}</b>
        </Body.Regular>
        <div>
          <Body.Regular>{viewModel.offerExpPostDate}</Body.Regular>
          <Title.Three>{viewModel.miles}</Title.Three>
        </div>
      </div>

      <StyledButton onClick={handleButtonClick}>
        {viewModel.continuePrice}
      </StyledButton>
    </StyledContainer>
  );
};

export default observer(InitialPriceView);
