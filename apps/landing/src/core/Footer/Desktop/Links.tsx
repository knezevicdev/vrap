import React from 'react';
import styled from 'styled-components';

import { Body, Link } from '../../../core/Typography';

const Links = styled.div`
  display: flex;
  margin-left: auto;
  padding-left: 16px;
  @media (max-width: 599px) {
    display: none;
  }
`;

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  :not(:last-child) {
    padding-right: 16px;
    
    @media (min-width: 840px) {
      padding-right: 32px;
    }
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

interface Link {
  href: string;
  name: string;
}

interface Section {
  title: string;
  links: Link[];
}

interface Props {
  sections: Section[];
}

export const DesktopLinks: React.FC<Props> = ({ sections }) => {
  return (
    <Links>
      {sections.map((section: Section) => {
        const { title, links } = section;
        return (
          <SectionDiv key={title}>
            <Title>{title}</Title>

            {links.map((link: Link) => {
              const { href, name } = link;
              return (
                <CustomLink key={href} href={href}>
                  <LinkText>{name}</LinkText>
                </CustomLink>
              );
            })}
          </SectionDiv>
        );
      })}
    </Links>
  );
};
