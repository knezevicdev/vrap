import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '../../../../foundation/themes/types';
import {
  addStyleForMobile,
  addStyleForTablet,
} from '../../../../foundation/themes/Vroom';
import { Body, Link } from '../../../../foundation/Typography';
import {FooterProps, Section, Link as LinkType} from "../types";

export const DesktopLinks: React.FC<FooterProps> = ({sections}) => {
  return (
    <Links>
      {sections.map((section: Section) => {
        const { title, links } = section;
        return (
          <SectionContainer key={title}>
            <Title bold>{title}</Title>

            {links.map((link: LinkType) => {
              const { href, name } = link;
              return (
                <CustomLink key={href} href={href}>
                  <LinkText>{name}</LinkText>
                </CustomLink>
              );
            })}
          </SectionContainer>
        );
      })}
    </Links>
  );
};


const primaryBrand = (props: { theme: ThemeProps }): string =>
    props.theme.colors.primary.brand;

const grayThree = (props: { theme: ThemeProps }): string =>
    props.theme.colors.gray.three;

const primaryWhite = (props: { theme: ThemeProps }): string =>
    props.theme.colors.primary.white;

const Links = styled.div`
  display: flex;
  margin-left: auto;
  padding-left: 16px;
  ${addStyleForMobile(`
    display: none;
  `)}
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  :not(:last-child) {
    padding-right: 16px;

    ${addStyleForTablet(`
      padding-right: 32px;
    `)}
  }
`;

const Title = styled(Body.Regular)`
  color: ${grayThree};
  margin-bottom: 8px;
`;

const CustomLink = styled(Link)`
  :hover {
    text-decoration-color: ${primaryBrand};
  }
`;

const LinkText = styled(Body.Small)`
  color: ${primaryWhite};
  margin-bottom: 8px;
`;