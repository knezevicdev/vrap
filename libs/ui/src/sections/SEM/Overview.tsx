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
  flex-wrap: wrap;
`;

const Content = styled(Body.Regular)`
  width: 50%;

  @media (max-width: 959px) {
    width: 100%;
    order: 2;
  }

  @media (min-width: 600px) and (max-width: 959px) {
    margin-top: 48px;
  }

  @media (max-width: 599px) {
    margin-top: 32px;
  }
`;

const Details = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-evenly;
  @media (max-width: 959px) {
    width: 100%;
    order: 1;
    justify-content: flex-start;
  }
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  @media (max-width: 959px) {
    margin-right: 32px;
  }
`;

const DetailBody = styled(Body.Small)`
  color: #6c717a;
`;

export const Overview: React.FC = () => {
  return (
    <Container>
      <Hero.Four>overview</Hero.Four>
      <Info>
        <Content>
          Could probably get formulaic with this copy to describe the high-level
          vehicle & manufacturer details here that don’t change with packages
          and trims like seating, MPG, drive type, transmission, fuel type,
          warranty information, average miles these 2019’s would have etc.
        </Content>
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
