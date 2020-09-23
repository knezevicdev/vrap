import React from 'react';
import styled from 'styled-components';

import { Body, Link } from '../../atoms/Typography';

const Links = styled.div`
  display: flex;
  margin-left: auto;
  padding-left: 16px;
  @media (max-width: 599px) {
    display: none;
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  :not(:last-child) {
    padding-right: 16px;
  }
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

export const DesktopLinks: React.FC = () => {
  return (
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
  );
};
