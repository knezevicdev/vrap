import { Typography } from '@vroom-web/ui-lib';
import React from 'react';

import {
  ColoredBullet,
  StyledContainer,
  StyledDiv,
  StyledHero,
  StyledTitle,
} from './Style.css';

const NextSteps = () => {
  return (
    <StyledContainer>
      <StyledHero>next steps</StyledHero>
      <ColoredBullet>
        <StyledTitle>
          <Typography.Title.Three>Verify Ownership</Typography.Title.Three>
        </StyledTitle>
        <StyledDiv>
          <Typography.Body.Regular>
            We&apos;ll request relevant documents and additional information to
            verify vehicle ownership before the price expires.
          </Typography.Body.Regular>
        </StyledDiv>
      </ColoredBullet>
      <ColoredBullet>
        <StyledTitle>
          <Typography.Title.Three>Sign Contracts</Typography.Title.Three>
        </StyledTitle>
        <StyledDiv>
          <Typography.Body.Regular>
            We&apos;ll send an email with a contract to e-Sign, and may require
            some additional paperwork by mail in order to finalize the deal.
          </Typography.Body.Regular>
        </StyledDiv>
      </ColoredBullet>
      <ColoredBullet>
        <StyledTitle>
          <Typography.Title.Three>
            We Pick Up, You Get Paid
          </Typography.Title.Three>
        </StyledTitle>
        <StyledDiv>
          <Typography.Body.Regular>
            We&apos;ll schedule a time to pick up your vehicle. Once we have
            your car, we&apos;ll send your payment within 2-3 business days.
          </Typography.Body.Regular>
        </StyledDiv>
      </ColoredBullet>
    </StyledContainer>
  );
};

export default NextSteps;
