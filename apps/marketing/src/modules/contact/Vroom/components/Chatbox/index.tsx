import getConfig from 'next/config';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const { publicRuntimeConfig } = getConfig();

const Chatbox: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://webchat-sandbox.pypestream.com/webchat-public.js';
    document.body.appendChild(script);

    return (): void => {
      document.body.removeChild(script);
    };
  }, []);

  const [booted, setBooted] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(true);
  const handleOnClick = (): void => {
    const chatContainer = document.getElementById('chat-container');

    /*
      TODO:
      This implementation is pretty horrible. @ts-ignore is a major red flag.
      Pypestream is brought in from `webchat-public.js` in the useEffect, But when we compile Next.js isn't gonna know what it is.
      Have tried copying the file and putting it into /public dir but pypestream complains about a VPN
      An alternative solution is using old school `document.addEventListener` but there are implementaiton 
      issues where React will lose track of the event listener and not clean up properly. You could try to hack your way with refs but even then cleanliness isn't
      guaranteed.
    */
    if (!booted) {
      // @ts-ignore
      Pypestream('config', {
        domain: 'dev',
        env: 'sandbox',
        beta: true,
        /* eslint-disable @typescript-eslint/camelcase */
        gtm_id: 'GTM-PZJGZ67',
      });

      // @ts-ignore
      Pypestream(
        'boot',
        {
          APP_ID: '70c71811-1c35-4db7-b9d2-21754f24ba0c',
        },
        chatContainer
      );

      // @ts-ignore
      Pypestream('onShow', function () {
        setShowChatIcon(false);
      });

      // @ts-ignore
      Pypestream('onHide', function () {
        setShowChatIcon(true);
      });

      setBooted(true);
      setShowChatIcon(false);
    } else {
      // @ts-ignore
      Pypestream('toggle');
      setShowChatIcon(!showChatIcon);
    }
  };

  const chatIcon = `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/chat-icon.svg`;
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
  bottom: 40px;
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
    right: 40px;
  }
`;

const ChatboxIcon = styled.img`
  height: 40px;
  width: 40px;
`;

const ChatContainer = styled.div`
  height: 600px;
  width: 450px;
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

export default Chatbox;
