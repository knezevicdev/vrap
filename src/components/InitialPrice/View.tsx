import { Button, Icon, Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import AuthModal from '../AuthModal/AuthModal';
import Spinner from '../Spinner';
import InitialPriceViewModel from './ViewModel';

import { Icons } from 'src/core/Icon';
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
  }, [viewModel]);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const onSuccessfulLogin = useCallback(() => {
    window.location.href = viewModel.verificationUrl;
  }, [viewModel.verificationUrl]);

  return (
    <>
      <StyledContainer>
        <Typography.Heading.Four>{viewModel.yourPrice}</Typography.Heading.Four>
        <Typography.Heading.One>{viewModel.price}</Typography.Heading.One>
        <StyledIcon
          title="Car"
          titleId="heroIcon"
          icon={Icons.CAR_OFFER}
          aria-hidden="true"
        />

        <Content>
          <ContentText>
            {viewModel.offerExpPreDate}
            <b>{viewModel.goodUntil}</b>
            {viewModel.offerExpPostDate}
            <b>{viewModel.miles}</b>
            {viewModel.wicheverOccerFirst} {viewModel.the}
            <b>{viewModel.titleName}</b>
            {viewModel.yourName}
          </ContentText>
        </Content>

        <StyledButton
          id="priceDetails"
          onClick={async () => {
            const isSignedIn = await viewModel.onContinueClick();

            if (!isSignedIn) {
              setShowAuthModal(true);
            }
          }}
          disabled={viewModel.acceptingPrice}
        >
          {viewModel.acceptingPrice ? <Spinner /> : viewModel.continuePrice}
        </StyledButton>

        <StyledLegal>
          <Typography.Body.Small>
            {viewModel.legalDocumentation}
          </Typography.Body.Small>
        </StyledLegal>

        <StickyFooter id="stickyFooter">
          <StickyContent>
            <StickyDetails>
              <Typography.Title.Three>
                {viewModel.yourPriceCamel}
              </Typography.Title.Three>
              <Typography.Heading.Four>
                {viewModel.price}
              </Typography.Heading.Four>
            </StickyDetails>
            <FullButton
              onClick={async () => {
                const isSignedIn = await viewModel.onContinueClick();

                if (!isSignedIn) {
                  setShowAuthModal(true);
                }
              }}
              disabled={viewModel.acceptingPrice}
            >
              {viewModel.acceptingPrice ? <Spinner /> : viewModel.continuePrice}
            </FullButton>
          </StickyContent>
        </StickyFooter>
      </StyledContainer>
      {showAuthModal && (
        <AuthModal
          onSuccessfulLogin={onSuccessfulLogin}
          redirectUrl={viewModel.verificationUrl}
        />
      )}
    </>
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
  background-color: #308406;
  white-space: normal;
  width: 100%;

  &:hover {
    background-color: #309706;
  }
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
  > span {
    line-height: 12px;
  }
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

const ContentText = styled(Typography.Body.Regular)`
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
