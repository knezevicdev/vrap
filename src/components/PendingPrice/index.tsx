import { Typography } from '@vroom-web/ui-lib';
import React, { useEffect } from 'react';

import { Icons } from '../../core/Icon';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';
import {
  StyledBody,
  StyledButton,
  StyledContainer,
  StyledIcon,
} from './Style.css';

const PendingPrice: React.FC = () => {
  useEffect(() => {
    new AnalyticsHandler().trackNoPrice();
  }, []);

  return (
    <StyledContainer>
      <Typography.Heading.Four>sit tight</Typography.Heading.Four>
      <StyledIcon
        title="Car"
        titleId="heroIcon"
        icon={Icons.CAR_OFFER}
        aria-hidden="true"
      />

      <StyledBody>
        <Typography.Body.Regular>
          Our buying specialists are taking a closer look and will send your
          price by email in one business day.
        </Typography.Body.Regular>
      </StyledBody>
      <StyledBody>
        <Typography.Body.Regular>
          <i>Please be sure to check your spam folder.</i>
        </Typography.Body.Regular>
      </StyledBody>
      <StyledButton onClick={() => (window.location.href = '/cars')}>
        find your next car
      </StyledButton>
    </StyledContainer>
  );
};

export default PendingPrice;
