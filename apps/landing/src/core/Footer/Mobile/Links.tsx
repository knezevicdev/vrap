import React, { useState } from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../../core/Icon';
import { Body, Link } from '../../../core/Typography';

const Links = styled.div`
  display: none;
  @media (max-width: 599px) {
    display: flex;
    flex-direction: column;
    order: 1;
    margin-bottom: 16px;
  }
`;

const Section = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${(props): string | undefined =>
    !props.visible ? 'border-bottom: solid 1px #FFFFFF;' : undefined};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Body.Regular)`
  color: #999da3;
  font-weight: 600;
  margin: 8px 0;
`;

const CustomLink = styled(Link)<{ visible: boolean }>`
  :hover {
    text-decoration-color: red;
  }
  ${(props): string | undefined =>
    props.visible
      ? `
        :last-child {
           border-bottom: solid 1px #FFFFFF;
           padding-bottom: 8px;
         }
        `
      : undefined}
`;

const Arrow = styled(Icon)<{ visible: boolean }>`
  transform: rotate(${(props): string => (props.visible ? '180deg' : '0deg')});
  transition: transform 250ms;
`;

const LinksContainer = styled.div<{ visible: boolean }>`
  display: ${(props): string => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
`;

const LinkText = styled(Body.Small)`
  color: #ffffff;
  margin-bottom: 8px;
`;

const sections = [
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

export const MobileLinks: React.FC = () => {
  const [visibleSection, setVisibleSection] = useState('');

  const onClick = (title: string) => (): void => {
    const section = title === visibleSection ? '' : title;
    setVisibleSection(section);
  };

  return (
    <Links>
      {sections.map((section) => {
        const { title, links } = section;
        const visible = visibleSection === title;
        return (
          <Section key={title} onClick={onClick(title)} visible={visible}>
            <TitleContainer>
              <Title>{title}</Title>
              <Arrow visible={visible} icon={Icons.ARROW_DOWN} />
            </TitleContainer>
            <LinksContainer visible={visible}>
              {links.map((link) => {
                const { href, name } = link;
                return (
                  <CustomLink key={href} href={href} visible={visible}>
                    <LinkText>{name}</LinkText>
                  </CustomLink>
                );
              })}
            </LinksContainer>
          </Section>
        );
      })}
    </Links>
  );
};
