import { Icon, Typography } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { Icons } from 'src/core/Icon';

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

const CongratsCardView = (): JSX.Element => {
  return (
    <Container>
      <Icon
        icon={Icons.CONGRATS_DOCUMENT}
        title="document"
        aria-hidden="true"
      />
      <Typography.Heading.Three>
        thank you for submitting
      </Typography.Heading.Three>
      <Information>
        <Typography.Body.Regular>
          Don&apos;t hesitate to contact us if you have questions.
        </Typography.Body.Regular>
        <InformationAccent>
          paperwork@vroom.com or (855) 534-3755.
        </InformationAccent>
      </Information>
      <Information>
        <Typography.Body.Regular>
          We may contact you to confirm your loan information.
        </Typography.Body.Regular>
        <Typography.Body.Regular>
          Look out for a phone call from&nbsp;
          <InformationAccent>+1 (214) 817-2271.</InformationAccent>
        </Typography.Body.Regular>
      </Information>
    </Container>
  );
};

export default CongratsCardView;
