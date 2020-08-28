import React from 'react';
import styled from 'styled-components';

import { Body, Hero, Title } from '../../atoms/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  margin-top: 16px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-evenly;
  min-width: 50%;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DetailBody = styled(Body.Small)`
  color: #6c717a;
`;

export interface Props {}

export const Overview: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Hero.Four>overview</Hero.Four>
      <Info>
        <Body.Regular>
          Could probably get formulaic with this copy to describe the high-level
          vehicle & manufacturer details here that don’t change with packages
          and trims like seating, MPG, drive type, transmission, fuel type,
          warranty information, average miles these 2019’s would have etc.
        </Body.Regular>
        <Details>
          <Detail>
            <div>Icon</div>
            <Title.Two>20 MPG</Title.Two>
            <DetailBody>Combined</DetailBody>
          </Detail>
          <Detail>
            <div>Icon</div>
            <Title.Two>20 MPG</Title.Two>
            <DetailBody>Combined</DetailBody>
          </Detail>
          <Detail>
            <div>Icon</div>
            <Title.Two>20 MPG</Title.Two>
            <DetailBody>Combined</DetailBody>
          </Detail>
        </Details>
      </Info>
    </Container>
  );
};
