import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../core/Icon';
import { Body, Hero, Title } from '../../core/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;

  @media (min-width: 600px) and (max-width: 839px) {
    margin-left: 64px;
    margin-right: 64px;
  }

  @media (max-width: 599px) {
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const Content = styled(Body.Regular)`
  @media (min-width: 600px) {
    margin-top: 32px;
  }

  @media (max-width: 599px) {
    margin-top: 16px;
  }
`;

const Details = styled.div`
  display: flex;
  width: 50%;

  @media (min-width: 600px) and (max-width: 839px) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 599px) {
    width: 100%;
  }
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  @media (min-width: 600px) {
    &:not(:last-child) {
      margin-right: 64px;
    }
  }

  @media (max-width: 599px) {
    :nth-child(2) {
      margin-right: auto;
      margin-left: auto;
    }
  }
`;

const Description = styled(Body.Small)`
  color: #6c717a;
`;

//TODO: Dynamic content - make these things into injectable content

const content = `The 2019 Jeep Wrangler is a great vehicle for anyone who wants an
          iconic, dependable, and rugged ride. Mostly influenced by the military
          Jeep from World War II, it remains the epitome of Jeep's brand. The
          reason these vehicles are so popular is their versatility to be used
          as a daily commuter during the week and an off-roader on the weekends.
          Available with two or four doors (Wrangler Unlimited) and a 6-speed
          manual or 8-speed automatic transmission, the Wrangler has adapted
          over the years to accommodate all drivers.`;

const details = [
  {
    icon: Icons.GAS,
    title: `20 MPG`,
    description: `Combined`,
  },
  {
    icon: Icons.ENGINE,
    title: `285 HP`,
    description: `@6,400 RPMs`,
  },
  {
    icon: Icons.SEAT,
    title: `Seats 5`,
    description: `Passengers`,
  },
];

export const Overview: React.FC = () => {
  return (
    <Container>
      <Hero.Four>overview</Hero.Four>
      <Info>
        <Details>
          {details.map((detail) => {
            const { icon, title, description } = detail;
            return (
              <Detail key={title}>
                <Icon icon={icon} />
                <Title.Two>{title}</Title.Two>
                <Description>{description}</Description>
              </Detail>
            );
          })}
        </Details>
        <Content>{content}</Content>
      </Info>
    </Container>
  );
};
