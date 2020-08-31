import React from 'react';
import styled from 'styled-components';

import { Body, Hero } from '../../atoms/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

//TODO: Look into scrolling functionality without scrollbar.
const Items = styled.div`
  display: flex;
  margin-top: 16px;
  overflow: auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.div`
  height: 64px;
  width: 64px;
  background: lightgray;
`;

export const Colors: React.FC = () => {
  return (
    <Container>
      <Hero.Four>available colors</Hero.Four>
      <Items>
        <Item>
          <Image />
          <Body.Small>Silver</Body.Small>
        </Item>
        <Item>
          <Image />
          <Body.Small>Silver</Body.Small>
        </Item>
        <Item>
          <Image />
          <Body.Small>Silver</Body.Small>
        </Item>
        <Item>
          <Image />
          <Body.Small>Silver</Body.Small>
        </Item>
        <Item>
          <Image />
          <Body.Small>Silver</Body.Small>
        </Item>
        <Item>
          <Image />
          <Body.Small>Silver</Body.Small>
        </Item>
      </Items>
    </Container>
  );
};
