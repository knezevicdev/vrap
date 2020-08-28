import React from 'react';
import styled from 'styled-components';

import { Body, Hero } from '../../atoms/Typography';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Lists = styled.div`
  display: flex;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-right: 16px;
  }
`;

const Item = styled.div`
  display: flex;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 416px;
  max-width: 416px;
`;

const Image = styled.div`
  min-height: 312px;
  min-width: 416px;
  max-height: 312px;
  max-width: 416px;
  background: lightgray;
`;

export interface OverviewProps {}

export const ProsAndCons: React.FC<OverviewProps> = ({}) => {
  return (
    <Container>
      <Info>
        <Hero.Four>pros & cons</Hero.Four>
        <Lists>
          <List>
            <Item>
              <div>icon</div>
              <Body.Regular>Off-road capabilities</Body.Regular>
            </Item>
            <Item>
              <div>icon</div>
              <Body.Regular>Off-road capabilities</Body.Regular>
            </Item>
            <Item>
              <div>icon</div>
              <Body.Regular>Off-road capabilities</Body.Regular>
            </Item>
          </List>
          <List>
            <Item>
              <div>icon</div>
              <Body.Regular>Off-road capabilities</Body.Regular>
            </Item>
            <Item>
              <div>icon</div>
              <Body.Regular>Off-road capabilities</Body.Regular>
            </Item>
          </List>
        </Lists>
      </Info>
      <ImageContainer>
        <Image />
        <Body.Fine>
          *Disclaimer copy here. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </Body.Fine>
      </ImageContainer>
    </Container>
  );
};
