import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import { Picture } from '../../../core/Picture';
import { Hero as TypographyHero } from '../../../core/Typography';
import HeroViewModel from './ViewModel';

import { Button } from 'src/core/Button';

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
    align-self: flex-start;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  @media (max-width: 599px) {
    flex-direction: column;
    margin: 0 24px;
  }
`;

const StyledButton = styled(Button.Primary)`
  padding: 12px 72px;
  margin: 0;
  @media (max-width: 599px) {
    width: 100%;
  }
`;
interface Props {
  viewModel: HeroViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const { picture, title, onClick, button, isVariant } = viewModel;
  return (
    <Container>
      <Picture {...picture} />
      <TitleContainer>
        <Title>{title}</Title>
        {isVariant && <StyledButton onClick={onClick}>{button}</StyledButton>}
      </TitleContainer>
    </Container>
  );
};

export default observer(HeroView);
