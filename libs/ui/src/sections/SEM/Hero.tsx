import React from 'react';
import styled from 'styled-components';

import { Picture } from '../../atoms/Picture';
import { Hero as TypographyHero } from '../../atoms/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Title = styled(TypographyHero.One)`
  font-family: Calibre;
  font-weight: 600;
`;

//TODO: Dynamic content - make these things into injectable content

const picture = {
  alt: 'Jeep',
  src: '/images/Hero-Jeep-image.png',
  width: 'auto',
  aspectRatio: '960:720',
};

const title = 'Jeep Wrangler';

export const Hero: React.FC = () => {
  return (
    <Container>
      <Picture {...picture} />
      <Title>{title}</Title>
    </Container>
  );
};
