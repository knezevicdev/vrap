import React from 'react';

import handleCheckChange from '../utils/handleCheckChange';
import CheckboxesContainer from './CheckboxesContainer';
import { UseForm } from './componentInterfaces.d';
import StyledCheckbox from './StyledCheckbox';

export interface Props {
  fields: any;
  form: UseForm;
}

const InteriorCondition: React.FC<Props> = ({ fields, form }) => {
  return (
    <CheckboxesContainer>
      <StyledCheckbox
        label="Rips or Tears in Seats"
        onChange={handleCheckChange(
          fields,
          'ripsOrTearsInSeats',
          form.updateMultipleFields,
          ['noInteriorDamage']
        )}
        checked={fields.ripsOrTearsInSeats?.value === 'Yes'}
        id="ripsOrTearsInSeats"
        dataQa="ripsOrTearsInSeats"
      />
      <StyledCheckbox
        label="Persistent Odors"
        onChange={handleCheckChange(
          fields,
          'smokedIn',
          form.updateMultipleFields,
          ['noInteriorDamage']
        )}
        checked={fields.smokedIn?.value === 'Yes'}
        id="smokedIn"
        dataQa="smokedIn"
        description="Smoke, animal, or foul smell"
      />
      <StyledCheckbox
        label="Damaged Electronic Equipment"
        onChange={handleCheckChange(
          fields,
          'damagedElectronic',
          form.updateMultipleFields,
          ['noInteriorDamage']
        )}
        checked={fields.damagedElectronic?.value === 'Yes'}
        id="damagedElectronic"
        dataQa="damagedElectronic"
        description="Infotainment screens, Dash cluster, etc."
      />
      <StyledCheckbox
        label="Damaged Dash/Interior Panels"
        onChange={handleCheckChange(
          fields,
          'damagedDashboardOrPanels',
          form.updateMultipleFields,
          ['noInteriorDamage']
        )}
        checked={fields.damagedDashboardOrPanels?.value === 'Yes'}
        id="damagedDashboardOrPanels"
        dataQa="damagedDashboardOrPanels"
        description="Peeling/cracked dash, headliner stains/tears"
      />
      <StyledCheckbox
        label="Major Damage"
        onChange={handleCheckChange(
          fields,
          'majorDamageInterior',
          form.updateMultipleFields,
          ['noInteriorDamage']
        )}
        checked={fields.majorDamageInterior?.value === 'Yes'}
        id="majorDamageInterior"
        dataQa="majorDamageInterior"
        description="Seats work required, overall rough condition"
      />
      <StyledCheckbox
        label="No Interior Damage"
        onChange={handleCheckChange(
          fields,
          'noInteriorDamage',
          form.updateMultipleFields,
          [
            'damagedDashboardOrPanels',
            'damagedElectronic',
            'smokedIn',
            'ripsOrTearsInSeats',
            'majorDamageInterior',
          ]
        )}
        checked={fields.noInteriorDamage?.value === 'Yes'}
        id="noInteriorDamage"
        dataQa="noInteriorDamage"
      />
    </CheckboxesContainer>
  );
};

export default InteriorCondition;
