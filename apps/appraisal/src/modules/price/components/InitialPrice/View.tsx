import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import InitialPriceViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero, Title } from 'src/core/Typography';
import { submitPriceResponse } from 'src/modules/price/store';
import { PriceData } from 'src/networking/Networker';

interface Props {
  viewModel: InitialPriceViewModel;
}

const InitialPriceView: React.FC<Props> = ({ viewModel }) => {
  const handleButtonClick = (): void => {
    const priceData: PriceData = { priceId: viewModel.priceId, accepted: true };
    submitPriceResponse(priceData);
  };

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

const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
`;

const StyledIcon = styled(Icon)`
  padding: 20px;
`;

const StyledButton = styled(Button.Primary)`
  margin: 30px 0;
  width: 100%;
  max-width: 300px;
  white-space: normal;
`;

export default observer(InitialPriceView);
