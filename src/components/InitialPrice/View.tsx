import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import InitialPriceViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero, Title } from 'src/core/Typography';

interface Props {
  viewModel: InitialPriceViewModel;
}

const isVisible = (el: HTMLElement): boolean => {
  if (el) {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    return isVisible;
  } else {
    return false;
  }
};

const InitialPriceView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    const handleScroll = (): void => {
      const stickyFooter = document.getElementById('stickyFooter');
      const priceDetails = document.getElementById('priceDetails');

      if (priceDetails && stickyFooter) {
        const footerDisplay = isVisible(priceDetails) ? 'none' : 'block';
        stickyFooter.style.display = footerDisplay;
      }
    };

    document.addEventListener('scroll', handleScroll);
    viewModel.onPageLoad();

    return (): void => document.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer>
      <Hero.Four>{viewModel.yourPrice}</Hero.Four>
      <Hero.One>{viewModel.price}</Hero.One>
      <StyledIcon icon={Icons.CAR_OFFER} />

      <Content>
        <ContentText>
          {viewModel.offerExpPreDate}
          <b>{viewModel.goodUntil}</b>
          {viewModel.offerExpPostDate}
          <b>{viewModel.miles}</b>
          {viewModel.the}
          <b>{viewModel.titleName}</b>
          {viewModel.yourName}
        </ContentText>
      </Content>

      <StyledButton id="priceDetails" onClick={viewModel.onContinueClick}>
        {viewModel.continuePrice}
      </StyledButton>

      <StyledLegal>
        <Body.Small>{viewModel.legalDocumentation}</Body.Small>
      </StyledLegal>

      <StickyFooter id="stickyFooter">
        <StickyContent>
          <StickyDetails>
            <Title.Four>{viewModel.yourPriceCamel}</Title.Four>
            <Hero.Four>{viewModel.price}</Hero.Four>
          </StickyDetails>
          <FullButton onClick={viewModel.onContinueClick}>
            {viewModel.continuePrice}
          </FullButton>
        </StickyContent>
      </StickyFooter>
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
  max-width: 300px;
  white-space: normal;
  width: 100%;
`;

const FullButton = styled(Button.Primary)`
  margin: auto;
  width: 100%;
`;

const StickyDetails = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

const StickyContent = styled.div`
  padding: 5px 20px;
`;

const StyledLegal = styled.div`
  max-width: 500px;
  text-align: left;
  margin: auto;
`;

const StickyFooter = styled.div`
  background: white;
  border-top: 2px solid #d6d7da;
  bottom: 0;
  display: none;
  left: 0;
  position: fixed;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContentText = styled(Body.Regular)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 500px;
  flex-wrap: wrap;
  > b {
    margin: 0 3px;
  }
`;

export default observer(InitialPriceView);
