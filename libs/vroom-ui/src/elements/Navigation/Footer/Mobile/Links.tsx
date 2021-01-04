import React, { useState } from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../../../../foundation/themes/types';
import { addStyleForDesktop } from '../../../../foundation/themes/Vroom';
import { Body, Link } from '../../../../foundation/Typography';
import Icon, { Icons } from '../../../Icon/Icon';
import { FooterProps, Link as LinkType, Section } from '../types';

export const MobileLinks: React.FC<FooterProps> = ({ sections }) => {
  const [visibleSection, setVisibleSection] = useState('');

  const onClick = (title: string) => (): void => {
    const section = title === visibleSection ? '' : title;
    setVisibleSection(section);
  };

  return (
    <Links>
      {sections.map((section: Section) => {
        const { title, links } = section;
        const visible = visibleSection === title;
        return (
          <SectionContainer
            key={title}
            onClick={onClick(title)}
            visible={visible}
          >
            <TitleContainer>
              <Title bold>{title}</Title>
              <Arrow visible={visible} icon={Icons.CHEVRON_DOWN} />
            </TitleContainer>
            <LinksContainer visible={visible}>
              {links.map((link: LinkType) => {
                const { href, name } = link;
                return (
                  <CustomLink key={href} href={href} visible={visible}>
                    <LinkText>{name}</LinkText>
                  </CustomLink>
                );
              })}
            </LinksContainer>
          </SectionContainer>
        );
      })}
    </Links>
  );
};

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  order: 1;
  margin-bottom: 16px;

  ${addStyleForDesktop(`
     display: none;
  `)}
`;

const SectionContainer = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${(props): string | undefined =>
    !props.visible
      ? `border-bottom: solid 1px ${primaryWhite(props)};`
      : undefined};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Body.Regular)`
  color: ${primaryWhite};
  margin: 16px 0;
`;

const CustomLink = styled(Link)<{ visible: boolean }>`
  width: max-content;
  :hover {
    text-decoration-color: ${primaryBrand};
  }
  ${(props): string | undefined =>
    props.visible
      ? `
        :last-child {
           border-bottom: solid 1px ${primaryWhite(props)};
           padding-bottom: 8px;
           width: 100%;
         }
        `
      : undefined}
`;

const Arrow = styled(Icon)<{ visible: boolean }>`
  transform: rotate(${(props): string => (props.visible ? '180deg' : '0deg')});
  transition: transform 250ms;
  fill: ${primaryWhite};
`;

const LinksContainer = styled.div<{ visible: boolean }>`
  display: ${(props): string => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
`;

const LinkText = styled(Body.Small)`
  color: ${primaryWhite};
  margin-bottom: 8px;
`;
