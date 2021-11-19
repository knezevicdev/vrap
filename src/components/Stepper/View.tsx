import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

export interface Props {
  viewModel: ViewModel;
  activeStep: string;
}

const VerificationStepperView: React.FC<Props> = ({
  viewModel,
  activeStep,
}) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [stepper, changeStepper] = useState(viewModel.defaultSteps);

  useEffect(() => {
    viewModel.isPaymentRequireExp()
      ? changeStepper(viewModel.paymentRequiredSteps)
      : changeStepper(viewModel.defaultSteps);
  }, [viewModel]);

  return (
    <Container>
      <ProgressContainer>
        {stepper.map((item) => {
          const active =
            parseInt(activeStep) >= parseInt(item.step) ? 'active' : '';
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
        {stepper.map((item) => {
          return (
            <StepTitle
              key={item.step}
              className={
                parseInt(activeStep) >= parseInt(item.step) ? 'active' : ''
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

export default observer(VerificationStepperView);
