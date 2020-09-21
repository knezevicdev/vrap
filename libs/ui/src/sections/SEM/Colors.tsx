import React from 'react';
import styled from 'styled-components';

import { Picture } from '../../atoms/Picture';
import { Body, Hero } from '../../atoms/Typography';

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
      src: '/images/JeepColors/firecraker_red.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Billet Silver Metallic',
    picture: {
      alt: 'Billet Silver Metallic',
      src: '/images/JeepColors/billet_silver_metallic.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Hellayella',
    picture: {
      alt: 'Hellayella',
      src: '/images/JeepColors/hellayella.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Ocean Blue Metallic',
    picture: {
      alt: 'Ocean Blue Metallic',
      src: '/images/JeepColors/ocean_blue_metallic.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Black',
    picture: {
      alt: 'Black',
      src: '/images/JeepColors/black.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Granite Crystal Metallic',
    picture: {
      alt: 'Granite Crystal Metallic',
      src: '/images/JeepColors/granite_crystal_metallic.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Mojito!',
    picture: {
      alt: 'Mojito!',
      src: '/images/JeepColors/mojito.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Bright White',
    picture: {
      alt: 'Bright White',
      src: '/images/JeepColors/bright_white.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Sting-Gray',
    picture: {
      alt: 'Sting-Gray',
      src: '/images/JeepColors/sting_gray.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'cover',
    },
  },
  {
    name: 'Punk’n Metallic',
    picture: {
      alt: 'Punk’n Metallic',
      src: '/images/JeepColors/punk_metallic.png',
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
