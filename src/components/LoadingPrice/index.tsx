import { Typography } from '@vroom-web/ui-lib';
import React from 'react';

import { StyledBody, StyledContainer } from './Style.css';

const LoadingPrice = () => {
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

export default LoadingPrice;
