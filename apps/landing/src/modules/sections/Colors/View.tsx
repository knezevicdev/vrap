import React from 'react';
import styled from 'styled-components';

import { Picture } from '../../../core/Picture';
import { Body, Hero } from '../../../core/Typography';
import ColorsViewModel from './ViewModel';

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

interface Props {
  viewModel: ColorsViewModel;
}

const ColorsView: React.FC<Props> = ({ viewModel }) => {
  const { colors, sectionTitle } = viewModel;
  return (
    <Container>
      <SectionTitle>{sectionTitle}</SectionTitle>
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

export default ColorsView;
