import React, { useEffect } from 'react';
import styled from 'styled-components';

import HeaderViewModel from './ViewModel';
import { Hero } from 'src/core/Typography';

interface Props {
  viewModel: HeaderViewModel;
}

const Section = styled.div`
  width: 100%;
  margin-bottom: 76px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Hero.Two)`
  font-weight: 800;
  font-style: italic;
  letter-spacing: 1px;
  color: #e7131a !important;
  margin-bottom: 32px !important;
`;

const VideoContainer = styled(Section)`
  display: block;
`;

const VideoTitle = styled(Title)`
  color: #041022 !important;
  max-width: 490px !important;
  margin: 0 auto !important;
  margin-bottom: 32px !important;
  line-height: 48px !important;
  @media (max-width: 599px) {
    line-height: 40px;
  }
`;

const IframeContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const BuySellTradeView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    window.YT.ready(() => {
      new window.YT.Player('buy-sell-trade-youtube-video', {
        events: {
          onStateChange: viewModel.handleVideoStateChange,
        },
      });
    });
  }, []);

  return (
    <VideoContainer>
      <VideoTitle>
        Buy, sell, or trade vehicles all from your&nbsp;couch
      </VideoTitle>
      <IframeContainer>
        <StyledIframe
          id="buy-sell-trade-youtube-video"
          src={'https://www.youtube.com//embed/BNN30oCCesc?enablejsapi=1'}
        ></StyledIframe>
      </IframeContainer>
    </VideoContainer>
  );
};

export default BuySellTradeView;
