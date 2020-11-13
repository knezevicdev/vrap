import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import CheckByMail from '../../components/CheckByMail';
import DirectDeposit from '../../components/DirectDeposit';
import PayOptions from '../../components/PayOptions';
import OptionsViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import Icon, { Icons } from 'src/core/Icon';
import { Body, Hero, Title } from 'src/core/Typography';

const OptionsContainer = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  margin: 0 20px;
  padding: 30px 100px;
  box-shadow: 0px 0px 4px #e0e0e0;
  height: 100%;

  @media (max-width: 1280px) {
    margin: 20px;
    padding: 30px 60px;
    width: 100%;
  }

  @media (max-width: 420px) {
    margin: 0;
    padding: 20px;
    box-shadow: none;
  }
`;

const StyledHero = styled(Hero.Three)`
  padding: 0 35px 0 0;
  text-align: center;
`;

const Line = styled.hr`
  margin: 30px 0 20px;
`;

const OptionsTitle = styled(Title.Three)`
  font-weight: 600;
  display: flex;
`;

const OptionsBody = styled(Body.Regular)`
  display: flex;
  padding: 15px 0;
`;

const OptionTitleIcon = styled(Icon)`
  margin: auto 10px auto 0;
`;

const SubmitButton = styled(Button.Primary)`
  margin: 15px 0 30px;
  max-width: 180px;
  white-space: normal;
  width: 100%;

  @media (max-width: 420px) {
    max-width: 100%;
  }
`;

export interface Props {
  viewModel: OptionsViewModel;
}

const OptionsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <OptionsContainer>
      <StyledHero>{viewModel.hero}</StyledHero>
      <Line />
      <OptionsTitle>
        <OptionTitleIcon icon={Icons.RED_ONE} />
        {viewModel.optionTitle}
      </OptionsTitle>
      <OptionsBody>{viewModel.optionQuestion}</OptionsBody>
      <PayOptions
        optionMeta={viewModel.getPayOptionArray()}
        selected={viewModel.getPayOptionSelected()}
        handleClick={viewModel.onPayOptionClick}
      />
      <OptionsBody>{viewModel.bankInfo}</OptionsBody>
      {viewModel.showDirectDeposit() ? <DirectDeposit /> : <CheckByMail />}
      <SubmitButton
        onClick={() => {
          return;
        }}
      >
        {viewModel.submit}
      </SubmitButton>
    </OptionsContainer>
  );
};

export default observer(OptionsView);
