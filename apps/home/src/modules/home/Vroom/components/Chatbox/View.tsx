import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const { publicRuntimeConfig } = getConfig();

const View: React.FC<Props> = ({ viewModel }) => {
  const [booted, setBooted] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(true);
  const chatIcon = `${publicRuntimeConfig.BASE_PATH}/modules/home/images/chat-icon.svg`;
  const router = useRouter();
  const { chatboxOpen } = router.query || false;
  const dev = publicRuntimeConfig.NODE_ENV !== 'production';

  const initChat = (): void => {
    /* TODO:
      This implementation is pretty horrible. @ts-ignore is a major red flag.
      Pypestream is brought in from `webchat-public.js` in useEffect, but when we compile Next.js isn't gonna know what it is.
      I've tried copying the file to `/public` dir but pypestream complains about a VPN error.
      The pypestream implemention uses old school `document.addEventListener` but there are implementation issues.
      React will lose track of the event listener, not clean up properly, and you'll need to hack your way with refs.
      Even then results are not guaranteed. */

    const chatContainer = document.getElementById('chat-container');
    const appId = dev
      ? '70c71811-1c35-4db7-b9d2-21754f24ba0c'
      : 'e0987638-07c6-43b4-a10e-fa51ad9174d2';
    const pypeStreamConfig = dev
      ? {
          domain: 'dev',
          env: 'sandbox',
          beta: true,
          /* eslint-disable @typescript-eslint/camelcase */
          gtm_id: 'GTM-PZJGZ67',
        }
      : {
          domain: 'prod',
          env: 'prod',
          beta: true,
          /* eslint-disable @typescript-eslint/camelcase */
          gtm_id: 'GTM-PZJGZ67',
        };

    // @ts-ignore
    Pypestream('config', pypeStreamConfig);

    // @ts-ignore
    Pypestream('boot', { APP_ID: appId }, chatContainer);

    // @ts-ignore
    Pypestream('onShow', function () {
      setShowChatIcon(false);
    });

    // @ts-ignore
    Pypestream('onHide', function () {
      setShowChatIcon(true);
    });

    // @ts-ignore
    Pypestream('onChatEnd', function () {
      viewModel.trackChatboxClosed();
    });

    viewModel.trackChatboxOpened();
    setBooted(true);
    setShowChatIcon(false);
  };

  useEffect(() => {
    const script = document.createElement('script');
    if (dev) {
      script.src = 'https://webchat-sandbox.pypestream.com/webchat-public.js';
    } else {
      script.src = 'https://webchat.pypestream.com/webchat-public.js';
    }
    document.body.appendChild(script);

    // https://tdalabs.atlassian.net/browse/CW-82
    const timer = setTimeout(() => {
      if (chatboxOpen) initChat();
    }, 1000);

    return (): void => {
      document.body.removeChild(script);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatboxOpen]);

  const handleOnClick = (): void => {
    if (!booted) {
      initChat();
    } else {
      // @ts-ignore
      Pypestream('toggle');
      setShowChatIcon(!showChatIcon);
    }
  };

  return (
    <>
      {showChatIcon && (
        <ChatIconContainer id="toggle-chat" onClick={handleOnClick}>
          <ChatboxIcon src={chatIcon} />
        </ChatIconContainer>
      )}
      <ChatContainer id="chat-container"></ChatContainer>
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
  position: absolute;
  right: 70px;
  width: 70px;
  z-index: 10;

  @media (max-width: 1920px) {
    right: 10px;
  }
`;

const ChatboxIcon = styled.img`
  height: 40px;
  width: 40px;
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

export default View;
