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

import useIsInExperiment from 'src/hooks/useIsInExperiment';

export interface Props {
  activeStep: number;
}

const VerificationStepper: React.FC<Props> = ({ activeStep }) => {
  const { isInExperiment: isInPhotosUploadExperiment } = useIsInExperiment(
    'verification-form-vehicle-photo-upload'
  );

  const steps = useMemo(() => {
    if (isInPhotosUploadExperiment) return photosExpSteps;
    return defaultSteps;
  }, [isInPhotosUploadExperiment]);

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
