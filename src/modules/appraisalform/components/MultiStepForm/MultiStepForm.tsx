import { addStyleForMobile, Tooltip } from '@vroom-web/ui-lib';
import { Button } from '@vroom-web/ui-lib';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../../interfaces.d';
import PrevNextButtons from '../PrevNextButtons';
import { blueIcons, grayIcons, greenCheckPath } from './utils';

function numberIcon(index: number, activeSection: number, className: string) {
  const isActive = activeSection === index;
  let src = '';
  if (isActive) {
    src = blueIcons[index];
  } else {
    src = grayIcons[index];
  }
  return <img alt="" src={src} className={className} />;
}

interface Props {
  formTitle: string;
  formSubtittleSection?: () => void;
  sections: any[];
  onDone: () => void | Promise<void>;
  onNext: (
    currentSection: number,
    nextSection: number,
    clear?: boolean
  ) => void;
  onNextIntercept?: () => void;
  active: number;
  customAnalyticsFunc?: (
    nextTitle: string | undefined,
    currentTitle: string
  ) => void;
  refreshButton?: boolean;
  showDialog?: () => void;
  nextText: string;
  submitText: string;
  appraisalTitle?: string;
  disableExperiments: boolean;
  showSteps?: boolean;
}

const MultiStepForm: React.FC<Props> = (props) => {
  const {
    formTitle,
    formSubtittleSection,
    sections,
    onDone,
    onNext,
    active = 0,
    customAnalyticsFunc,
    refreshButton = false,
    nextText = 'Next',
    submitText = 'Review',
    appraisalTitle,
    disableExperiments,
    showSteps = false,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const maxSteps = sections.length - 1;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(active);
  const [returnSection, setReturnSection] = useState(null);
  const [hideButton, setHideButton] = useState<boolean>(false);

  // using a static string here to swap values but this can easily be passed in props
  // this can also be handled by parent component if we don't like this
  const [buttonText, setButtonText] = useState(nextText);

  useEffect(() => {
    // when returning to the form via review page we usually like to update the buttons
    // if next and submit are equal after changing we update button state
    // this implementation is specific to review/edit scenarios and is welcome for
    // a better solution if someone has one
    if (nextText == submitText) {
      setButtonText(submitText);
    }
  }, [nextText, submitText]);

  useEffect(() => {
    if (location.hash !== '') {
      setButtonText(submitText);
    } else {
      if (activeSection === sections.length - 1) {
        setButtonText(submitText);
      } else {
        setButtonText(nextText);
      }
    }
  }, [activeSection]);

  useEffect(() => {
    // SetTimeout is used here to make sure we're waiting to
    // scrollTo ONLY after the height animation finishes
    // then and only then we scroll to the top of the next active section
    // when active section isn't 0
    if (activeSection !== 0) {
      setTimeout(() => {
        const activeElement: any = document.getElementById(
          activeSection as any
        );
        const headerOffset = 70;

        if (activeElement) {
          const elementPosition = activeElement.offsetTop;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 500);
    }
  }, [activeSection]);

  const handleRefreshButton = () => {
    sections.forEach((section: GenericObject) => {
      section.form.resetForm();
    });

    setActiveSection(0);
    setButtonText(nextText);
    onNext(activeSection, 0, true);
  };

  const handleRefreshKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      sections.forEach((section: GenericObject) => {
        section.form.resetForm();
      });

      setActiveSection(0);
      setButtonText(nextText);
      onNext(activeSection, 0, true);
    }
  };

  const handleOnNext = (_e: any, onNextIntercept: any) => {
    const nextStep = activeSection + 1;
    let currentSectionIsValid = sections[activeSection].form.isFormValid;
    //const nextSection = sections[nextStep];
    if (sections[activeSection].addressForm) {
      currentSectionIsValid =
        sections[activeSection].addressForm.isFormValid &&
        sections[activeSection].form.isFormValid;
    }
    if (customAnalyticsFunc) {
      customAnalyticsFunc(
        sections[activeSection + 1]
          ? sections[activeSection + 1].title
          : undefined,
        sections[activeSection].title
      );
    }

    if (onNextIntercept) {
      onNextIntercept(handleOnNext);
      return;
    }

    setIsSubmitting(true);

    if (nextStep > maxSteps && currentSectionIsValid) {
      onDone();
      setIsSubmitting(false);
    } else if (returnSection) {
      onNext && onNext(activeSection, returnSection);
      setActiveSection(returnSection);
      setReturnSection(null);
      setIsSubmitting(false);
    } else {
      onNext && onNext(activeSection, nextStep);
      setActiveSection(nextStep);
      setIsSubmitting(false);
    }
  };

  const handleEditSection = (sectionToOpen: any, newReturnSection: any) => {
    //const currentSection = sections[sectionToOpen];
    setButtonText(submitText);
    setActiveSection(sectionToOpen);
    setReturnSection(newReturnSection);
  };

  const handleEditKeyDown = (
    event: any,
    sectionToOpen: any,
    newReturnSection: any
  ) => {
    if (event.key === 'Enter') {
      setButtonText(submitText);
      setActiveSection(sectionToOpen);
      setReturnSection(newReturnSection);
    }
  };

  const getNextButton = (
    formComponent: any,
    formIsInvalid: any,
    onNextIntercept: any
  ) => {
    if (
      formComponent.toolTip &&
      formIsInvalid &&
      formComponent.toolTip.showTooltip
    ) {
      return (
        <>
          <Tooltip content={<span>{formComponent.toolTip.content}</span>} />
          <NextButtonWrapper>
            <NextButton
              onClick={handleOnNext}
              disabled={formIsInvalid}
              data-qa={'Continue'}
            >
              {buttonText}
            </NextButton>
          </NextButtonWrapper>
        </>
      );
    } else {
      return (
        <NextButton
          onClick={(e: GenericObject) => handleOnNext(e, onNextIntercept)}
          disabled={formIsInvalid}
          data-qa={'Continue'}
        >
          {buttonText}
        </NextButton>
      );
    }
  };

  const getPrevNextButtons = (formComponent: any, formIsInvalid: any) => {
    const { prevStep } = formComponent;
    if (
      formComponent.toolTip &&
      formIsInvalid &&
      formComponent.toolTip.showTooltip
    ) {
      return (
        <>
          <Tooltip content={<span>{formComponent.toolTip.content}</span>} />
          <NextButtonWrapper>
            <PrevNextButtons
              goToPrevStep={prevStep}
              goToNextStep={handleOnNext}
              nextDisabled={formIsInvalid}
              nextButtonLabel={buttonText}
            />
          </NextButtonWrapper>
        </>
      );
    } else {
      return (
        <PrevNextButtons
          goToPrevStep={prevStep}
          goToNextStep={handleOnNext}
          nextDisabled={formIsInvalid}
          nextButtonLabel={buttonText}
        />
      );
    }
  };

  const hideButtonCallback = (hide: boolean): void => {
    setHideButton(hide);
  };

  const formComponents = sections.map((formComponent: any, idx: any) => {
    const {
      component,
      form: { fields },
      prevStep,
      showDialog,
      title,
      data,
      onNextIntercept,
    } = formComponent;
    const CurrentComponent = component;
    const isActive = idx === activeSection;
    let formIsInvalid =
      !sections[activeSection].form.isFormValid || isSubmitting;
    if (sections[activeSection].addressForm) {
      formIsInvalid =
        !sections[activeSection].form.isFormValid ||
        isSubmitting ||
        !sections[activeSection].addressForm.isFormValid;
    }
    const showGreenCheck = idx < activeSection;
    const showEditButton = !isActive && idx < activeSection;

    return (
      <FormStep key={idx} id={idx}>
        <SectionHeader>
          <StepNumber>
            {showGreenCheck && (
              <img alt="" src={greenCheckPath} className={'title-icon'} />
            )}
            {!showGreenCheck && numberIcon(idx, activeSection, 'title-icon')}
          </StepNumber>
          <StepTitle isactive={isActive.toString()}>{title}</StepTitle>
          {showEditButton && (
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
          {!showEditButton && showSteps && (
            <TimeEst>
              (Step {idx + 1} of {sections.length})
            </TimeEst>
          )}
        </SectionHeader>
        <FormSection isactive={isActive.toString()}>
          {formComponent.subTitle && <h3>{formComponent.subTitle}</h3>}
          <CurrentComponent
            fields={fields}
            showDialog={showDialog}
            form={formComponent.form}
            data={data}
            {...formComponent}
            disableExperiments={disableExperiments}
            hideButtonCallback={hideButtonCallback}
          />
          {!hideButton &&
            (prevStep
              ? getPrevNextButtons(formComponent, formIsInvalid)
              : getNextButton(formComponent, formIsInvalid, onNextIntercept))}
        </FormSection>
      </FormStep>
    );
  });

  return (
    <div>
      <FormHeader>
        <Block />
        <FormTitle>
          <span>{formTitle}</span>
          {formSubtittleSection && formSubtittleSection()}
        </FormTitle>
        {refreshButton && (
          <FormRefresh
            role="button"
            tabIndex={0}
            onClick={handleRefreshButton}
            onKeyDown={handleRefreshKeyDown}
          >
            Refresh
          </FormRefresh>
        )}
      </FormHeader>
      {appraisalTitle && <FormWarning>{appraisalTitle}</FormWarning>}
      {formComponents}
    </div>
  );
};

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Block = styled.div`
  display: none;
  @media (max-width: 420px) {
    display: block;
  }
`;

const FormTitle = styled.h1`
  padding: 20px 0px;
  font-family: Vroom-Sans;
  font-size: 36px;
  line-height: 40px;
  letter-spacing: 1px;
  text-align: left;
  margin: 0 0 8px 0;

  ${addStyleForMobile(`
      text-align: center;
      padding-bottom: 16px;
      padding-top: 15px;
      font-family: Vroom-Sans;
      font-size: 28px;
      line-height: 28px;
      letter-spacing: 1px;
    `)}
`;

const FormRefresh = styled.div`
  margin: auto 0;
  color: #e7131a;
  font-weight: bold;
  cursor: pointer;
  font-family: Calibre-Regular;
`;

const FormStep = styled.div`
  padding: 20px 0px;
  border-top: 1px solid #e0e0e0;
`;

const FormSection = styled(({ ...restProps }) => <div {...restProps} />)`
  padding-top: 0;
  transition: max-height 300ms ease-in-out;
  height: auto;
  max-height: 0;
  overflow: ${(props) => (props.isactive === 'true' ? 'initial' : 'hidden')};

  > div {
    transition: max-height 300ms ease-in-out;
    max-height: 0;
  }

  /* big max-height is used when animating variable height transitions */
  ${(props) =>
    props.isactive === 'true' &&
    `
      max-height: 4500px;

      > div {
        max-height: 4500px;
      }
    `}
`;

const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StepNumber = styled.div`
  padding-right: 10px;
  margin: auto 0;

  img {
    vertical-align: middle;
    border-style: none;
  }
`;

const StepTitle = styled(({ ...restProps }) => <div {...restProps} />)`
  font-family: Calibre-Semibold;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.25px;
  color: #041022;

  ${(props) => props.isactive === 'false' && `color: #999da3;`}
  ${addStyleForMobile(`
    font-size: 18px;
  `)}
`;

const EditStep = styled.div`
  padding-left: 10px;
  color: #e7131a;
  cursor: pointer;
  line-height: 26px;
  font-family: Calibre-Regular;
  font-size: 16px;
`;

const TimeEst = styled.div`
  font-family: Calibre-Regular;
  font-size: 18px;
  letter-spacing: 0.25px;
  line-height: 25px;
  color: #999da3;
  padding-left: 5px;
  white-space: nowrap;
`;

const NextButton = styled(({ ...restProps }) => (
  <Button.Primary {...restProps} />
))`
  :enabled {
    background-color: #e7131a;

    &:hover {
      background-color: #d01118;
    }
  }
  width: auto;
  min-width: 180px;
  margin: 20px 0;

  ${addStyleForMobile(`
    width: 100%;
  `)};
`;

const NextButtonWrapper = styled.span`
  padding: 10px;
`;

const FormWarning = styled.div`
  font-size: 18px;
  font-family: Calibre-Regular;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.25px;
  margin-bottom: 24px;
  text-align: left;
  @media (max-width: 420px) {
    text-align: center;
  }
`;

export default MultiStepForm;
