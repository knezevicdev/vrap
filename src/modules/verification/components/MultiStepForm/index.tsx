import React, { useEffect, useRef, useState } from 'react';

import {
  Block,
  EditStep,
  FormHeader,
  FormSection,
  FormStep,
  FormSubtitle,
  FormTitle,
  NextButton,
  SectionHeader,
  StepNumber,
  StepTitle,
} from './Style.css';
import { blueIcons, grayIcons, greenCheckPath } from './utils';

function numberIcon(index: number, activeSection: number, className: string) {
  const isActive = activeSection === index;
  const src = isActive ? blueIcons[index] : grayIcons[index];
  return <img alt="" src={src} className={className} />;
}

export interface FormStepProps {
  nextStep: () => void;
  goToStep: (step: number) => void;
  editRef?: number;
  returnStep: number;
}

export interface AfterComponentProps {
  onEdit?: () => void;
}

export interface FormSection {
  component: React.ComponentType<FormStepProps>;
  isValid: boolean;
  title: string;
  disableNext?: boolean;
  disableEditButton?: boolean;
  completedAfterComponent?: React.ComponentType<AfterComponentProps>;
}

interface Props {
  title: string;
  subtitle?: string;
  sections: FormSection[];
  onDone: () => void | Promise<void>;
  onNext: (currentSection: number, nextSection: number) => void | Promise<void>;
  onSectionChange?: (section: number) => void;
  active: number;
  nextText: string;
  submitText: string;
  extraOffset?: number;
}

const MultiStepForm: React.FC<Props> = (props) => {
  const {
    title,
    subtitle,
    sections,
    onDone,
    onNext,
    onSectionChange,
    active = 0,
    nextText = 'Next',
    extraOffset = 0,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const maxSteps = sections.length - 1;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(active);
  const [returnSection, setReturnSection] = useState(0);
  const editRefs = useRef<Record<number, number>>({});

  useEffect(() => {
    if (activeSection !== 0) {
      setTimeout(() => {
        const activeElement = document.getElementById(String(activeSection));
        const headerOffset = 70;

        if (activeElement) {
          const elementPosition = activeElement.offsetTop;
          const offsetPosition = elementPosition - headerOffset - extraOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 500);
    }
  }, [activeSection]);

  const handleOnNext = () => {
    const nextStep = returnSection ? returnSection : activeSection + 1;
    const isCurrentSectionValid = sections[activeSection].isValid;
    if (!isCurrentSectionValid) return;
    if (nextStep > maxSteps) {
      onDone();
      return;
    }

    setIsSubmitting(true);

    onNext?.(activeSection, nextStep);
    setActiveSection(nextStep);
    onSectionChange?.(nextStep);
    if (returnSection) setReturnSection(0);

    setIsSubmitting(false);
  };

  const handleGoToStep = (step: number) => {
    if (activeSection === step) return;

    setIsSubmitting(true);

    setActiveSection(step);
    onSectionChange?.(step);
    if (step === returnSection) {
      setReturnSection(0);
    }

    setIsSubmitting(false);
  };

  const handleEditSection = (
    sectionToOpen: number,
    newReturnSection: number
  ) => {
    if (!editRefs.current[sectionToOpen]) editRefs.current[sectionToOpen] = 0;
    editRefs.current[sectionToOpen]++;
    setActiveSection(sectionToOpen);
    onSectionChange?.(sectionToOpen);
    setReturnSection(newReturnSection);
  };

  const handleEditKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLSpanElement>,
    sectionToOpen: number,
    newReturnSection: number
  ) => {
    if (event.key === 'Enter') {
      handleEditSection(sectionToOpen, newReturnSection);
    }
  };

  const formComponents = sections.map(
    (formComponent: FormSection, idx: number) => {
      const {
        component,
        title,
        disableNext: isNextDisabled,
        disableEditButton: isEditButtonDisabled,
        completedAfterComponent,
      } = formComponent;
      const CurrentComponent = component;
      const AfterComponent = completedAfterComponent;
      const isActive = idx === activeSection;
      const isFormInvalid = !sections[activeSection].isValid || isSubmitting;
      const showGreenCheck = idx < activeSection;
      const showEditButton = !isActive && idx < activeSection;

      return (
        <FormStep key={idx} id={String(idx)}>
          <SectionHeader suppressBottomPadding={!isActive && !showEditButton}>
            <StepNumber>
              {showGreenCheck && (
                <img alt="" src={greenCheckPath} className={'title-icon'} />
              )}
              {!showGreenCheck && numberIcon(idx, activeSection, 'title-icon')}
            </StepNumber>
            <StepTitle isactive={isActive.toString()}>{title}</StepTitle>
            {!isEditButtonDisabled && showEditButton && (
              <EditStep
                role="button"
                tabIndex={0}
                onClick={() => handleEditSection(idx, activeSection)}
                onKeyDown={(event) =>
                  handleEditKeyDown(event, idx, activeSection)
                }
              >
                Edit
              </EditStep>
            )}
          </SectionHeader>
          {showEditButton && AfterComponent && (
            <FormSection isactive="true" isview="true">
              <AfterComponent
                onEdit={() => handleEditSection(idx, activeSection)}
              />
            </FormSection>
          )}
          <FormSection isactive={isActive.toString()}>
            <CurrentComponent
              nextStep={handleOnNext}
              goToStep={handleGoToStep}
              editRef={editRefs.current[idx]}
              returnStep={returnSection}
            />
            {!isNextDisabled && (
              <NextButton
                onClick={handleOnNext}
                disabled={isFormInvalid}
                data-qa={'Continue'}
              >
                {nextText}
              </NextButton>
            )}
          </FormSection>
        </FormStep>
      );
    }
  );

  return (
    <div>
      <FormHeader>
        <Block />
        <FormTitle>
          <span>{title}</span>
        </FormTitle>
        {subtitle && <FormSubtitle>{subtitle}</FormSubtitle>}
      </FormHeader>
      {formComponents}
    </div>
  );
};

export default MultiStepForm;
