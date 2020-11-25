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

const Title = styled(Hero.Three)`
  font-weight: 800;
  font-style: italic;
  letter-spacing: 1px;
  color: #e7131a !important;
  margin-bottom: 32px;
`;

const CertifiedTitle = styled(Title)`
  margin-bottom: 5px;
`;

const Description = styled(Body.Regular)`
  color: #041022;
  max-width: 500px;
  margin-top: 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled(Section)`
  display: block;
`;

const VideoTitle = styled(Title)`
  color: #041022 !important;
  max-width: 420px !important;
  margin: 0 auto;
  margin-bottom: 32px;
`;

const IframeContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
`;

const TestDriveImage = styled.img`
  max-width: 640px;
`;

const UnderlinedLink = styled(Link)`
  color: #e7131a !important;
  font-weight: bold !important;
`;
const Bold = styled.span`
  font-weight: bold !important;
`;

export const VideoSection: FC = () => {
  return (
    <VideoContainer>
      <VideoTitle>Buy, sell, or trade vehicles all from your couch</VideoTitle>
      <IframeContainer>
        <StyledIframe
          src={'https://www.youtube.com//embed/-Mx5vjqeXgY'}
        ></StyledIframe>
      </IframeContainer>
    </VideoContainer>
  );
};

export const CertifiedSection: FC = () => {
  return (
    <Section>
      <TitleContainer>
        <Icon icon={Icons.VROOM_SHIELD} />

        <CertifiedTitle>vroom certified</CertifiedTitle>
      </TitleContainer>
      <Image
        src={`${publicRuntimeConfig.BASE_PATH}/images/V2V/test-drive.png`}
      />
      <Description>
        All our vehicles go through a 100 point inspection and come with{' '}
        <UnderlinedLink href={'https://www.google.com'}>
          Vroom’s free limited warranty
        </UnderlinedLink>
        , good for 90 days or 6,000 miles.
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
      <Title>Delivered right to your door</Title>
      <Image src={`${publicRuntimeConfig.BASE_PATH}/images/V2V/delivery.png`} />
      <Description>
        Buy this vehicle and get it delivered to your driveway safely and
        contact-free.
      </Description>
    </Section>
  );
};

export const ButtonSection: FC = () => {
  const onClick = (): void => {
    window.location.href = 'https://www.google.com';
  };
  return (
    <Button.Secondary onClick={onClick}>
      LEARN MORE ABOUT VROOM
    </Button.Secondary>
  );
};
