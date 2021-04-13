import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

declare let Pypestream: any;

const { publicRuntimeConfig } = getConfig();

/* TODO:
  The pypestream implemention uses old school `document.addEventListener` but there are implementation issues.
  React will lose track of the event listener, not clean up properly, and you'll need to hack your way with refs.
  Even then results are not guaranteed. */
const devConfig = {
  appId: '70c71811-1c35-4db7-b9d2-21754f24ba0c',
  src: 'https://webchat-sandbox.pypestream.com/webchat-public.js',
  gtm: 'GTM-PZJGZ67',
  domain: 'dev',
  env: 'sandbox',
  beta: true,
};
const prodConfig = {
  appId: 'e0987638-07c6-43b4-a10e-fa51ad9174d2',
  src: 'https://webchat.pypestream.com/webchat-public.js',
  gtm: 'GTM-5PLCDGC',
  domain: 'prod',
  env: 'prod',
  beta: true,
};
const pypestreamConfig =
  publicRuntimeConfig.NODE_ENV !== 'production' ? devConfig : prodConfig;
const initConfig = {
  domain: pypestreamConfig.domain,
  env: pypestreamConfig.env,
  beta: pypestreamConfig.beta,
  /* eslint-disable @typescript-eslint/camelcase */
  gtm_id: pypestreamConfig.gtm,
};

const initChat = (
  enableChatIcon: () => void,
  disableChatIcon: () => void,
  trackChatboxOpened: () => void,
  trackChatboxClosed: () => void,
  completeBoot: () => void
) => {
  // can't do anything until Pypestream loads in
  if (typeof Pypestream === 'undefined') {
    return;
  }

  const chatContainer = document.getElementById('chat-container');
  Pypestream('config', initConfig);
  Pypestream('boot', { APP_ID: pypestreamConfig.appId }, chatContainer);
  Pypestream('onShow', disableChatIcon);
  Pypestream('onHide', enableChatIcon);
  Pypestream('onChatEnd', trackChatboxClosed);

  trackChatboxOpened();
  completeBoot();
};

const View: React.FC<Props> = ({ viewModel }) => {
  const [booted, setBooted] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(true);

  const router = useRouter();
  const { chatboxOpen } = router.query || false;

  const enableChatIcon = () => setShowChatIcon(true);
  const disableChatIcon = () => setShowChatIcon(false);
  const completeBoot = () => {
    setShowChatIcon(false);
    setBooted(true);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = pypestreamConfig.src;
    document.body.appendChild(script);

    // https://tdalabs.atlassian.net/browse/CW-82
    if (chatboxOpen) {
      script.onload = () => {
        initChat(
          enableChatIcon,
          disableChatIcon,
          viewModel.trackChatboxOpened,
          viewModel.trackChatboxClosed,
          completeBoot
        );
      };
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [chatboxOpen, viewModel.trackChatboxOpened, viewModel.trackChatboxClosed]);

  const handleOnClick = (): void => {
    if (!booted) {
      initChat(
        enableChatIcon,
        disableChatIcon,
        viewModel.trackChatboxOpened,
        viewModel.trackChatboxClosed,
        completeBoot
      );
    } else {
      Pypestream('toggle');
      setShowChatIcon(!showChatIcon);
    }
  };

  return (
    <>
      {showChatIcon && (
        <ChatIconContainer id="toggle-chat" onClick={handleOnClick}>
          <ChatboxIcon
            src={`${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/chat-icon.svg`}
          />
        </ChatIconContainer>
      )}
      <ChatContainer
        id="chat-container"
        isClosed={showChatIcon}
      ></ChatContainer>
    </>
  );
};

const ChatIconContainer = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 50%;
  bottom: 10px;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 50%);
  display: flex;
  height: 70px;
  justify-content: center;
  margin: 10px;
  position: fixed;
  right: 70px;
  width: 70px;
  z-index: 1200;

  @media (max-width: 1920px) {
    right: 10px;
  }
`;

const ChatboxIcon = styled.img`
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

interface ChatProps {
  isClosed: boolean;
}

const ChatContainer = styled.div<ChatProps>`
  height: ${(props) => (props.isClosed ? '0px !important' : '0px')};
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1199;
`;

export default View;
