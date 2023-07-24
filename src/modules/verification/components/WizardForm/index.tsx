import React, { MutableRefObject, useEffect, useRef } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { StepWizardChildProps, StepWizardProps } from 'react-step-wizard';

import PrevNextButtons from './PrevNextButtons';
import { Wizard } from './Styled.css';

export type WizardStepProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
} & Partial<StepWizardChildProps>;

type StepWithFormType<T extends FieldValues> = {
  component: React.ComponentType<WizardStepProps<T>>;
  form: UseFormReturn<T>;
  onNext?: () => number;
  onPrev?: () => number;
  onActive?: () => void;
  disableStepButtons?: boolean;
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
  const initialScrollSkip = useRef(false);
  const disableStepButtons = step.disableStepButtons;

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

  if (disableStepButtons) return null;

  return (
    <PrevNextButtons
      hidePrev={currentStep === 1}
      disableNext={isNextDisabled}
      prevText="Back"
      nextText="Next"
      onPrev={() => {
        if (step.onPrev) {
          const stepToGo = step.onPrev();
          if (stepToGo) goToStep?.(stepToGo);
          return;
        }

        previousStep?.();
      }}
      onNext={() => {
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
    />
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
