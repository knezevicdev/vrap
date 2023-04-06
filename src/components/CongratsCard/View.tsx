import { Icon, Typography } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import CongratsCardViewModel from './ViewModel';

import { Icons } from 'src/core/Icon';

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

const InformationAccent = styled(Typography.Body.Regular)`
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
      <Typography.Heading.Three>{viewModel.title}</Typography.Heading.Three>
      <Information>
        <Typography.Body.Regular>
          {viewModel.information1}
        </Typography.Body.Regular>
        <InformationAccent>{viewModel.information2}</InformationAccent>
      </Information>
      <Information>
        <Typography.Body.Regular>
          {viewModel.loanInformation1}
        </Typography.Body.Regular>
        <Typography.Body.Regular>
          {viewModel.loanInformation2}
          <InformationAccent>
            {viewModel.loanInformationPhone}
          </InformationAccent>
        </Typography.Body.Regular>
      </Information>
    </Container>
  );
};

export default CongratsCardView;
