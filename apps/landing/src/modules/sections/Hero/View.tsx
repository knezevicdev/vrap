import React from 'react';
import styled from 'styled-components';

import { Picture } from '../../../core/Picture';
import { Hero as TypographyHero } from '../../../core/Typography';
import HeroViewModel from './ViewModel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;

  @media (min-width: 600px) and (max-width: 839px) {
    margin: 0px 64px;
  }
`;

const Title = styled(TypographyHero.One)`
  font-family: Calibre;
  font-weight: 600;

  @media (max-width: 599px) {
    margin: 0px 24px;
  }
`;

interface Props {
  viewModel: HeroViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const { picture, title } = viewModel;
  return (
    <Container>
      <Picture {...picture} />
      <Title>{title}</Title>
    </Container>
  );
};

export default HeroView;
