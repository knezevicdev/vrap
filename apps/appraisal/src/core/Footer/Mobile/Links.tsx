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

const SectionDiv = styled.div<{ visible: boolean }>`
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
  width: max-content;
  :hover {
    text-decoration-color: red;
  }
  ${(props): string | undefined =>
    props.visible
      ? `
        :last-child {
           border-bottom: solid 1px #FFFFFF;
           padding-bottom: 8px;
           width: 100%;
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

export const MobileLinks: React.FC<Props> = ({ sections }) => {
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
          <SectionDiv key={title} onClick={onClick(title)} visible={visible}>
            <TitleContainer>
              <Title>{title}</Title>
              <Arrow visible={visible} icon={Icons.ARROW_DOWN} />
            </TitleContainer>
            <LinksContainer visible={visible}>
              {links.map((link: Link) => {
                const { href, name } = link;
                return (
                  <CustomLink key={href} href={href} visible={visible}>
                    <LinkText>{name}</LinkText>
                  </CustomLink>
                );
              })}
            </LinksContainer>
          </SectionDiv>
        );
      })}
    </Links>
  );
};
