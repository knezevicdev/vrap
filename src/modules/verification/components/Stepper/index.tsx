import React, { useMemo } from 'react';

import { defaultSteps, photosExpSteps } from './data';
import {
  Circle,
  Container,
  ItemContainer,
  Line,
  LineContainer,
  ProgressContainer,
  StepTitle,
  TextContainer,
} from './Styled.css';

export interface Props {
  activeStep: number;
  shouldShowPhotosUpload: boolean;
}

const VerificationStepper: React.FC<Props> = ({
  activeStep,
  shouldShowPhotosUpload,
}) => {
  const steps = useMemo(() => {
    if (shouldShowPhotosUpload) return photosExpSteps;
    return defaultSteps;
  }, [shouldShowPhotosUpload]);

  return (
    <Container>
      <ProgressContainer>
        {steps.map((_, idx) => {
          const active = activeStep >= idx ? 'active' : '';
          return (
            <ItemContainer key={idx}>
              <LineContainer>
                {idx !== 0 && <Line className={active} />}
                <Circle className={active} />
              </LineContainer>
            </ItemContainer>
          );
        })}
      </ProgressContainer>
      <TextContainer>
        {steps.map((step, idx) => {
          return (
            <StepTitle key={idx} className={activeStep >= idx ? 'active' : ''}>
              {step}
            </StepTitle>
          );
        })}
      </TextContainer>
    </Container>
  );
};

export default VerificationStepper;
