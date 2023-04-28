import { Typography } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

const LoadingPriceView = () => {
  return (
    <StyledContainer>
      <Typography.Heading.Four>Loading</Typography.Heading.Four>

      <StyledBody>
        <Typography.Body.Regular>
          We&apos;re grabbing your data fresh out the oven. Thanks for your
          patience.
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
