import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

import { Picture } from '../../core/Picture';
import { Body, Hero } from '../../core/Typography';

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Items = styled.div`
  display: flex;
  margin-top: 16px;
  overflow: auto;

  @media (min-width: 600px) and (max-width: 839px) {
    margin-left: 64px;
  }

  @media (max-width: 599px) {
    margin-left: 24px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
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

const colors = [
  {
    name: 'Firecracker Red',
    picture: {
      alt: 'Firecracker Red',
      src: `${BASE_PATH}/images/Hero-Jeep-image.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Bikini Pearlcoat',
    picture: {
      alt: 'Bikini Pearlcoat',
      src: `${BASE_PATH}/images/Bikini Pearlcoat.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Billet Silver Metallic',
    picture: {
      alt: 'Billet Silver Metallic',
      src: `${BASE_PATH}/images/Billet Silver Metallic.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Hellayella',
    picture: {
      alt: 'Hellayella',
      src: `${BASE_PATH}/images/Hellayella.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Ocean Blue Metallic',
    picture: {
      alt: 'Ocean Blue Metallic',
      src: `${BASE_PATH}/images/Ocean Blue Metallic.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Black',
    picture: {
      alt: 'Black',
      src: `${BASE_PATH}/images/Black.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Granite Crystal Metallic',
    picture: {
      alt: 'Granite Crystal Metallic',
      src: `${BASE_PATH}/images/Granite Crystal Metallic.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Mojito!',
    picture: {
      alt: 'Mojito!',
      src: `${BASE_PATH}/images/Mojito!.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Bright White',
    picture: {
      alt: 'Bright White',
      src: `${BASE_PATH}/images/Bright White.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Sting-Gray',
    picture: {
      alt: 'Sting-Gray',
      src: `${BASE_PATH}/images/Sting-Gray.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Punk’n Metallic',
    picture: {
      alt: 'Punk’n Metallic',
      src: `${BASE_PATH}/images/Punk’n Mettalic.png`,
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
];

export const Colors: React.FC = () => {
  return (
    <Container>
      <SectionTitle>available colors</SectionTitle>
      <Items>
        {colors.map((color) => {
          const { name, picture } = color;
          return (
            <Item key={name}>
              <Picture {...picture} />
              <Body.Small>{name}</Body.Small>
            </Item>
          );
        })}
      </Items>
    </Container>
  );
};
