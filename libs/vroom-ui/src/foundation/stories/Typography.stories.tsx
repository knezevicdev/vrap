import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import { Body, Fine, Heading, Link, Title } from '../Typography';

export const Typography: Story = () => {
  return (
    <Container>
      <Section>Heading</Section>
      <Heading.One>Heading 1</Heading.One>
      <Heading.Two>Heading 2</Heading.Two>
      <Heading.Three>Heading 3</Heading.Three>
      <Heading.Four>Heading 4</Heading.Four>
      <Space />
      <Section>Title</Section>
      <Title.One>Title 1</Title.One>
      <Title.Two>Title 2</Title.Two>
      <Title.Three>Title 3</Title.Three>
      <Space />
      <Section>Body</Section>
      <Body.Regular>Body Regular</Body.Regular>
      <Body.Regular bold>Body Regular Semi-bold</Body.Regular>
      <Body.Small>Body Small</Body.Small>
      <Body.Small bold>Body Small Semi-bold</Body.Small>
      <Space />
      <Section>Fine</Section>
      <Fine>Fine</Fine>
      <Fine bold>Fine Semi-bold</Fine>
      <Space />
      <Section>Link</Section>
      <Link href="https://www.vroom.com/" blank>
        Vroom.com
      </Link>
      <CustomLink href="https://www.vroom.com/" blank>
        Custom Vroom.com
      </CustomLink>
    </Container>
  );
};

export default {
  title: 'Design System/Foundation/Typography',
} as Meta;

const Section = styled(Body.Regular)`
  color: ${({ theme: { colors } }): string => colors.gray.two};
  letter-spacing: 1.25px;
  text-transform: uppercase;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Space = styled.div`
  margin: 8px 0;
`;

const CustomLink = styled(Link)`
  color: ${({ theme: { colors } }): string => colors.primary.brand};
`;
