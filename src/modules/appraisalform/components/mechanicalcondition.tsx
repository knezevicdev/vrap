import React from 'react';
import styled from 'styled-components';

import handleCheckChange from '../utils/handleCheckChange';
import CheckboxesContainer from './CheckboxesContainer';
import { FormField, UseForm } from './componentInterfaces.d';
import WarningLightsOptionsGroup from './forminputs/WarningLightsOptionsGroup';
import StyledCheckbox from './StyledCheckbox';

export interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
}

const MechanicalCondition: React.FC<Props> = ({ fields, form }) => {
  const showWarningLights = fields.warningLights.value === 'Yes';

  return (
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
  );
};

const WarningLightsOptionsContainer = styled(WarningLightsOptionsGroup)`
  margin-top: 10px;
  margin-left: 15px;
`;

export default MechanicalCondition;
