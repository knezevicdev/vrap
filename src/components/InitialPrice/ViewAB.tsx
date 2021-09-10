import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import InitialPriceViewModel from './ViewModel';

import { Button } from 'src/core/Button';
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
      <TitlePrice>{viewModel.yourPriceAB}</TitlePrice>
      <StyledPrice>
        {viewModel.price}
        <span>{viewModel.star}</span>
      </StyledPrice>
      <Content>
        <ContentText>
          {viewModel.offerExpPreDate}
          <b>{viewModel.goodUntil}</b>
          {viewModel.offerExpPostDate}
          <b>{viewModel.miles}</b>
        </ContentText>
      </Content>
      <ListContainer>
        <ListTitle>{viewModel.whatYoullNeed}</ListTitle>
        {viewModel.whatYouNeedOptions.map((item, i) => {
          return (
            <ListItem key={i}>
              <Dot />
              {item}
            </ListItem>
          );
        })}
      </ListContainer>

      <StyledButton id="priceDetails" onClick={viewModel.onContinueClick}>
        {viewModel.continuePrice}
      </StyledButton>

      <StyledLegal>
        <LegalText>{viewModel.legalDocumentation}</LegalText>
      </StyledLegal>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitlePrice = styled(Title.One)`
  font-weight: 600;
  line-height: 40px;
`;

const StyledPrice = styled(Hero.One)`
  font-weight: 800;
  line-height: 64px;
  margin: 8px 0;
  position: relative;
  > span {
    font-family: Calibre;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 24px;
    position: absolute;
  }
`;

const ListTitle = styled(Title.Two)`
  font-weight: 600;
  line-height: 32px;
  text-align: start;
  margin-bottom: 8px;
`;

const Dot = styled.div`
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: #041022;
  margin: 0 8px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 32px;
`;

const ListItem = styled(Body.Regular)`
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 24px;
  margin-bottom: 8px;
  :last-child {
    margin-bottom: 0;
  }
`;

const StyledButton = styled(Button.Primary)`
  margin: 30px 0;
  max-width: 300px;
  white-space: normal;
  width: 100%;
`;

const StyledLegal = styled.div`
  max-width: 500px;
  text-align: center;
  margin: auto;
`;

const LegalText = styled(Body.Small)`
  font-size: 10px;
  line-height: 12px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContentText = styled(Body.Small)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 500px;
  flex-wrap: wrap;
  line-height: 20px;
  > b {
    margin: 0 3px;
  }
`;

export default observer(InitialPriceView);
