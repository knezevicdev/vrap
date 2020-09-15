import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../atoms/Icon';
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
          The 2019 Jeep Wrangler is a great vehicle for anyone who wants an
          iconic, dependable, and rugged ride. Mostly influenced by the military
          Jeep from World War II, it remains the epitome of Jeep's brand. The
          reason these vehicles are so popular is their versatility to be used
          as a daily commuter during the week and an off-roader on the weekends.
          Available with two or four doors (Wrangler Unlimited) and a 6-speed
          manual or 8-speed automatic transmission, the Wrangler has adapted
          over the years to accommodate all drivers.
        </Content>
        <Details>
          <Detail>
            <Icon icon={Icons.GAS} />
            <Title.Two>20 MPG</Title.Two>
            <DetailBody>Combined</DetailBody>
          </Detail>
          <Detail>
            <Icon icon={Icons.ENGINE} />
            <Title.Two>285 HP</Title.Two>
            <DetailBody>{'@6,400 RPMs'}</DetailBody>
          </Detail>
          <Detail>
            <Icon icon={Icons.SEAT} />
            <Title.Two>Seats 5</Title.Two>
            <DetailBody>Passengers</DetailBody>
          </Detail>
        </Details>
      </Info>
    </Container>
  );
};
