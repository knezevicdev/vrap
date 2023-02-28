/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body } from '@vroom-web/ui-lib';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useRestrictedAppraisal } from '../../integrations/RestrictedAppraisalContext';
import {
  AppraisalTitle,
  CancelTradeText,
  ExtConditionText,
  IntConditionText,
  MechConditionText,
  PersonalInfoText,
  ReviewText,
  SaveText,
  VehicleHistoryText,
  VehicleInfoText,
} from './AppraisalForm.language';
import CombinedVehicleInfoForms from './components/CombinedVehicleInfoForm';
import ExteriorCondition from './components/ExteriorConditions';
import InteriorCondition from './components/interiorcondition';
import MechanicalCondition from './components/mechanicalcondition';
import MultiStepForm from './components/MultiStepForm';
import PersonalInformation from './components/personalinformation';
import useFormInit from './components/useFormInit';
import VehicleHistory from './components/VehicleHistory';
import VehicleInformation from './components/VehicleInformation';
import EmailCapture from './Dialog/EmailCapture';
import useTrackActive from './Dialog/EmailCapture/trackActive';
import ExactMilageDialog from './Dialog/ExactMilage';
import InvalidMakeDialog from './Dialog/InvalidMake';
import InvalidStateDialog from './Dialog/InvalidState';
import anyFieldSelected from './utils/anyFieldSelected';
import combinedFormNextIntercept from './utils/combinedFormNextIntercept';
import combineForms from './utils/combineForms';
import valueOrNo from './utils/valueOrNo';
import valueOrYes from './utils/valueOrYes';
import AppraisalViewModel from './ViewModel';

import { useAppStore } from 'src/context';

export interface Props {
  viewModel: AppraisalViewModel;
}

interface BuildForm {
  extConditionForm?: any;
  intConditionForm?: any;
  mechConditionForm?: any;
  personalInfoForm?: any;
  vehicleHistoryForm?: any;
  vehicleInfoForm?: any;
}

const AppraisalForm: React.FC<Props> = ({ viewModel }) => {
  const { value: restrictedAppraisal } = useRestrictedAppraisal();
  const router = useRouter();
  const { store } = useAppStore();
  const vinForPath = router.query.vehicle as string;
  const routerAsPath = router.asPath as string;
  const isEditMode = routerAsPath.includes('#');
  const routerHash = routerAsPath.split('#')[1];
  const submitText = isEditMode ? SaveText : ReviewText;
  const isNewForm = viewModel.isNewFormExperimentActive();
  const isTradeIn = store.appraisal.isTradeIn || router.query.form === 'trade';

  const vehicleInfo = viewModel.appraisalStore.vehicleInfoForm;
  const yourInformation = viewModel.appraisalStore.personalInfoForm;
  const vehicleHistory = viewModel.appraisalStore.vehicleHistoryForm;
  const intCondition = viewModel.appraisalStore.intConditionForm;
  const extCondition = viewModel.appraisalStore.extConditionForm;
  const mechCondition = viewModel.appraisalStore.mechConditionForm;
  const [exactMileageProps, setExactMileageProps] = useState({} as any);
  const [showExactMileageDialog, setShowExactMileageDialog] = useState<boolean>(
    false
  );
  const [showInvalidStateDialog, setShowInvalidStateDialog] = useState(false);
  const [invalidMakeDialogMake, setInvalidMakeDialogMake] = useState<
    false | string
  >(false);
  const [personalInfo, changePersonalInfo] = useState({});
  const isNewFormRef = useRef<boolean>();

  const getActiveState = () => {
    switch (routerHash) {
      case 'top':
        return 0;
      case 'vehiclehistory':
        return 1;
      case 'interiorcondition':
        return 2;
      case 'exteriorcondition':
        return 3;
      case 'mechanicalcondition':
        return 4;
      case 'personalinformation':
        return 5;
      default:
        return 0;
    }
  };

  const activeSection = getActiveState();

  const appraisalUseForm = useFormInit(
    personalInfo,
    vehicleInfo,
    vehicleHistory,
    intCondition,
    extCondition,
    mechCondition,
    yourInformation,
    vinForPath
  );

  const checkOdometer = async (): Promise<boolean | void> => {
    const exactMileageField = appraisalUseForm.vehicleInfoForm.fields.mileage;
    const showExactMileageDialog = viewModel.showExactMileageDialog;
    let inlineCarfaxOdoLast;

    if (!viewModel.carfaxOdoLast) {
      const vin = appraisalUseForm.vehicleInfoForm.fields.vin.value;
      inlineCarfaxOdoLast = await viewModel.handleCarfaxCall(vin);

      if (
        inlineCarfaxOdoLast &&
        exactMileageField.value < inlineCarfaxOdoLast.data.mileage - 1000 &&
        showExactMileageDialog &&
        activeSection === 0
      ) {
        setShowExactMileageDialog(true);
      } else {
        return true;
      }
    } else {
      if (
        exactMileageField.value < viewModel.carfaxOdoLast - 1000 &&
        showExactMileageDialog &&
        activeSection === 0
      ) {
        setShowExactMileageDialog(true);
      } else {
        return true;
      }
    }
  };

  const onNextIntercept = async (proceedNext: any) => {
    const exactMileageField = appraisalUseForm.vehicleInfoForm.fields.mileage;
    const setMileageDialogDismiss = viewModel.setMileageDialogDismiss;
    const zipCode = appraisalUseForm.vehicleInfoForm.fields.zipCode.value;
    const isStateValid = viewModel.validateZipCode(
      isTradeIn,
      zipCode,
      restrictedAppraisal.restrictedZipCodes,
      restrictedAppraisal.restrictedStates
    );
    const vin = appraisalUseForm.vehicleInfoForm.fields.vin.value;
    const isMakeValid = !restrictedAppraisal.restrictedMakes
      .map((restrictedMake) => restrictedMake.toLowerCase())
      .includes(vehicleInfo.make.toLowerCase());

    const isModelInvalid = !restrictedAppraisal.restrictedModels.find(
      (restrictedModel) =>
        Boolean(
          vehicleInfo.make.toLowerCase() ===
            restrictedModel.make.toLowerCase() &&
            vehicleInfo.model.toLowerCase() ===
              restrictedModel.model.toLowerCase()
        )
    );

    setExactMileageProps({
      strictDialog: false,
      enteredMiles: exactMileageField.value,
      mileageCorrect: () => {
        setMileageDialogDismiss();
        if (isStateValid) {
          proceedNext();
        }
      },
      updateMileage: () => {
        exactMileageField.element.focus();
      },
    });

    if (!isMakeValid) {
      setInvalidMakeDialogMake(vehicleInfo.make);
      viewModel.trackInvalidMakeShown(vin);
      return;
    }

    if (!isModelInvalid) {
      setInvalidMakeDialogMake(`${vehicleInfo.make} ${vehicleInfo.model}`);
      viewModel.trackInvalidMakeShown(vin);
      return;
    }

    if (!isStateValid) {
      setShowInvalidStateDialog(true);
      viewModel.trackInvalidStateShown(vin);
      return;
    }

    const isOdometerValid = await checkOdometer();

    if (isOdometerValid && isStateValid && isMakeValid) {
      proceedNext();
    }

    if (!isTradeIn) {
      viewModel.trackSellOrTradeIn(
        vin,
        appraisalUseForm.vehicleInfoForm.fields.sellOrTradeIn.value
      );
    }
  };

  const historyAndConditionForms = [
    appraisalUseForm.vehicleHistoryForm,
    appraisalUseForm.intConditionForm,
    appraisalUseForm.extConditionForm,
    appraisalUseForm.mechConditionForm,
  ];

  const isFormValid = () => {
    const isOriginalValid = historyAndConditionForms.reduce(
      (isValid, form) => isValid && form.isFormValid,
      true
    );

    const isMechanicalSelected = anyFieldSelected(
      appraisalUseForm.mechConditionForm,
      [
        'warningLights',
        'transmissionIssue',
        'engineIssue',
        'noMechanicalIssues',
      ],
      ['runnable']
    );

    const isExteriorSelected = anyFieldSelected(
      appraisalUseForm.extConditionForm,
      [
        'wornTires',
        'fireDamage',
        'floodDamage',
        'hailDamage',
        'rust',
        'scratches',
        'dents',
        'paintChipping',
        'noExteriorDamage',
      ]
    );

    const isInteriorSelected = anyFieldSelected(
      appraisalUseForm.intConditionForm,
      [
        'damagedDashboardOrPanels',
        'damagedElectronic',
        'smokedIn',
        'ripsOrTearsInSeats',
        'noInteriorDamage',
      ]
    );

    return (
      isOriginalValid &&
      isMechanicalSelected &&
      isExteriorSelected &&
      isInteriorSelected
    );
  };

  const combinedVehicleInformationForm = combineForms(
    isFormValid,
    ...historyAndConditionForms
  );

  useEffect(() => {
    if (
      !isTradeIn ||
      !appraisalUseForm.vehicleInfoForm.fields.sellOrTradeIn.isRequired
    )
      return;

    appraisalUseForm.vehicleInfoForm.updateMultipleFields({
      sellOrTradeIn: {
        ...appraisalUseForm.vehicleInfoForm.fields.sellOrTradeIn,
        isRequired: false,
      },
    });
  }, [appraisalUseForm.vehicleInfoForm, isTradeIn]);

  useEffect(() => {
    if (isNewForm === isNewFormRef.current) return;
    isNewFormRef.current = isNewForm;

    if (isNewForm) {
      appraisalUseForm.intConditionForm.updateMultipleFields({
        interiorCondition: {
          ...appraisalUseForm.intConditionForm.fields.interiorCondition,
          isRequired: false,
        },
        seats: {
          ...appraisalUseForm.intConditionForm.fields.seats,
          value: 'Cloth',
        },
        smokedIn: valueOrNo(appraisalUseForm.intConditionForm.fields.smokedIn),
      });
      appraisalUseForm.extConditionForm.updateMultipleFields({
        exteriorCondition: {
          ...appraisalUseForm.extConditionForm.fields.exteriorCondition,
          isRequired: false,
        },
        tiresAndWheels: {
          ...appraisalUseForm.extConditionForm.fields.tiresAndWheels,
          isRequired: false,
        },
        dents: valueOrNo(appraisalUseForm.extConditionForm.fields.dents),
        rust: valueOrNo(appraisalUseForm.extConditionForm.fields.rust),
        hailDamage: valueOrNo(
          appraisalUseForm.extConditionForm.fields.hailDamage
        ),
        paintChipping: valueOrNo(
          appraisalUseForm.extConditionForm.fields.paintChipping
        ),
        scratches: valueOrNo(
          appraisalUseForm.extConditionForm.fields.scratches
        ),
      });
      appraisalUseForm.mechConditionForm.updateMultipleFields({
        runnable: valueOrYes(
          appraisalUseForm.mechConditionForm.fields.runnable
        ),
        floodFireDamage: {
          ...appraisalUseForm.mechConditionForm.fields.floodFireDamage,
          isRequired: false,
        },
        mechanicalCondition: {
          ...appraisalUseForm.mechConditionForm.fields.mechanicalCondition,
          isRequired: false,
        },
        warningLights: valueOrNo(
          appraisalUseForm.mechConditionForm.fields.warningLights
        ),
      });
    }
  }, [
    appraisalUseForm,
    appraisalUseForm.extConditionForm,
    appraisalUseForm.intConditionForm,
    appraisalUseForm.mechConditionForm,
    isNewForm,
  ]);

  const sections = isNewForm
    ? [
        {
          component: VehicleInformation,
          form: appraisalUseForm.vehicleInfoForm,
          title: VehicleInfoText.title,
          onNextIntercept: onNextIntercept,
        },
        {
          component: CombinedVehicleInfoForms,
          form: combinedVehicleInformationForm,
          title: 'Vehicle History & Condition',
          subTitle: VehicleHistoryText.subTitle,
          onNextIntercept: combinedFormNextIntercept(appraisalUseForm),
        },
        {
          component: PersonalInformation,
          form: appraisalUseForm.personalInfoForm,
          title: PersonalInfoText.title,
        },
      ]
    : [
        {
          component: VehicleInformation,
          form: appraisalUseForm.vehicleInfoForm,
          title: VehicleInfoText.title,
          onNextIntercept: onNextIntercept,
        },
        {
          component: VehicleHistory,
          form: appraisalUseForm.vehicleHistoryForm,
          title: VehicleHistoryText.title,
          subTitle: VehicleHistoryText.subTitle,
        },
        {
          component: InteriorCondition,
          form: appraisalUseForm.intConditionForm,
          title: IntConditionText.title,
        },
        {
          component: ExteriorCondition,
          form: appraisalUseForm.extConditionForm,
          title: ExtConditionText.title,
        },
        {
          component: MechanicalCondition,
          form: appraisalUseForm.mechConditionForm,
          title: MechConditionText.title,
        },
        {
          component: PersonalInformation,
          form: appraisalUseForm.personalInfoForm,
          title: PersonalInfoText.title,
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

  const { inactive, removeEvent, track } = useTrackActive();
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
      const { vehicleInfoForm } = buildFormForStore();
      const isEmpty = !vehicleInfoForm.milage && !vehicleInfoForm.keysAmount;

      window.onscroll = () => {
        const currentHeight =
          (window.scrollY + window.innerHeight) / document.body.clientHeight;

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
    const emailCaptureLocal = localStorage.getItem('email_capture');
    const hasEmailCaptureLocal = emailCaptureLocal === 'true';

    if (hasEmailCaptureLocal) {
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

  useEffect(() => {
    const emailCaptureLocal = localStorage.getItem('email_capture');
    const hasEmailCaptureLocal = emailCaptureLocal === 'true';
    if (!hasEmailCaptureLocal && viewModel.isEmailCaptureExperiment()) {
      track();
    }
    if (!viewModel.isEmailCaptureExperiment()) {
      removeEvent();
    }
  }, [viewModel.isEmailCaptureExperiment()]);

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

  const buildFormSectionValues = (form: any, targetObj: any) => {
    for (const [key, value] of Object.entries(form) as any) {
      targetObj[key] = value.value;
    }
    return targetObj;
  };

  const buildFormForStore = (): BuildForm => {
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
      pathname: store.appraisal.reviewPath,
      query: { ...(router.query.form && { form: router.query.form }) },
    });
  };

  const onNext = async (activeSection: number, clearForm?: string) => {
    const formInfo = buildFormForStore();

    viewModel.trackStepComplete(activeSection, formInfo);

    if (activeSection < sections.length - 1) {
      viewModel.trackNextStepViewed(activeSection + 1);
    }

    if (activeSection > 1) {
      removeEvent();
    }
    changeCheckSection(activeSection + 1);

    if (clearForm) {
      await viewModel.clearAppraisal();
      router.push({
        pathname: store.appraisal.appraisalPath,
        query: { ...router.query },
      });
    } else {
      viewModel.updateAppraisal(formInfo);

      if (location.hash.length) {
        router.push({
          pathname: store.appraisal.reviewPath,
        });
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = showExactMileageDialog ? 'hidden' : '';
  }, [showExactMileageDialog]);

  const closeModalHandler = (): void => {
    setShowExactMileageDialog(false);
  };

  useEffect(() => {
    viewModel.initialize();
  }, []);

  return (
    <AppraisalFormContainer data-qa="AppraisalFormPage">
      <MultiStepForm
        isCTAColorExp={viewModel.isCTAColorExp()}
        formTitle={viewModel.titleText}
        sections={sections}
        onDone={onSubmit}
        onNext={onNext}
        showSteps={true}
        active={activeSection}
        refreshButton={true}
        nextText={'Continue'}
        submitText={submitText}
        appraisalTitle={AppraisalTitle}
        disableExperiments={false}
      />
      {isTradeIn && (
        <Cancel onClick={viewModel.cancelOffer}>{CancelTradeText}</Cancel>
      )}
      {showExactMileageDialog && (
        <ExactMilageDialog
          closeModalHandler={closeModalHandler}
          {...exactMileageProps}
        />
      )}
      {showInvalidStateDialog && <InvalidStateDialog />}
      {invalidMakeDialogMake && (
        <InvalidMakeDialog make={invalidMakeDialogMake} />
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

const Cancel = styled(Body.Regular)`
  display: block;
  color: #e7131a;
  cursor: pointer;
  border-top: 1px solid #e0e0e0;
  padding: 40px 0px;
  text-transform: uppercase;
`;

const AppraisalFormContainer = styled.div`
  padding: 20px 60px;
  background: #ffffff;
  border: 1px solid #d6d7da;
  width: 100%;
  max-width: 768px;
  (max-width: 1024 px) {
    padding: 0 60px;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export default AppraisalForm;
