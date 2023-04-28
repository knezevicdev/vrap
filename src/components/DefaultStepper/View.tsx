import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import styled from 'styled-components';

export interface Props {
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

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StepperProgress = styled(CircularProgressbar)`
  width: 42px;
  height: 42px;
`;

const StepperText = styled.div`
  margin-left: 10px;
  margin-bottom: 5px;
`;

const Title = styled.div`
  font-family: Calibre;
  font-size: 18px;
  letter-spacing: 0.25px;
  font-weight: 600;
  color: #041022;
`;

const SubTitle = styled.div`
  width: 250px;
  height: 16px;
  font-family: Calibre;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: 0.35px;
  color: #6c717a;
`;

export default Stepper;
