/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import useIsTradeIn from '../../hooks/useIsTradeIn';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';
import { useRestrictedAppraisal } from '../../integrations/RestrictedAppraisalContext';
import { getUser, isUserSignedIn } from '../../networking/request';
import CombinedVehicleInfoForms from './components/CombinedVehicleInfoForm';
import MultiStepForm from './components/MultiStepForm';
import PersonalInformation from './components/personalinformation';
import useFormInit from './components/useFormInit';
import { validateZipCode } from './components/validation';
import VehicleInformation from './components/VehicleInformation';
import InvalidMakeDialog from './Dialog/InvalidMake';
import InvalidStateDialog from './Dialog/InvalidState';
import { StyledLink } from './Style.css';
import anyFieldSelected from './utils/anyFieldSelected';
import combinedFormNextIntercept from './utils/combinedFormNextIntercept';
import combineForms from './utils/combineForms';
import useCancelOffer from './utils/useCancelOffer';
import useInitialize from './utils/useInitialize';

import { useAppStore } from 'src/context';

interface BuildForm {
  extConditionForm?: any;
  intConditionForm?: any;
  mechConditionForm?: any;
  personalInfoForm?: any;
  vehicleHistoryForm?: any;
  vehicleInfoForm?: any;
}

const AppraisalForm: React.FC = () => {
  const { value: restrictedAppraisal } = useRestrictedAppraisal();
  const router = useRouter();
  const { store } = useAppStore();
  const vinForPath = router.query.vehicle as string;
  const routerAsPath = router.asPath as string;
  const isEditMode = routerAsPath.includes('#');
  const routerHash = routerAsPath.split('#')[1];
  const submitText = isEditMode ? 'Save' : 'Review';
  const isTradeIn = useIsTradeIn();

  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);

  const vehicleInfo = store.appraisal.vehicleInfoForm;
  const yourInformation = store.appraisal.personalInfoForm;
  const vehicleHistory = store.appraisal.vehicleHistoryForm;
  const intCondition = store.appraisal.intConditionForm;
  const extCondition = store.appraisal.extConditionForm;
  const mechCondition = store.appraisal.mechConditionForm;
  const [showInvalidStateDialog, setShowInvalidStateDialog] = useState(false);
  const [invalidMakeDialogMake, setInvalidMakeDialogMake] = useState<
    false | string
  >(false);
  const [personalInfo, changePersonalInfo] = useState({});

  const getActiveState = () => {
    switch (routerHash) {
      case 'top':
        return 0;
      case 'vehiclehistory':
        return 1;
      case 'personalinformation':
        return 2;
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
    vinForPath,
    isTradeIn
  );

  const onNextIntercept = async (proceedNext: any) => {
    const zipCode = appraisalUseForm.vehicleInfoForm.fields.zipCode.value;
    const isStateValid = validateZipCode(
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

    if (!isMakeValid) {
      setInvalidMakeDialogMake(vehicleInfo.make);
      analyticsHandler.trackInvalidMakeShown(
        vin,
        store.appraisal.eventCategory
      );
      return;
    }

    if (!isModelInvalid) {
      setInvalidMakeDialogMake(`${vehicleInfo.make} ${vehicleInfo.model}`);
      analyticsHandler.trackInvalidMakeShown(
        vin,
        store.appraisal.eventCategory
      );
      return;
    }

    if (!isStateValid) {
      setShowInvalidStateDialog(true);
      analyticsHandler.trackInvalidStateShown(
        vin,
        store.appraisal.eventCategory
      );
      return;
    }

    if (isStateValid && isMakeValid) {
      proceedNext();
    }

    if (!isTradeIn) {
      analyticsHandler.trackSellOrTradeIn(
        vin,
        store.appraisal.eventCategory,
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

  const calculateSelectedSections = () => {
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
        'majorDamageExterior',
        'frameOrStructuralDamage',
        'noExteriorDamage',
        'windshieldCrackedChipped',
      ]
    );

    const isInteriorSelected = anyFieldSelected(
      appraisalUseForm.intConditionForm,
      [
        'damagedDashboardOrPanels',
        'damagedElectronic',
        'smokedIn',
        'ripsOrTearsInSeats',
        'majorDamageInterior',
        'noInteriorDamage',
      ]
    );

    return {
      isMechanicalSelected,
      isExteriorSelected,
      isInteriorSelected,
    };
  };

  const isFormValid = () => {
    const isOriginalValid = historyAndConditionForms.reduce(
      (isValid, form) => isValid && form.isFormValid,
      true
    );

    const { isMechanicalSelected, isExteriorSelected, isInteriorSelected } =
      calculateSelectedSections();

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

  const [combinedFormInvalidSections, setCombinedFormInvalidSections] =
    useState({});

  const combinedFormValues = Object.fromEntries(
    Object.entries(combinedVehicleInformationForm.fields).map(
      ([key, field]) => [key, field.value]
    )
  );
  const lastCombinedFormValues = useRef(combinedFormValues);

  useEffect(() => {
    if (
      JSON.stringify(combinedFormValues) ===
      JSON.stringify(lastCombinedFormValues.current)
    )
      return;
    lastCombinedFormValues.current = combinedFormValues;

    setCombinedFormInvalidSections({});
  }, [combinedFormValues]);

  const sections = [
    {
      component: VehicleInformation,
      form: appraisalUseForm.vehicleInfoForm,
      title: 'Vehicle Information',
      onNextIntercept: onNextIntercept,
    },
    {
      component: CombinedVehicleInfoForms,
      form: combinedVehicleInformationForm,
      title: 'Vehicle History & Condition',
      onNextIntercept: combinedFormNextIntercept(appraisalUseForm),
      combinedFormInvalidSections,
      onInvalidFormUnresolved: () => {
        const selectedSections = calculateSelectedSections();
        let scrollId = '';

        if (!selectedSections.isMechanicalSelected)
          scrollId = 'mechanical-issues-h';
        else if (!selectedSections.isExteriorSelected)
          scrollId = 'exterior-damage-h';
        else if (!selectedSections.isInteriorSelected)
          scrollId = 'interior-damage-h';

        if (scrollId) {
          const invalidSectionElement = document.getElementById(scrollId);
          const headerOffset = 100;

          if (invalidSectionElement) {
            const elementPosition =
              window.scrollY + invalidSectionElement.getBoundingClientRect().y;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }

        setCombinedFormInvalidSections(selectedSections);
      },
    },
    {
      component: PersonalInformation,
      form: appraisalUseForm.personalInfoForm,
      title: 'Your Information',
      afterButton: () => (
        <div>
          <StyledLink
            href="/legal/privacy-policy#california-residents"
            target="_blank"
          >
            California Notice of Collection
          </StyledLink>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const query = router.query;

    analyticsHandler.trackProcessStart(store.appraisal.eventCategory);

    if (query.brand || query.dealership || query.type) {
      const fieldVals = {
        brand: query.brand || '',
        dealership: query.dealership || '',
        type: query.type || '',
      };

      store.appraisal.updateGeneralFields(fieldVals);
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

  const signInChecked = useRef(false);
  useEffect(() => {
    if (signInChecked.current) return;
    signInChecked.current = true;

    (async (): Promise<void> => {
      const isLoggedIn = await isUserSignedIn();
      store.appraisal.setIsLoggedIn(isLoggedIn);
    })();
  }, [store.appraisal]);

  const userFetched = useRef(false);
  useEffect(() => {
    if (store.appraisal.isUserLoggedIn) {
      if (userFetched.current) return;
      userFetched.current = true;
      (async (): Promise<void> => {
        const user = await getUser();
        store.appraisal.setUser(user);
      })();
    }
  }, [store.appraisal.isUserLoggedIn]);

  useEffect(() => {
    changePersonalInfo({ ...store.appraisal.user });
  }, [store.appraisal.user]);

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

  const onSubmit = async () => {
    const formInfo = buildFormForStore();

    store.appraisal.updateAppraisal(formInfo);
    router
      .push({
        pathname: store.appraisal.reviewPath,
        query: {
          ...(router.query.form && { form: router.query.form }),
          vin: store.appraisal.vehicleInfoForm.vin,
        },
      })
      .catch((e) => console.error(e));
  };

  const onNext = async (
    activeSection: number,
    _nextSection: number,
    clearForm?: boolean
  ) => {
    const formInfo = buildFormForStore();

    analyticsHandler.trackStepComplete(
      activeSection,
      formInfo,
      store.appraisal.eventCategory
    );

    if (activeSection < sections.length - 1) {
      analyticsHandler.trackNextStepViewed(activeSection + 1);
    }

    if (clearForm) {
      await store.appraisal.clearAppraisal();
      router
        .push({
          pathname: store.appraisal.appraisalPath,
          query: { ...router.query },
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      store.appraisal.updateAppraisal(formInfo);

      if (location.hash.length) {
        router
          .push({
            pathname: store.appraisal.reviewPath,
            query: {
              vin: store.appraisal.vehicleInfoForm.vin,
            },
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
  };

  const isInitialized = useRef(false);
  const initialize = useInitialize(store);
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;
    initialize();
  }, [initialize]);

  const cancelOffer = useCancelOffer(store);

  return (
    <AppraisalFormContainer data-qa="AppraisalFormPage">
      <MultiStepForm
        formTitle={isTradeIn ? '' : 'My Appraisal'}
        sections={sections}
        onDone={onSubmit}
        onNext={onNext}
        showSteps={true}
        active={activeSection}
        refreshButton={true}
        nextText={'Continue'}
        submitText={submitText}
        appraisalTitle="Vroom will verify that the vehicle information you provide is accurate during pickup. Inaccurate information may result in a reduced price or canceled appraisal."
      />
      {isTradeIn && (
        <Cancel onClick={cancelOffer}>
          CANCEL TRADE-IN, CONTINUE PURCHASE
        </Cancel>
      )}
      {showInvalidStateDialog && <InvalidStateDialog />}
      {invalidMakeDialogMake && (
        <InvalidMakeDialog make={invalidMakeDialogMake} />
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

export default observer(AppraisalForm);
