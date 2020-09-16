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

//TODO: Look into scrolling functionality without scrollbar.
const Items = styled.div`
  display: flex;
  margin-top: 16px;
  overflow: auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
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
      objectFit: 'contain',
    },
  },
  {
    name: 'Billet Silver Metallic',
    picture: {
      alt: 'Billet Silver Metallic',
      src: '/images/JeepColors/billet_silver_metallic.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'contain',
    },
  },
  {
    name: 'Hellayella',
    picture: {
      alt: 'Hellayella',
      src: '/images/JeepColors/hellayella.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'contain',
    },
  },
  {
    name: 'Ocean Blue Metallic',
    picture: {
      alt: 'Ocean Blue Metallic',
      src: '/images/JeepColors/ocean_blue_metallic.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'contain',
    },
  },
  {
    name: 'Black',
    picture: {
      alt: 'Black',
      src: '/images/JeepColors/black.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'contain',
    },
  },
  {
    name: 'Granite Crystal Metallic',
    picture: {
      alt: 'Granite Crystal Metallic',
      src: '/images/JeepColors/granite_crystal_metallic.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'contain',
    },
  },
  {
    name: 'Mojito!',
    picture: {
      alt: 'Mojito!',
      src: '/images/JeepColors/mojito.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'contain',
    },
  },
  {
    name: 'Bright White',
    picture: {
      alt: 'Bright White',
      src: '/images/JeepColors/bright_white.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'contain',
    },
  },
  {
    name: 'Sting-Gray',
    picture: {
      alt: 'Sting-Gray',
      src: '/images/JeepColors/sting_gray.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'contain',
    },
  },
  {
    name: 'Punk’n Metallic',
    picture: {
      alt: 'Punk’n Metallic',
      src: '/images/JeepColors/punk_metallic.png',
      width: '113.5px',
      height: '64px',
      objectFit: 'contain',
    },
  },
];

export const Colors: React.FC = () => {
  return (
    <Container>
      <Hero.Four>available colors</Hero.Four>
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
