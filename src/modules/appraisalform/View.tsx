/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
import ExteriorCondition from './components/ExteriorConditions';
import InteriorCondition from './components/interiorcondition';
import MechanicalCondition from './components/mechanicalcondition';
import MultiStepForm from './components/MultiStepForm';
import PersonalInformation from './components/personalinformation';
import useFormInit from './components/useFormInit';
import VehicleHistory from './components/vehiclehistory';
import VehicleInformation from './components/VehicleInformation';
import EmailCapture from './Dialog/EmailCapture';
import useTrackActive from './Dialog/EmailCapture/trackActive';
import Dialog from './Dialog/ExactMilage';
import AppraisalViewModel from './ViewModel';

import { useAppStore } from 'src/context';

export interface Props {
  viewModel: AppraisalViewModel;
}

const AppraisalForm: React.FC<Props> = ({ viewModel }) => {
  const router = useRouter();
  const { store } = useAppStore();
  const vinForPath = router.query.vehicle as string;
  const pathname = router.pathname as string;
  const editMode = pathname.includes('#');
  const submitText = editMode ? SaveText : ReviewText;

  // let personalInfo = {}; //logged in users
  const vehicleInfo = viewModel.appraisalStore.vehicleInfoForm;
  const yourInformation = viewModel.appraisalStore.personalInfoForm;
  const vehicleHistory = viewModel.appraisalStore.vehicleHistoryForm;
  const intCondition = viewModel.appraisalStore.intConditionForm;
  const extCondition = viewModel.appraisalStore.extConditionForm;
  const mechCondition = viewModel.appraisalStore.mechConditionForm;
  const [exactMilageProps, setExactMileageProps] = useState({} as any);
  const [showExactMilageDialog, setShowExactMilageDialog] = useState(false);
  const [personalInfo, changePersonalInfo] = useState({});

  let activeSection = 0;
  useEffect(() => {
    switch (location.hash) {
      case '#top':
        activeSection = 0;
        break;
      case '#vehiclehistory':
        activeSection = 1;
        break;
      case '#interiorcondition':
        activeSection = 2;
        break;
      case '#exteriorcondition':
        activeSection = 3;
        break;
      case '#mechanicalcondition':
        activeSection = 4;
        break;
      case '#personalinformation':
        activeSection = 5;
        break;
      default:
        activeSection = 0;
        break;
    }
  });

  const appraisalUseForm = useFormInit(
    personalInfo,
    vehicleInfo,
    vehicleHistory,
    intCondition,
    extCondition,
    mechCondition,
    yourInformation,
    vinForPath,
    viewModel.isDetailedConditionsExperiment
  );

  const onNextIntercept = async (proceedNext: any) => {
    const exactMileageField = appraisalUseForm.vehicleInfoForm.fields.mileage;
    const strictDialog = viewModel.grade === false;
    const setMileageDialogDismiss = viewModel.setMileageDialogDismiss;
    const showExactMileageDialog = viewModel.showExactMileageDialog;
    let inlineCarfaxOdoLast;

    setExactMileageProps({
      strictDialog: strictDialog,
      enteredMiles: exactMileageField.value,
      mileageCorrect: () => {
        setMileageDialogDismiss();
        proceedNext();
      },
      updateMileage: () => {
        exactMileageField.element.focus();
      },
    });

    if (!viewModel.carfaxOdoLast) {
      const vin = appraisalUseForm.vehicleInfoForm.fields.vin.value;
      inlineCarfaxOdoLast = await viewModel.handleCarfaxCall(vin);

      if (
        exactMileageField.value < inlineCarfaxOdoLast.mileage - 1000 &&
        showExactMileageDialog &&
        activeSection === 0
      ) {
        setShowExactMilageDialog(true);
      } else {
        proceedNext();
      }
    } else {
      if (
        exactMileageField.value < viewModel.carfaxOdoLast - 1000 &&
        showExactMileageDialog &&
        activeSection === 0
      ) {
        setShowExactMilageDialog(true);
      } else {
        proceedNext();
      }
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
    const query = router.query;

    viewModel.trackProcessStart();

    if (query.brand || query.dealership || query.type) {
      const fieldVals = {
        brand: query.brand || '',
        dealership: query.dealership || '',
        type: query.type || '',
      };

      viewModel.updateGeneralFields(fieldVals);
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

  /*
    email capture logic
  */
  const { inactive, removeEvent } = useTrackActive();
  const [emailModalShowed, changeEmailModalShowed] = useState(false);
  const [emailModal, changeEmailModal] = useState(false);
  const [checkSection, changeCheckSection] = useState(0);
  const [isMobile, changeIsMobile] = useState(0);

  useEffect(() => {
    viewModel.isSignIn();
    const isMobileWidth = window.innerWidth <= 767 ? 1 : 0;
    changeIsMobile(isMobileWidth);
  }, []);

  useEffect(() => {
    if (store.appraisal.isUserLoggedIn) {
      viewModel.getUser();
    }
  }, [store.appraisal.isUserLoggedIn]);

  useEffect(() => {
    changePersonalInfo({ ...store.appraisal.user });
  }, [store.appraisal.user]);

  useEffect(() => {
    const emailCaptureLocal = localStorage.getItem('email_capture');
    const hasEmailCaptureLocal = emailCaptureLocal === 'true';
    if (viewModel.isEmailCaptureExperiment() && !hasEmailCaptureLocal) {
      // const { vehicleInfoForm } = buildFormForStore();
      const vehicleInfoForm = appraisalUseForm.vehicleInfoForm.fields;
      const isEmpty = !vehicleInfoForm.milage && !vehicleInfoForm.keysAmount;

      window.onscroll = () => {
        const currentHeight =
          (window.scrollY + window.innerHeight) / document.body.clientHeight;
        // this is when user scroll without adding any field in first section
        // should add abtest in condition name : ac-email-capture
        if (
          window.scrollY &&
          !emailModalShowed &&
          checkSection === 0 &&
          currentHeight > 0.75 &&
          isEmpty
        ) {
          handleClearEvent();
        }
      };
    }
  }, [emailModalShowed, appraisalUseForm, checkSection]);

  useEffect(() => {
    // this is when user is inactive 6 second in first 2 section
    // should add abtest in condition name : ac-email-capture isEmailCapture
    const emailCaptureLocal = localStorage.getItem('email_capture');
    const hasEmailCaptureLocal = emailCaptureLocal === 'true';
    if (!viewModel.isEmailCaptureExperiment() || hasEmailCaptureLocal) {
      removeEvent();
    }
    if (
      inactive &&
      !emailModalShowed &&
      checkSection < 2 &&
      viewModel.isEmailCaptureExperiment() &&
      !hasEmailCaptureLocal
    ) {
      handleClearEvent();
    }
  }, [inactive, emailModalShowed, checkSection]);

  const handleClearEvent = () => {
    changeEmailModalShowed(true);
    changeEmailModal(true);
    removeEvent();
    window.onscroll = null;
    localStorage.setItem('email_capture', 'true');
    viewModel.emailAnalytics(
      'Remind Me Viewed',
      viewModel.getUserSignIn(),
      isMobile,
      1,
      false
    );
  };

  const handleModalClose = () => {
    changeEmailModal(false);
  };

  /*
    end email capture logic
  */
  const buildFormSectionValues = (form: any, targetObj: any) => {
    for (const [key, value] of Object.entries(form) as any) {
      targetObj[key] = value.value;
    }
    return targetObj;
  };

  const buildFormForStore = () => {
    return Object.entries(appraisalUseForm).reduce(
      (result, [formKey, formData]: any) => {
        let csTrimId;
        const formSectionVals = buildFormSectionValues(formData.fields, {});
        const yearMakeModel =
          formKey === 'vehicleInfoForm'
            ? {
                year: vehicleInfo.year,
                make: vehicleInfo.make,
                model: vehicleInfo.model,
              }
            : {};

        if (formKey === 'vehicleInfoForm') {
          csTrimId = formData.fields.trim.trimId
            ? { csTrimId: formData.fields.trim.trimId }
            : {};
        }

        return {
          ...result,
          [formKey]: {
            ...formSectionVals,
            ...yearMakeModel,
            ...csTrimId,
          },
        };
      },
      {}
    );
  };

  const onSubmit = () => {
    const formInfo = buildFormForStore();

    viewModel.updateAppraisal(formInfo);

    router.push({
      pathname: '/appraisal/review',
    });
  };

  const onNext = async (activeSection: number, clearForm?: string) => {
    const formInfo = buildFormForStore();

    viewModel.trackStepComplete(activeSection, formInfo);

    if (activeSection < sections.length - 1) {
      viewModel.trackNextStepViewed(activeSection + 1);
    }
    /* email capture logic */
    if (activeSection > 1) {
      removeEvent();
    }
    changeCheckSection(activeSection + 1);
    /* end email capture logic */

    if (clearForm) {
      await viewModel.clearAppraisal();
      router.push({ pathname: '/appraisal' });
    } else {
      viewModel.updateAppraisal(formInfo);

      if (location.hash.length) {
        router.push({
          pathname: '/appraisal/review',
        });
      }
    }
  };

  const closeModalHandler = (): void => {
    setShowExactMilageDialog(false);
  };

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
      {showExactMilageDialog && (
        <Dialog closeModalHandler={closeModalHandler} {...exactMilageProps} />
      )}
      {emailModal && (
        <EmailCapture
          handleClose={handleModalClose}
          experimentUUID={viewModel.getAnonymousId()}
          isUserLoggedIn={viewModel.getUserSignIn()}
        />
      )}
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
