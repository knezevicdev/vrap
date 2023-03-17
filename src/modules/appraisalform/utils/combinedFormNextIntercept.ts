import { FormFields } from '../components/forminputs/Inputs.language';
import useAppraisalFormInit from '../components/useFormInit';

const combinedFormNextIntercept =
  (appraisalUseForm: ReturnType<typeof useAppraisalFormInit>) =>
  (proceedToNextStep: () => void) => {
    // mechanicalCondition
    let mechanicalCondition = FormFields.mechanicalCondition.average.label;
    if (
      [
        appraisalUseForm.mechConditionForm.fields.transmissionIssue.value,
        appraisalUseForm.mechConditionForm.fields.engineIssue.value,
      ].includes('Yes')
    ) {
      mechanicalCondition = FormFields.mechanicalCondition.belowAverage.label;
    } else if (
      appraisalUseForm.mechConditionForm.fields.noMechanicalIssues.value ===
      'Yes'
    ) {
      mechanicalCondition = FormFields.mechanicalCondition.aboveAverage.label;
    }
    // floodFireDamage
    const floodFireDamage = [
      appraisalUseForm.extConditionForm.fields.floodDamage.value,
      appraisalUseForm.extConditionForm.fields.fireDamage.value,
    ].includes('Yes')
      ? 'Yes'
      : 'No';
    // exteriorCondition
    let exteriorCondition = FormFields.extCondition.average.label;
    if (
      appraisalUseForm.extConditionForm.fields.noExteriorDamage.value === 'Yes'
    ) {
      exteriorCondition = FormFields.extCondition.aboveAverage.label;
    }
    // tiresAndWheels
    let tiresAndWheels = FormFields.tireMiles.underFive.label;
    if (appraisalUseForm.extConditionForm.fields.wornTires.value === 'Yes') {
      tiresAndWheels = FormFields.tireMiles.overThirty.label;
    }
    // interiorCondition
    let interiorCondition = FormFields.interiorCondition.average.label;
    if (
      [
        appraisalUseForm.intConditionForm.fields.ripsOrTearsInSeats.value,
        appraisalUseForm.intConditionForm.fields.damagedElectronic.value,
        appraisalUseForm.intConditionForm.fields.damagedDashboardOrPanels.value,
        appraisalUseForm.intConditionForm.fields.majorDamageInterior.value,
      ].includes('Yes')
    ) {
      interiorCondition = FormFields.interiorCondition.belowAverage.label;
    } else if (
      appraisalUseForm.intConditionForm.fields.noInteriorDamage.value === 'Yes'
    ) {
      interiorCondition = FormFields.interiorCondition.aboveAverage.label;
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
