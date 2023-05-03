import { Icon, Typography } from '@vroom-web/ui-lib';
import React from 'react';

import { Container, Information, InformationAccent } from './Style.css';

import { Icons } from 'src/core/Icon';

const CongratsCard = (): JSX.Element => {
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

export default CongratsCard;
