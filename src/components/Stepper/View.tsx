import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { Stepper } from 'src/interfaces.d';

export interface Props {
  viewModel: ViewModel;
  activeStep: Stepper;
}

const VerificationStepperView: React.FC<Props> = ({
  activeStep,
  viewModel,
}) => {
  return (
    <Container>
      <ProgressContainer>
        {viewModel.steps.map((item) => {
          const active =
            parseInt(activeStep.step) >= parseInt(item.step) ? 'active' : '';
          return (
            <ItemContainer key={item.step}>
              <LineContainer>
                {item.step !== '1' && <Line className={active} />}
                <Circle className={active} />
              </LineContainer>
            </ItemContainer>
          );
        })}
      </ProgressContainer>
      <TextContainer>
        {viewModel.steps.map((item) => {
          return (
            <StepTitle
              key={item.step}
              className={
                parseInt(activeStep.step) >= parseInt(item.step) ? 'active' : ''
              }
            >
              {item.title}
            </StepTitle>
          );
        })}
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProgressContainer = styled(Row)`
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 775px;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #979797;
  &.active {
    background-color: #e7131a;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #979797;
  &.active {
    background-color: #e7131a;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  :first-child {
    width: 12px;
  }
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled(Row)`
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  margin-top: 8px;
  @media (max-width: 420px) {
    width: 90%;
  }
`;

const StepTitle = styled.span`
  font-family: Calibre;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #979797;
  width: 145px;
  height: 20px;
  display: flex;
  justify-content: center;
  &:last-child {
    margin-right: 0;
  }
  &.active {
    color: #041022;
  }

  @media (max-width: 720px) {
    line-height: 16px;
    text-align: center;
    width: 130px;
    height: 32px;
    font-size: 14px;
  }

  @media (max-width: 452px) {
    width: 60px;
  }
`;

export default VerificationStepperView;
