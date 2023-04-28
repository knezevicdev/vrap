import { Typography } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

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

const CongratsNextStepsView = () => {
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

const StyledContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  padding: 40px 16px;
`;

const StyledHero = styled(Typography.Heading.Three)`
  padding: 0 0 35px 0;
  text-align: center;
`;

const StepsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  gap: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ColoredBullet = styled.div`
  margin: 0;
  padding: 0 25px;
  counter-increment: section;
  position: relative;
`;

const StepNumber = styled.div`
  background-color: #e7131a;
  border-radius: 50%;
  color: white;
  font-family: Calibre;
  height: 20px;
  width: 20px;
  text-align: center;
  margin-right: 8px;
  font-weight: 600;
`;

const StyledDiv = styled.div`
  padding: 0 0 20px 0;
  border-radius: 50%;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CongratsNextStepsView;
