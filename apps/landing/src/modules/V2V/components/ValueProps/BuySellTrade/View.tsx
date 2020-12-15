import React, { useEffect } from 'react';
import styled from 'styled-components';

import BuySellTradeViewModel from './ViewModel';

import { Hero } from 'src/core/Typography';

interface Props {
  viewModel: BuySellTradeViewModel;
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
  const { title, video, handleVideoStateChange } = viewModel;

  useEffect(() => {
    window.YT.ready(() => {
      new window.YT.Player(video.id, {
        events: {
          onStateChange: handleVideoStateChange,
        },
      });
    });
  }, [video, handleVideoStateChange]);

  return (
    <VideoContainer>
      <VideoTitle>{title}</VideoTitle>
      <IframeContainer>
        <StyledIframe id={video.id} src={video.url}></StyledIframe>
      </IframeContainer>
    </VideoContainer>
  );
};

export default BuySellTradeView;
