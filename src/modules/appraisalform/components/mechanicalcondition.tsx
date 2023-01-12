import React from 'react';
import styled from 'styled-components';

import handleCheckChange from '../utils/handleCheckChange';
import CheckboxesContainer from './CheckboxesContainer';
import { FormField, UseForm } from './componentInterfaces.d';
import AdditionalDetailsInput from './forminputs/AdditionalDetailsInput';
import FloodFireDamageInput from './forminputs/FloodFireDamageInput';
import MechanicalConditionInput from './forminputs/MechanicalConditionInput';
import RunnableInput from './forminputs/RunnableInput';
import WarningLightsInput from './forminputs/WarningLightsInput';
import WarningLightsOptionsGroup from './forminputs/WarningLightsOptionsGroup';
import StyledCheckbox from './StyledCheckbox';

export interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
  newForm?: boolean;
}

const MechanicalCondition: React.FC<Props> = ({ fields, newForm, form }) => {
  const showWarningLights = fields.warningLights.value === 'Yes';

  return newForm ? (
    <CheckboxesContainer>
      <StyledCheckbox
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
        description="Leaks, smoke, noise or knocking"
      />
      <StyledCheckbox
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
        description="Drivetrain issues, shifts poorly, etc."
      />
      <div>
        <StyledCheckbox
          label="Warning Lights"
          onChange={handleCheckChange(
            fields,
            'warningLights',
            form.updateMultipleFields,
            ['noMechanicalIssues']
          )}
          checked={fields.warningLights?.value === 'Yes'}
          id="warningLights"
          dataQa="warningLights"
          description="Check engine light, other warnings"
        />
        {showWarningLights && (
          <WarningLightsOptionsContainer
            field={fields.warningLightsValues}
            otherWarningField={fields.otherWarning}
            newForm
          />
        )}
      </div>
      <StyledCheckbox
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
        description="Including dead batteries"
      />
      <StyledCheckbox
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
    </CheckboxesContainer>
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

const InputContainer = styled.div`
  display: flex;
  text-align: left;
  margin-bottom: 20px;

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

interface WarningLightsOptionsContainerProps {
  newForm?: boolean;
}

const WarningLightsOptionsContainer = styled(
  WarningLightsOptionsGroup
)<WarningLightsOptionsContainerProps>`
  margin-top: 10px;

  ${({ newForm }) =>
    newForm &&
    `
    margin-left: 15px;
  `}
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
