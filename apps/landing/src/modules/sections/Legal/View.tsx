import React from 'react';
import styled from 'styled-components';

import { Body } from '../../../core/Typography';
import LegalViewModel from './ViewModel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;

  @media (min-width: 600px) and (max-width: 839px) {
    margin-left: 64px;
    margin-right: 64px;
  }

  @media (max-width: 599px) {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

const Content = styled(Body.Fine)`
  color: #6c717a;
  margin-bottom: 32px;

  @media (min-width: 840px) {
    margin-top: 72px;
  }

  @media (max-width: 839px) {
    margin-top: 64px;
  }
`;

interface Props {
  viewModel: LegalViewModel;
}

const LegalView: React.FC<Props> = ({ viewModel }) => {
  const { content } = viewModel;
  return (
    <Container>
      <Content>{content}</Content>
    </Container>
  );
};

export default LegalView;
