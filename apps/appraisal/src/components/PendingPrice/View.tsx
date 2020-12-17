import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import PendingPriceViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero } from 'src/core/Typography';
interface Props {
  viewModel: PendingPriceViewModel;
}

const PendingPriceView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.onPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer>
      <Hero.Four>{viewModel.sitTight}</Hero.Four>
      <StyledIcon icon={Icons.CAR_OFFER} />

      <StyledBody>
        <Body.Regular>{viewModel.takingALook}</Body.Regular>
      </StyledBody>
      <StyledBody>
        <Body.Regular>
          <i>{viewModel.spamFolder}</i>
        </Body.Regular>
      </StyledBody>

      <StyledButton onClick={viewModel.handleFindCar}>
        {viewModel.findCar}
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
`;

const StyledBody = styled.div`
  max-width: 410px;
  margin: auto;
`;

const StyledIcon = styled(Icon)`
  padding: 20px;
`;

const StyledButton = styled(Button.Primary)`
  margin: 30px 0;
  width: 100%;
  max-width: 300px;
`;

export default observer(PendingPriceView);
