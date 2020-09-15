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

export interface Props {
  data: {
    title: string;
  };
}

export const Hero: React.FC<Props> = ({ data: { title } }) => {
  return (
    <Container>
      <Picture
        alt="Hero Background"
        src="/images/Hero-Jeep-image.png"
        width="auto"
        aspectRatio="960:720"
      />
      <Title>{title}</Title>
    </Container>
  );
};
