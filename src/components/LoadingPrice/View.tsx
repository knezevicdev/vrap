import { Typography } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import LoadingPriceViewModel from './ViewModel';

interface Props {
  viewModel: LoadingPriceViewModel;
}

const LoadingPriceView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <Typography.Heading.Four>{viewModel.loading}</Typography.Heading.Four>

      <StyledBody>
        <Typography.Body.Regular>
          {viewModel.pleaseWait}
        </Typography.Body.Regular>
      </StyledBody>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
`;

const StyledBody = styled.div`
  margin: auto;
  padding: 30px;
`;

export default LoadingPriceView;
