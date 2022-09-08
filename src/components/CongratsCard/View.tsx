import { Icon } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import CongratsCardViewModel from './ViewModel';

import { Icons } from 'src/core/Icon';
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

const InformationAccent = styled(Body.Regular)`
  color: #e7131a;
  font-weight: 600;
`;

const CongratsCardView = ({ viewModel }: Props): JSX.Element => {
  return (
    <Container>
      <Icon
        icon={Icons.CONGRATS_DOCUMENT}
        title="document"
        aria-hidden="true"
      />
      <Hero.Three>{viewModel.title}</Hero.Three>
      <Information>
        <Body.Regular>{viewModel.information1}</Body.Regular>
        <InformationAccent>{viewModel.information2}</InformationAccent>
      </Information>
      <Information>
        <Body.Regular>{viewModel.loanInformation1}</Body.Regular>
        <Body.Regular>
          {viewModel.loanInformation2}
          <InformationAccent>
            {viewModel.loanInformationPhone}
          </InformationAccent>
        </Body.Regular>
      </Information>
    </Container>
  );
};

export default CongratsCardView;
