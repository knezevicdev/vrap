/* eslint-disable @typescript-eslint/no-explicit-any */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import {
  AppraisalTitle,
  ExtConditionText,
  IntConditionText,
  MechConditionText,
  PersonalInfoText,
  ReviewText,
  SaveText,
  SellFormTitleText,
  VehicleHistoryText,
  VehicleInfoText,
} from './AppraisalForm.language';
import ExteriorCondition from './components/ExteriorCondition';
import InteriorCondition from './components/InteriorCondition';
import MechanicalCondition from './components/mechanicalcondition';
import MultiStepForm from './components/MultiStepForm';
import PersonalInformation from './components/personalinformation';
import useFormInit from './components/useFormInit';
import VehicleHistory from './components/vehiclehistory';
import VehicleInformation from './components/vehicleinformation';
import { parseQueryString } from './utils';

const AppraisalForm = ({
  personalInfo,
  vehicleInfo,
  vehicleHistory,
  intCondition,
  extCondition,
  mechCondition,
  yourInformation,
  updateAppraisal,
  updateField,
  clearAppraisal,
  mode,
  theme,
  history,
  location,
  match,
  showDialog,
  carfaxOdoLast,
  grade,
  showExactMileageDialog,
  setMileageDialogDismiss,
  isAppraisalIntentExperiment,
  isDetailedConditionsExperiment,
}) => {
  const getActiveState = () => {
    switch (location.hash) {
      case '#top':
        return 0;
      case '#vehiclehistory':
        return 1;
      case '#interiorcondition':
        return 2;
      case '#exteriorcondition':
        return 3;
      case '#mechanicalcondition':
        return 4;
      case '#personalinformation':
        return 5;
      default:
        return 0;
    }
  };

  const activeSection = getActiveState();

  const vinForPath = match.params.vin;

  const appraisalUseForm = useFormInit(
    personalInfo,
    vehicleInfo,
    vehicleHistory,
    intCondition,
    extCondition,
    mechCondition,
    yourInformation,
    vinForPath,
    isAppraisalIntentExperiment,
    isDetailedConditionsExperiment
  );

  const onNextIntercept = (proceedNext: any) => {
    const exactMileageField = appraisalUseForm.vehicleInfoForm.fields.mileage;
    const showStrictDialog = grade === false;

    if (
      exactMileageField.value < carfaxOdoLast - 1000 &&
      showExactMileageDialog &&
      activeSection === 0
    ) {
      showDialog('ExactMileageDialog', {
        strictDialog: showStrictDialog,
        enteredMiles: exactMileageField.value,
        mileageCorrect: () => {
          setMileageDialogDismiss();
          proceedNext();
        },
        updateMileage: () => {
          exactMileageField.element.focus();
        },
      });
    } else {
      proceedNext();
    }
  };

  const sections = [
    {
      component: VehicleInformation,
      form: appraisalUseForm.vehicleInfoForm,
      title: VehicleInfoText.title,
      timeEst: VehicleInfoText.timeEst,
      onNextIntercept: onNextIntercept,
    },
    {
      component: VehicleHistory,
      form: appraisalUseForm.vehicleHistoryForm,
      title: VehicleHistoryText.title,
      timeEst: VehicleHistoryText.timeEst,
      subTitle: VehicleHistoryText.subTitle,
    },
    {
      component: InteriorCondition,
      form: appraisalUseForm.intConditionForm,
      title: IntConditionText.title,
      timeEst: IntConditionText.timeEst,
    },
    {
      component: ExteriorCondition,
      form: appraisalUseForm.extConditionForm,
      title: ExtConditionText.title,
      timeEst: ExtConditionText.timeEst,
    },
    {
      component: MechanicalCondition,
      form: appraisalUseForm.mechConditionForm,
      title: MechConditionText.title,
      timeEst: MechConditionText.timeEst,
    },
    {
      component: PersonalInformation,
      form: appraisalUseForm.personalInfoForm,
      title: PersonalInfoText.title,
      timeEst: PersonalInfoText.timeEst,
    },
  ];

  useEffect(() => {
    const possibleParameters = ['brand', 'dealership', 'type'];
    const query = parseQueryString(location.search);

    //trackProcessStart();

    if (query) {
      possibleParameters.forEach((parameter) => {
        const value = query[parameter] || '';
        if (value) {
          updateField(parameter, value);
        }
      });
    }
  }, []);

  useEffect(() => {
    const warningLights =
      appraisalUseForm.mechConditionForm.fields.warningLights;
    const warningLightsValues =
      appraisalUseForm.mechConditionForm.fields.warningLightsValues;
    if (warningLights.value === 'Yes') {
      warningLightsValues.onChange({
        ...warningLightsValues,
        isRequired: true,
      });
    } else if (warningLights.value === 'No') {
      warningLightsValues.onChange({
        ...warningLightsValues,
        value: [],
        isRequired: false,
      });
    }
  }, [appraisalUseForm.mechConditionForm.fields.warningLights.value]);

  const buildFormSectionValues = (form: any, targetObj: any) => {
    for (const [key, value] of Object.entries(form)) {
      targetObj[key] = value.value;
    }
    return targetObj;
  };

  const buildFormForStore = () => {
    return Object.entries(appraisalUseForm).reduce(
      (result, [formKey, formData]: any) => {
        const formSectionVals = buildFormSectionValues(formData.fields, {});
        const yearMakeModel =
          formKey === 'vehicleInfoForm'
            ? {
                year: vehicleInfo.year,
                make: vehicleInfo.make,
                model: vehicleInfo.model,
              }
            : {};

        return {
          ...result,
          [formKey]: {
            ...formSectionVals,
            ...yearMakeModel,
          },
        };
      },
      {}
    );
  };

  const onSubmit = () => {
    const formInfo = buildFormForStore();

    updateAppraisal(formInfo);

    history.push({
      pathname,
      search: modeParam,
    });
  };

  const onNext = async (activeSection, clearForm) => {
    const formInfo = buildFormForStore();

    trackStepComplete(activeSection, formInfo);

    if (activeSection < sections.length - 1) {
      trackNextStepViewed(activeSection + 1);
    }

    if (clearForm) {
      await clearAppraisal();
      history.push({ pathname: PATHS.sellAppraisal.prefix });
    } else {
      updateAppraisal(formInfo);

      if (location.hash.length) {
        history.push({
          pathname,
          search: modeParam,
        });
      }
    }
  };

  const submitText = location.hash.length ? SaveText : ReviewText;

  return (
    <AppraisalFormContainer data-qa="AppraisalFormPage">
      <MultiStepForm
        formTitle={SellFormTitleText}
        sections={sections}
        onDone={onSubmit}
        onNext={onNext}
        active={activeSection}
        refreshButton={true}
        nextText={'Continue'}
        submitText={submitText}
        appraisalTitle={AppraisalTitle}
        disableExperiments={false}
      />
    </AppraisalFormContainer>
  );
};

const AppraisalFormContainer = styled.div`
  padding: 20px 60px;
  background: #ffffff;
  border: 1px solid #d6d7da;
  width: 100%;
  max-width: 768px;

  (max-width: 1024px) {
    padding: 0 60px;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export default AppraisalForm;
