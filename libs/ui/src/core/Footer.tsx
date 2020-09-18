import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../atoms/Icon/Icon';
import { Body, Link } from '../atoms/Typography';

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

const Links = styled.div`
  display: flex;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(Body.Regular)`
  color: #999da3;
  font-weight: 600;
  margin-bottom: 8px;
`;

const CustomLink = styled(Link)`
  :hover {
    text-decoration-color: red;
  }
`;

const LinkText = styled(Body.Small)`
  color: #ffffff;
  margin-bottom: 8px;
`;

const CustomA = styled.a`
  line-height: 0;
`;

const categories = [
  {
    title: 'Vroom',
    links: [
      {
        href: 'https://www.vroom.com/cars',
        name: 'Buy',
      },
      {
        href: 'https://www.vroom.com/sell',
        name: 'Sell/Trade',
      },
      {
        href: 'https://www.vroom.com/finance',
        name: 'Finance',
      },
    ],
  },
  {
    title: 'About',
    links: [
      {
        href: 'https://www.vroom.com/about',
        name: 'About Us',
      },
      {
        href: 'https://www.vroom.com/protection',
        name: 'Vroom Protection',
      },
      {
        href: 'https://www.vroom.com/how-it-works',
        name: 'How It Works',
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
        href: 'tel:+18555241300',
        name: 'Phone',
      },
      {
        href: 'https://vroom.zendesk.com/hc/en-us',
        name: 'FAQ',
      },
      {
        href: 'https://www.vroom.com/contact',
        name: 'Contact Us',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        href: 'https://www.vroom.com/legal/privacy-policy',
        name: 'Privacy Policy',
      },
      {
        href: 'https://www.vroom.com/legal/terms-of-use',
        name: 'Terms of use',
      },
      {
        href: 'https://www.vroom.com/careers',
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
      <Links>
        {categories.map((category) => {
          const { title, links } = category;
          return (
            <Category key={title}>
              <Title>{title}</Title>

              {links.map((link) => {
                const { href, name } = link;
                return (
                  <CustomLink key={href} href={href}>
                    <LinkText>{name}</LinkText>
                  </CustomLink>
                );
              })}
            </Category>
          );
        })}
      </Links>
    </Container>
  );
};
