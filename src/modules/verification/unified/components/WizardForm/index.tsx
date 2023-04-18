import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { StepWizardChildProps, StepWizardProps } from 'react-step-wizard';

import { ButtonsWrapper, NextButton, PrevButton, Wizard } from './Styled.css';

import { Col, Row } from 'src/styled/grid';

export type WizardStepProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
} & Partial<StepWizardChildProps>;

type StepWithFormType<T extends FieldValues> = {
  component: React.ComponentType<WizardStepProps<T>>;
  form: UseFormReturn<T>;
  nextText?: string;
  onNext?: () => number;
  onPrev?: () => number;
};

export interface WizardFormInstance {
  goToStep: (step: number) => void;
}

interface WizardFormProps<T extends FieldValues[]> {
  steps: {
    [P in keyof T]: StepWithFormType<T[P]>;
  };
  onDone?: () => void | Promise<void>;
  instance?: (instance: WizardFormInstance) => void;
}

const WizardFormNav = <T extends FieldValues[]>({
  currentStep,
  nextStep,
  previousStep,
  goToStep,
  steps,
  onDone,
}: Partial<StepWizardChildProps> & WizardFormProps<T>) => {
  const step = steps[(currentStep || 1) - 1];
  const isNextDisabled = !step.form.formState.isValid;
  const nextText = step.nextText || 'Next';

  return (
    <ButtonsWrapper>
      <Row wrap="wrap" gap="20px">
        <Col size={1 / 2} disableBottomGap>
          <PrevButton
            disabled={currentStep === 1}
            onClick={() => {
              if (step.onPrev) {
                const stepToGo = step.onPrev();
                if (stepToGo) goToStep?.(stepToGo);
                return;
              }

              previousStep?.();
            }}
          >
            Prev
          </PrevButton>
        </Col>
        <Col size={1 / 2} disableBottomGap>
          <NextButton
            onClick={() => {
              if (step.onNext) {
                const stepToGo = step.onNext();
                if (stepToGo) goToStep?.(stepToGo);
                return;
              }

              if (currentStep === steps.length) {
                onDone?.();
              } else {
                nextStep?.();
              }
            }}
            disabled={isNextDisabled}
          >
            {nextText}
          </NextButton>
        </Col>
      </Row>
    </ButtonsWrapper>
  );
};

const WizardForm = <T extends FieldValues[]>({
  steps,
  instance,
  ...props
}: WizardFormProps<T>) => {
  return (
    <div>
      <Wizard
        instance={instance as (i: StepWizardProps) => void}
        nav={<WizardFormNav steps={steps} {...props} />}
      >
        {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
        {steps.map(({ component: Step, form }, index) => (
          <Step key={index} form={form} />
        ))}
      </Wizard>
    </div>
  );
};

export default WizardForm;

export function createSteps<T extends FieldValues[]>(
  ...steps: { [P in keyof T]: StepWithFormType<T[P]> }
): { [P in keyof T]: StepWithFormType<T[P]> } {
  return steps;
}
