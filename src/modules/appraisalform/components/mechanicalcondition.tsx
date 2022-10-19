import { Checkbox } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import handleCheckChange from '../utils/handleCheckChange';
import { FormField, UseForm } from './componentInterfaces.d';
import AdditionalDetailsInput from './forminputs/AdditionalDetailsInput';
import FloodFireDamageInput from './forminputs/FloodFireDamageInput';
import { FormFields } from './forminputs/Inputs.language';
import MechanicalConditionInput from './forminputs/MechanicalConditionInput';
import RunnableInput from './forminputs/RunnableInput';
import WarningLightsInput from './forminputs/WarningLightsInput';
import WarningLightsOptionsGroup from './forminputs/WarningLightsOptionsGroup';

export interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
  newForm?: boolean;
}

const MechanicalCondition: React.FC<Props> = ({ fields, newForm, form }) => {
  const showWarningLights = fields.warningLights.value === 'Yes';

  return newForm ? (
    <>
      <InputContainer modernSpacing>
        <Left>
          <Checkbox
            label={FormFields.warningLights.newLabel}
            onChange={handleCheckChange(
              fields,
              'warningLights',
              form.updateMultipleFields,
              ['noMechanicalIssues']
            )}
            checked={fields.warningLights?.value === 'Yes'}
            id="warningLights"
            dataQa="warningLights"
          />
          {showWarningLights && (
            <WarningLightsOptionsContainer
              field={fields.warningLightsValues}
              otherWarningField={fields.otherWarning}
            />
          )}
        </Left>
      </InputContainer>
      <InputContainer modernSpacing>
        <Checkbox
          label="Transmission"
          onChange={handleCheckChange(
            fields,
            'transmissionIssue',
            form.updateMultipleFields,
            ['noMechanicalIssues']
          )}
          checked={fields.transmissionIssue?.value === 'Yes'}
          id="transmissionIssue"
          dataQa="transmissionIssue"
        />
      </InputContainer>
      <InputContainer modernSpacing>
        <Checkbox
          label="Engine"
          onChange={handleCheckChange(
            fields,
            'engineIssue',
            form.updateMultipleFields,
            ['noMechanicalIssues']
          )}
          checked={fields.engineIssue?.value === 'Yes'}
          id="engineIssue"
          dataQa="engineIssue"
        />
      </InputContainer>
      <InputContainer modernSpacing>
        <Checkbox
          label="Does Not Run/Not Drivable"
          onChange={handleCheckChange(
            fields,
            'runnable',
            form.updateMultipleFields,
            ['noMechanicalIssues'],
            true
          )}
          checked={fields.runnable?.value === 'No'}
          id="runnable"
          dataQa="runnable"
        />
      </InputContainer>
      <InputContainer modernSpacing>
        <Checkbox
          label="No Mechanical or Electrical Issues"
          onChange={handleCheckChange(
            fields,
            'noMechanicalIssues',
            form.updateMultipleFields,
            [
              'engineIssue',
              'transmissionIssue',
              'warningLights',
              { field: 'runnable', invert: true },
            ]
          )}
          checked={fields.noMechanicalIssues?.value === 'Yes'}
          id="noMechanicalIssues"
          dataQa="noMechanicalIssues"
        />
      </InputContainer>
    </>
  ) : (
    <>
      <InputContainer>
        <RunnableInput field={fields.runnable} />
      </InputContainer>
      <InputContainer>
        <MechanicalConditionRadios field={fields.mechanicalCondition} />
      </InputContainer>
      <InputContainer>
        <Left>
          <WarningLightsInput field={fields.warningLights} />
          {showWarningLights && (
            <WarningLightsOptionsContainer
              field={fields.warningLightsValues}
              otherWarningField={fields.otherWarning}
            />
          )}
        </Left>
        <FloodFireDamageInput field={fields.floodFireDamage} />
      </InputContainer>
      <InputContainer>
        <AdditionalDetails field={fields.additionalDetails} />
      </InputContainer>
    </>
  );
};

type InputContainerProps = {
  modernSpacing?: boolean;
};

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  text-align: left;
  margin-bottom: ${({ modernSpacing }) =>
    modernSpacing ? '16px !important' : `20px`};

  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 0px;
  }
`;

const Left = styled.div`
  width: 50%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const WarningLightsOptionsContainer = styled(WarningLightsOptionsGroup)`
  margin-top: 10px;
`;

const MechanicalConditionRadios = styled(MechanicalConditionInput)`
  margin-right: 10px;
  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
`;

const AdditionalDetails = styled(AdditionalDetailsInput)`
  width: 100%;

  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
`;

export default MechanicalCondition;
