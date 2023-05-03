import { Button, Icon, Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import PendingPriceViewModel from './ViewModel';

import { Icons } from 'src/core/Icon';
interface Props {
  viewModel: PendingPriceViewModel;
}

const PendingPriceView: React.FC<Props> = ({ viewModel }) => {
  useEffect(() => {
    viewModel.onPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <StyledButton onClick={viewModel.handleFindCar}>
        find your next car
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
`;

const StyledBody = styled.div`
  max-width: 410px;
  margin: auto;
`;

const StyledIcon = styled(Icon)`
  padding: 20px;
`;

const StyledButton = styled(Button.Primary)`
  margin: 30px 0;
  width: 100%;
  max-width: 300px;
`;

export default observer(PendingPriceView);
