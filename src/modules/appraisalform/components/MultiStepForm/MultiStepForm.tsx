import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PrimaryButton from '@app/components/Button/PrimaryButton';
import { numberIcon, greenCheckPath } from '@app/assets/assets';
import ToolTip from '@app/components/ToolTip';
import PrevNextButtons from '@app/pages/Deal/components/PrevNextButtons';

const MultiStepForm = props => {
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
    disableExperiments
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const maxSteps = sections.length - 1;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState(active);
  const [returnSection, setReturnSection] = useState(null);

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
    }
  }, [active]);

  useEffect(() => {
    // SetTimeout is used here to make sure we're waiting to
    // scrollTo ONLY after the height animation finishes
    // then and only then we scroll to the top of the next active section
    // when active section isn't 0
    if (activeSection !== 0) {
      setTimeout(() => {
        const activeElement = document.getElementById(activeSection);
        const headerOffset = 70;
        const elementPosition = activeElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 305);
    }
  }, [activeSection]);

  const handleRefreshButton = () => {
    sections.forEach(section => {
      section.form.resetForm();
    });

    setActiveSection(0);
    setButtonText(nextText);
    onNext(activeSection, 'refreshed');
  };

  const handleOnNext = (e, onNextIntercept) => {
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

    if (nextStep === sections.length - 1) {
      setButtonText(submitText);
    } else {
      setButtonText(nextText);
    }

    if (nextStep > maxSteps && currentSectionIsValid) {
      onDone();
      setIsSubmitting(false);
    } else if (returnSection) {
      onNext && onNext(returnSection);
      setActiveSection(returnSection);
      setReturnSection(null);
      setIsSubmitting(false);
    } else {
      onNext && onNext(activeSection);
      setActiveSection(nextStep);
      setIsSubmitting(false);
    }
  };

  const handleEditSection = (sectionToOpen, newReturnSection) => {
    //const currentSection = sections[sectionToOpen];
    setButtonText(submitText);
    setActiveSection(sectionToOpen);
    setReturnSection(newReturnSection);
  };

  const getNextButton = (formComponent, formIsInvalid, onNextIntercept) => {
    if (
      formComponent.toolTip &&
      formIsInvalid &&
      formComponent.toolTip.showTooltip
    ) {
      return (
        <ToolTip
          arrow={true}
          content={<span>{formComponent.toolTip.content}</span>}
        >
          <NextButtonWrapper>
            <NextButton
              onClick={handleOnNext}
              disabled={formIsInvalid}
              data-qa={'Continue'}
            >
              {buttonText}
            </NextButton>
          </NextButtonWrapper>
        </ToolTip>
      );
    } else {
      return (
        <NextButton
          onClick={e => handleOnNext(e, onNextIntercept)}
          disabled={formIsInvalid}
          data-qa={'Continue'}
        >
          {buttonText}
        </NextButton>
      );
    }
  };

  const getPrevNextButtons = (formComponent, formIsInvalid) => {
    const { prevStep } = formComponent;
    if (
      formComponent.toolTip &&
      formIsInvalid &&
      formComponent.toolTip.showTooltip
    ) {
      return (
        <ToolTip
          arrow={true}
          content={<span>{formComponent.toolTip.content}</span>}
        >
          <NextButtonWrapper>
            <PrevNextButtons
              goToPrevStep={prevStep}
              goToNextStep={handleOnNext}
              nextDisabled={formIsInvalid}
              nextButtonLabel={buttonText}
            />
          </NextButtonWrapper>
        </ToolTip>
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

  const formComponents = sections.map((formComponent, idx) => {
    const {
      component,
      form: { fields },
      prevStep,
      showDialog,
      title,
      data,
      onNextIntercept
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
              <img src={greenCheckPath} className={'title-icon'} />
            )}
            {!showGreenCheck && numberIcon(idx, activeSection, 'title-icon')}
          </StepNumber>
          <StepTitle isActive={isActive}>{title}</StepTitle>
          {showEditButton && (
            <EditStep onClick={() => handleEditSection(idx, activeSection)}>
              Edit
            </EditStep>
          )}
          {!showEditButton &&
            formComponent.timeEst &&
            formComponent.timeEst.length && (
              <TimeEst>{formComponent.timeEst}</TimeEst>
            )}
        </SectionHeader>
        <FormSection isActive={isActive}>
          {formComponent.subTitle && <h3>{formComponent.subTitle}</h3>}
          <CurrentComponent
            fields={fields}
            showDialog={showDialog}
            form={formComponent.form}
            data={data}
            {...formComponent}
            disableExperiments={disableExperiments}
          />
          {prevStep
            ? getPrevNextButtons(formComponent, formIsInvalid)
            : getNextButton(formComponent, formIsInvalid, onNextIntercept)}
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
          <FormRefresh onClick={handleRefreshButton}>Refresh</FormRefresh>
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
  ${props => props.theme.typography.h18()}
  text-align: left;
  ${props =>
    props.theme.addStylesFor({
      mobile: `text-align: center;
      padding-bottom: 16px;
      padding-top: 15px;
      ${props.theme.typography.h4()}`
    })}
`;

const FormRefresh = styled.div`
  margin: auto 0;
  color: ${props => props.theme.colors.vroomRed};
  font-weight: bold;
  cursor: pointer;
`;

const FormStep = styled.div`
  padding: 20px 0px;
  border-top: 1px solid ${props => props.theme.colors.gray8};
`;

const FormSection = styled.div`
  padding-top: 0;
  transition: max-height 300ms ease-in-out;
  height: auto;
  max-height: 0;
  overflow: hidden;

  > div {
    transition: max-height 300ms ease-in-out;
    max-height: 0;
  }

  /* big max-height is used when animating variable height transitions */
  ${props =>
    props.isActive === true &&
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
`;

const StepTitle = styled.div`
  ${props => props.theme.typography.sectionTitleSemi3}
  color: ${props => props.theme.colors.dark};

  ${props => props.isActive === false && `color: ${props.theme.colors.gray2};`}
  ${props => props.theme.media.lte('mobile')} {
    font-size: 18px;
  }
`;

const EditStep = styled.div`
  padding-left: 10px;
  color: ${props => props.theme.colors.vroomRed};
  cursor: pointer;
  line-height: 26px;
`;

const TimeEst = styled.div`
  font-family: 'Calibre-Regular';
  font-size: 18px;
  letter-spacing: 0.25px;
  line-height: 25px;
  color: ${props => props.theme.colors.gray2};
  padding-left: 5px;
  white-space: nowrap;
`;

const NextButton = styled(PrimaryButton)`
  width: auto;
  min-width: 180px;
  margin: 20px 0;

  ${props =>
    props.theme.addStylesFor({
      mobile: 'width: 100%;'
    })};
`;
const NextButtonWrapper = styled.span`
  padding: 10px;
`;

const FormWarning = styled.div`
  font-size: 18px;
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

MultiStepForm.propTypes = {
  formTitle: PropTypes.string,
  formSubtittleSection: PropTypes.func,
  sections: PropTypes.array,
  onDone: PropTypes.func,
  onNext: PropTypes.func,
  onNextIntercept: PropTypes.func,
  active: PropTypes.number,
  customAnalyticsFunc: PropTypes.func,
  refreshButton: PropTypes.bool,
  match: PropTypes.object,
  history: PropTypes.object,
  showDialog: PropTypes.func,
  nextText: PropTypes.string,
  submitText: PropTypes.string,
  appraisalTitle: PropTypes.string,
  disableExperiments: PropTypes.bool
};

export default MultiStepForm;
