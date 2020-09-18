import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../atoms/Icon/Icon';
import { Body } from '../atoms/Typography';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #041022;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
`;

const Apps = styled.div`
  display: flex;
`;

const Socials = styled.div`
  display: flex;
  margin-top: 32px;
  margin-bottom: 16px;
`;

const IconSpaced = styled(Icon)`
  margin-right: 16px;
`;

const Message = styled(Body.Small)`
  color: #ffffff;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const Copyright = styled(Body.Fine)`
  color: #ffffff;
`;

export const Footer: React.FC = () => {
  return (
    <Container>
      <Information>
        <Icon icon={Icons.VROOM} color="#FFFFFF" />
        <Message>GET THE VROOM APP</Message>
        <Apps>
          <IconSpaced icon={Icons.GOOGLE_PLAY} />
          <Icon icon={Icons.APPLE_STORE} />
        </Apps>
        <Socials>
          <IconSpaced icon={Icons.FACEBOOK} />
          <IconSpaced icon={Icons.TWITTER} />
          <Icon icon={Icons.INSTAGRAM} />
        </Socials>
        <Copyright>©2020 VROOM. ALL RIGHTS RESERVED.</Copyright>
      </Information>
    </Container>
  );
};
