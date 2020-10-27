import React from 'react';
import styled from 'styled-components';

import OptionsViewModel from './ViewModel';

import { Body, Hero, Title } from 'src/core/Typography';
import Icon, { Icons } from 'src/core/Icon';

const OptionsContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  margin: 0 20px;
  padding: 30px 100px;
  box-shadow: 0px 0px 4px #e0e0e0;
`;

const StyledHero = styled(Hero.Three)`
  padding: 0 35px 0 0;
  text-align: center;
`;

const Line = styled.hr`
  margin: 30px 0 20px;
`;

const SectionTitle = styled(Title.Three)`
  font-weight: 600;
  display: flex;
`;

const SectionQuestion = styled(Body.Regular)`
  display: flex;
  padding: 15px 0;
`;

const SectionTitleIcon = styled(Icon)`
  margin: auto 10px auto 0;
`;

export interface Props {
  viewModel: OptionsViewModel;
}

const OptionsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <OptionsContainer>
      <StyledHero>{viewModel.hero}</StyledHero>
      <Line />
      <SectionTitle>
        <SectionTitleIcon icon={Icons.RED_ONE} />
        {viewModel.sectionTitle}
      </SectionTitle>
      <SectionQuestion>{viewModel.sectionQuestion}</SectionQuestion>
    </OptionsContainer>
  );
};

export default OptionsView;
