import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../../../foundation/themes/types';
import { addStyleForMobile } from '../../../foundation/themes/Vroom';
import { Body, Fine } from '../../../foundation/Typography';
import Icon, { Icons } from '../../Icon/Icon';
import { DesktopLinks } from './Desktop/Links';
import { MobileLinks } from './Mobile/Links';

const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Container = styled.div`
  display: flex;
  background: ${primaryBlack};
  padding: 48px 64px 32px 64px;
  ${addStyleForMobile(`
    flex-direction: column;
    padding: 24px;
  `)}
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  ${addStyleForMobile(`
    order: 2;
  `)}
`;

const Apps = styled.div`
  display: flex;
`;

const Socials = styled.div`
  display: flex;
  margin: 16px 0;
`;

const VroomIcon = styled(Icon)`
  fill: ${primaryWhite};
`;

const GoogleIcon = styled(Icon)`
  margin-right: 16px;
`;

const SocialIcon = styled(Icon)`
  fill: ${primaryWhite};
`;

const SocialIconSpace = styled(SocialIcon)`
  margin-right: 16px;
`;

const Message = styled(Body.Small)`
  color: ${primaryWhite};
  margin-top: 16px;
  margin-bottom: 8px;
  letter-spacing: 1.25px;
`;

const Copyright = styled(Fine)`
  color: ${primaryWhite};
  letter-spacing: 1.25px;
`;

const CustomA = styled.a`
  line-height: 0;
`;

const sections = [
  {
    title: 'Vroom',
    links: [
      {
        href: '/cars',
        name: 'Buy',
      },
      {
        href: '/sell',
        name: 'Sell/Trade',
      },
      {
        href: '/finance',
        name: 'Finance',
      },
    ],
  },
  {
    title: 'About',
    links: [
      {
        href: '/about',
        name: 'About Us',
      },
      {
        href: '/protection',
        name: 'Vroom Protection',
      },
      {
        href: '/how-it-works',
        name: 'How It Works',
      },
      {
        href: '/reviews',
        name: 'Customer Reviews',
      },
      {
        href: 'https://ir.vroom.com/',
        name: 'Investor Relations',
      },
    ],
  },
  {
    title: 'Contact',
    links: [
      {
        name: '(855) 524-1300',
        href: 'tel:+18555241300',
      },
      {
        href: 'https://vroom.zendesk.com/hc/en-us',
        name: 'FAQ',
      },
      {
        href: '/contact',
        name: 'Contact Us',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        href: '/legal/privacy-policy',
        name: 'Privacy Policy',
      },
      {
        href: '/legal/terms-of-use',
        name: 'Terms of use',
      },
      {
        href: '/careers',
        name: 'Careers',
      },
      {
        href:
          'https://privacyportal.onetrust.com/webform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d',
        name: 'Do Not Sell My Info (CA Residents)',
      },
    ],
  },
];
const Footer: React.FC = () => {
  return (
    <Container>
      <Information>
        <CustomA href="https://www.vroom.com/">
          <VroomIcon icon={Icons.VROOM} />
        </CustomA>
        <Message bold>GET THE VROOM APP</Message>
        <Apps>
          <CustomA href="https://play.google.com/store/apps/details?id=com.vroom.app.android">
            <GoogleIcon icon={Icons.GOOGLE_PLAY} />
          </CustomA>
          <CustomA href="https://apps.apple.com/app/apple-store/id1494048038?pt=120897984">
            <Icon icon={Icons.APPLE_STORE} />
          </CustomA>
        </Apps>
        <Socials>
          <CustomA href="https://www.facebook.com/vroom">
            <SocialIconSpace icon={Icons.FACEBOOK} />
          </CustomA>
          <CustomA href="https://www.twitter.com/vroomcar">
            <SocialIconSpace icon={Icons.TWITTER} />
          </CustomA>
          <CustomA href="https://www.instagram.com/vroom">
            <SocialIcon icon={Icons.INSTAGRAM} />
          </CustomA>
        </Socials>
        <Copyright>©2020 VROOM. ALL RIGHTS RESERVED.</Copyright>
      </Information>
      <DesktopLinks sections={sections} />
      <MobileLinks sections={sections} />
    </Container>
  );
};

export default Footer;
