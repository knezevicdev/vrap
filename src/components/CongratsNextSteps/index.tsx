import { Typography } from '@vroom-web/ui-lib';
import React from 'react';

import {
  ColoredBullet,
  StepNumber,
  StepsWrapper,
  StyledContainer,
  StyledDiv,
  StyledHero,
  StyledTitle,
} from './Style.css';

const steps = [
  {
    id: 1,
    description:
      'Expect to receive an email or a physical package by mail with contracts to sign.',
    title: 'Sign documents',
  },
  {
    id: 2,
    description:
      'Our shipping specialists will schedule a time to come pick up your car.',
    title: 'We pick up',
  },
  {
    id: 3,
    description: `Once we have your car, we'll process your payment within 2-3 business days.`,
    title: 'You get paid',
  },
];

const CongratsNextSteps = () => {
  return (
    <StyledContainer>
      <StyledHero>what to expect next...</StyledHero>
      <StepsWrapper>
        {steps.map((step) => (
          <ColoredBullet key={step.id}>
            <StyledTitle>
              <StepNumber>{step.id}</StepNumber>
              <Typography.Title.Three>{step.title}</Typography.Title.Three>
            </StyledTitle>
            <StyledDiv>
              <Typography.Body.Regular>
                {step.description}
              </Typography.Body.Regular>
            </StyledDiv>
          </ColoredBullet>
        ))}
      </StepsWrapper>
    </StyledContainer>
  );
};

export default CongratsNextSteps;
