import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { buildStyles } from 'react-circular-progressbar';

import {
  StepperContainer,
  StepperProgress,
  StepperText,
  SubTitle,
  Title,
} from './Styled.css';

interface Props {
  activeStep: number;
}

const steps = [
  {
    step: '1',
    progress: '25',
    next: 'Document upload',
    title: 'Verify Your Info',
  },
  {
    step: '2',
    progress: '50',
    next: 'Review your information',
    title: 'Additional Docs',
  },
  {
    step: '3',
    progress: '75',
    next: 'Payment Method',
    title: 'Review',
  },
  {
    step: '4',
    progress: '100',
    next: 'Your Information is submitted',
    title: 'Payment Method',
  },
];

const Stepper: React.FC<Props> = ({ activeStep }) => {
  const { step, progress, next, title } = steps[activeStep];

  return (
    <StepperContainer>
      <StepperProgress
        value={parseInt(progress)}
        text={step}
        strokeWidth={12}
        styles={buildStyles({
          textColor: '#041022',
          pathColor: '#1960D0',
          trailColor: '#d6d6d6',
          textSize: '45px',
          strokeLinecap: 'butt',
        })}
      />
      <StepperText>
        <Title>{title}</Title>
        <SubTitle>
          Next:&nbsp;
          {next}
        </SubTitle>
      </StepperText>
    </StepperContainer>
  );
};

export default Stepper;
