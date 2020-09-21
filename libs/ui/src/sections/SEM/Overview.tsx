import React from 'react';
import styled from 'styled-components';

import Icon, { Icons } from '../../atoms/Icon/Icon';
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

  @media (max-width: 839px) {
    width: 100%;
    order: 2;
  }

  @media (min-width: 600px) and (max-width: 839px) {
    margin-top: 48px;
    margin-left: 64px;
    margin-right: 64px;
  }

  @media (max-width: 599px) {
    margin-top: 32px;
    margin-left: 24px;
    margin-right: 24px;
  }
`;

const Details = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-evenly;

  @media (min-width: 600) and (max-width: 839px) {
    margin: 0px 64px;
    width: 100%;
    order: 1;
    justify-content: flex-start;
  }

  @media (max-width: 599px) {
    margin: 0px 24px;
    width: 100%;
    order: 1;
  }
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  @media (max-width: 959px) {
    &:not(:last-child) {
      margin-right: 32px;
    }
  }
`;

const Description = styled(Body.Small)`
  color: #6c717a;
`;

const SectionTitle = styled(Hero.Four)`
  @media (min-width: 600px) and (max-width: 839px) {
    margin: 0px 64px;
  }

  @media (max-width: 599px) {
    margin: 0px 24px;
  }
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
      <SectionTitle>overview</SectionTitle>
      <Info>
        <Content>{content}</Content>
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
      </Info>
    </Container>
  );
};
