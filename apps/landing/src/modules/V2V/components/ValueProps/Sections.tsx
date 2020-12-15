import getConfig from 'next/config';
import React, { FC } from 'react';
import styled from 'styled-components';

import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero, Link } from 'src/core/Typography';

const { publicRuntimeConfig } = getConfig();

const Section = styled.div`
  width: 100%;
  margin-bottom: 76px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(Hero.Two)`
  font-weight: 800;
  font-style: italic;
  letter-spacing: 1px;
  color: #e7131a !important;
  margin-bottom: 32px !important;
`;

const CertifiedTitle = styled(Title)`
  margin-bottom: 5px !important;
`;

const Description = styled(Body.Regular)`
  color: #041022;
  max-width: 590px;
  margin-top: 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px !important;
`;

const TestDriveImage = styled.img`
  width: 100%;
  max-width: 640px;
`;

const SizedIcon = styled(Icon)`
  width: 100% !important;
  height: auto !important;
  max-width: 590px !important;
`;

const DeliveredImageContainer = styled.div`
  width: 100%;
  position: relative;
  @media (max-width: 768px) {
    margin-top: -5%;
    margin-bottom: 62%;
  }
`;
const DeliveredImage = styled.img`
  max-width: none;
  @media (max-width: 768px) {
    position: absolute;
    width: 169% !important;
    left: 0;
  }
`;

const UnderlinedLink = styled(Link)`
  color: #e7131a !important;
`;
const Bold = styled.span`
  font-weight: bold !important;
`;

export const CertifiedSection: FC = () => {
  return (
    <Section>
      <TitleContainer>
        <Icon icon={Icons.VROOM_SHIELD} />
        <CertifiedTitle>vroom certified</CertifiedTitle>
      </TitleContainer>
      <SizedIcon icon={Icons.CAR_DIAGRAM} />

      <Description>
        All our vehicles go through a 100 point inspection and come with{' '}
        <UnderlinedLink href={'https://www.vroom.com/protection'}>
          Vroom’s&nbsp;free&nbsp;limited&nbsp;warranty
        </UnderlinedLink>
        , good for 90&nbsp;days or 6,000&nbsp;miles.
      </Description>
    </Section>
  );
};

export const TestDriveSection: FC = () => {
  return (
    <Section>
      <Title>7 Day Test Drive</Title>
      <TestDriveImage
        src={`${publicRuntimeConfig.BASE_PATH}/images/V2V/test-drive.png`}
      />
      <Description>
        Take a week getting to know your new ride. Drive up to{' '}
        <Bold>250 miles</Bold> and if it’s not for you, we’ll take it back.
      </Description>
    </Section>
  );
};

export const DeliveredSection: FC = () => {
  return (
    <Section>
      <Title>Delivered right to your&nbsp;driveway</Title>
      <DeliveredImageContainer>
        <DeliveredImage
          src={`${publicRuntimeConfig.BASE_PATH}/images/V2V/delivery.png`}
        />
      </DeliveredImageContainer>
      <Description>
        Buy this vehicle and get it delivered to your driveway safely and
        contact-free.
      </Description>
    </Section>
  );
};

export const ButtonSection: FC = () => {
  const onClick = (): void => {
    window.location.href =
      'https://vroom.zendesk.com/hc/en-us/articles/205360565-When-does-the-7-day-return-period-begin-';
  };
  return (
    <Button.Secondary onClick={onClick}>
      LEARN MORE ABOUT VROOM
    </Button.Secondary>
  );
};
