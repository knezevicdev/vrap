import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../core/Icon';
import { Body } from '../../core/Typography';
import { DesktopLinks } from './Desktop/Links';
import { MobileLinks } from './Mobile/Links';

const Container = styled.div`
  display: flex;
  background: #041022;
  padding: 48px 64px 32px 64px;
  @media (max-width: 599px) {
    flex-direction: column;
    padding: 24px;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 599px) {
    order: 2;
  }
`;

const Apps = styled.div`
  display: flex;
`;

const Socials = styled.div`
  display: flex;
  margin: 16px 0;
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

const CustomA = styled.a`
  line-height: 0;
`;

export const Footer: React.FC = () => {
  return (
    <Container>
      <Information>
        <CustomA href={'https://www.vroom.com/'}>
          <Icon icon={Icons.VROOM} color="#FFFFFF" />
        </CustomA>
        <Message>GET THE VROOM APP</Message>
        <Apps>
          <CustomA
            href={
              'https://play.google.com/store/apps/details?id=com.vroom.app.android'
            }
          >
            <IconSpaced icon={Icons.GOOGLE_PLAY} />
          </CustomA>
          <CustomA
            href={
              'https://apps.apple.com/app/apple-store/id1494048038?pt=120897984'
            }
          >
            <Icon icon={Icons.APPLE_STORE} />
          </CustomA>
        </Apps>
        <Socials>
          <CustomA href={'https://www.facebook.com/vroom'}>
            <IconSpaced icon={Icons.FACEBOOK} />
          </CustomA>
          <CustomA href={'https://www.twitter.com/vroomcars'}>
            <IconSpaced icon={Icons.TWITTER} />
          </CustomA>
          <CustomA href={'https://www.instagram.com/vroom'}>
            <Icon icon={Icons.INSTAGRAM} />
          </CustomA>
        </Socials>
        <Copyright>©2020 VROOM. ALL RIGHTS RESERVED.</Copyright>
      </Information>
      <DesktopLinks />
      <MobileLinks />
    </Container>
  );
};
