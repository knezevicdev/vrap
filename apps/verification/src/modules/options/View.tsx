import React from 'react';
import styled from 'styled-components';

import OptionsViewModel from './ViewModel';

import { Hero } from 'src/core/Typography';

const OptionsContainer = styled.div`
  background: white;
  width: 779px;
  border: 1px solid #e0e0e0;
  margin: 0 20px;
  box-shadow: 0px 0px 4px #e0e0e0;
`;

const StyledHero = styled(Hero.Three)`
  padding: 0 0 35px 0;
  text-align: center;
`;

export interface Props {
  viewModel: OptionsViewModel;
}

const OptionsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <OptionsContainer>
      <StyledHero>{viewModel.hero}</StyledHero>
    </OptionsContainer>
  );
};

export default OptionsView;
