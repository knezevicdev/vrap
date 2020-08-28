import React from 'react';
import styled from 'styled-components';

import { Body, Hero, Title } from '../../atoms/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Award = styled.div`
  display: flex;
  width: 100%;
  margin-top: 32px;
`;

const Image = styled.div`
  min-height: 126px;
  min-width: 96px;
  max-height: 126px;
  max-width: 96px;
  margin-right: 16px;
  background: lightgray;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface Props {}

export const Awards: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Hero.Four>Awards & Accolades</Hero.Four>
      <Award>
        <Image />
        <Info>
          <Title.Two>2019 JD Power Award</Title.Two>
          <Body.Regular>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu
            imperdiet pellentesque aliquet sceleris at.
          </Body.Regular>
        </Info>
      </Award>
    </Container>
  );
};
