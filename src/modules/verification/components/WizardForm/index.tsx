import React, { MutableRefObject, useEffect, useRef } from 'react';
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
  onActive?: () => void;
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
  extraOffset?: number;
}

type WizardFormNavProps<T extends FieldValues[]> =
  Partial<StepWizardChildProps> &
    WizardFormProps<T> & {
      rootElementRef: MutableRefObject<HTMLDivElement | null>;
    };

const WizardFormNav = <T extends FieldValues[]>({
  currentStep,
  nextStep,
  previousStep,
  goToStep,
  steps,
  onDone,
  rootElementRef,
  extraOffset = 0,
}: WizardFormNavProps<T>) => {
  const step = steps[(currentStep || 1) - 1];
  const isNextDisabled = !step.form.formState.isValid;
  const nextText = step.nextText || 'Next';
  const initialScrollSkip = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (!initialScrollSkip.current) {
        initialScrollSkip.current = true;
        return;
      }
      const headerOffset = 70;

      if (rootElementRef.current) {
        const elementPosition = rootElementRef.current.offsetTop;
        const offsetPosition = elementPosition - headerOffset - extraOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 500);
  }, [currentStep, extraOffset, rootElementRef]);

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
  const rootElementRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={rootElementRef}>
      <Wizard
        instance={instance as (i: StepWizardProps) => void}
        nav={
          <WizardFormNav
            steps={steps}
            rootElementRef={rootElementRef}
            {...props}
          />
        }
        onStepChange={({ activeStep }) => {
          const step = steps[activeStep - 1];
          step.onActive?.();
        }}
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
