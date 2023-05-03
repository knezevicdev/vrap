import useAppraisalFormInit from '../components/useFormInit';

const combinedFormNextIntercept =
  (appraisalUseForm: ReturnType<typeof useAppraisalFormInit>) =>
  (proceedToNextStep: () => void) => {
    // mechanicalCondition
    let mechanicalCondition = 'Average';
    if (
      [
        appraisalUseForm.mechConditionForm.fields.transmissionIssue.value,
        appraisalUseForm.mechConditionForm.fields.engineIssue.value,
      ].includes('Yes')
    ) {
      mechanicalCondition = 'Below Average';
    } else if (
      appraisalUseForm.mechConditionForm.fields.noMechanicalIssues.value ===
      'Yes'
    ) {
      mechanicalCondition = 'Above Average';
    }
    // floodFireDamage
    const floodFireDamage = [
      appraisalUseForm.extConditionForm.fields.floodDamage.value,
      appraisalUseForm.extConditionForm.fields.fireDamage.value,
    ].includes('Yes')
      ? 'Yes'
      : 'No';
    // exteriorCondition
    let exteriorCondition = 'Average';
    if (
      appraisalUseForm.extConditionForm.fields.noExteriorDamage.value === 'Yes'
    ) {
      exteriorCondition = 'Above Average';
    }
    if (
      (appraisalUseForm.vehicleHistoryForm.fields.hasAccident.value === 'Yes' &&
        appraisalUseForm.vehicleHistoryForm.fields.repairedAfterAccident
          .value === 'No') ||
      (appraisalUseForm.extConditionForm.fields.majorDamageExterior.value ===
        'Yes' &&
        [3, 4, 5, '3', '4', '5'].includes(
          appraisalUseForm.extConditionForm.fields.panelsWithMajorDamage.value
        ))
    ) {
      exteriorCondition = 'Below Average';
    }
    // tiresAndWheels
    let tiresAndWheels = 'Under 5K';
    if (appraisalUseForm.extConditionForm.fields.wornTires.value === 'Yes') {
      tiresAndWheels = 'Over 30K';
    }
    // interiorCondition
    let interiorCondition = 'Average';
    if (
      [
        appraisalUseForm.intConditionForm.fields.ripsOrTearsInSeats.value,
        appraisalUseForm.intConditionForm.fields.damagedElectronic.value,
        appraisalUseForm.intConditionForm.fields.damagedDashboardOrPanels.value,
        appraisalUseForm.intConditionForm.fields.majorDamageInterior.value,
      ].includes('Yes')
    ) {
      interiorCondition = 'Below Average';
    } else if (
      appraisalUseForm.intConditionForm.fields.noInteriorDamage.value === 'Yes'
    ) {
      interiorCondition = 'Above Average';
    }

    appraisalUseForm.mechConditionForm.updateMultipleFields({
      mechanicalCondition: {
        ...appraisalUseForm.mechConditionForm.fields.mechanicalCondition,
        value: mechanicalCondition,
      },
      floodFireDamage: {
        ...appraisalUseForm.mechConditionForm.fields.floodFireDamage,
        value: floodFireDamage,
      },
    });

    appraisalUseForm.extConditionForm.updateMultipleFields({
      exteriorCondition: {
        ...appraisalUseForm.extConditionForm.fields.exteriorCondition,
        value: exteriorCondition,
      },
      tiresAndWheels: {
        ...appraisalUseForm.extConditionForm.fields.tiresAndWheels,
        value: tiresAndWheels,
      },
    });

    appraisalUseForm.intConditionForm.updateMultipleFields({
      interiorCondition: {
        ...appraisalUseForm.intConditionForm.fields.interiorCondition,
        value: interiorCondition,
      },
    });

    proceedToNextStep();
  };

export default combinedFormNextIntercept;
