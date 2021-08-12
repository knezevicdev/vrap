import React from 'react';
import styled from 'styled-components';

import CongratsCardViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon/Icon';
import { Body, Hero } from 'src/core/Typography';

interface Props {
  viewModel: CongratsCardViewModel;
}

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr, 3);
  gap: 16px;
  justify-items: center;
  align-items: center;
  text-align: center;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
`;

const CongratsCardView = ({ viewModel }: Props): JSX.Element => {
  return (
    <Container>
      <Icon icon={Icons.CONGRATS_DOCUMENT} />
      <Hero.Three>{viewModel.title}</Hero.Three>
      <Information>
        <Body.Regular>{viewModel.information1}</Body.Regular>
        <Body.Regular>{viewModel.information2}</Body.Regular>
      </Information>
    </Container>
  );
};

export default CongratsCardView;
