import React from 'react';
import styled from 'styled-components';

import handleCheckChange from '../utils/handleCheckChange';
import CheckboxesContainer from './CheckboxesContainer';
import { UseForm } from './componentInterfaces.d';
import InteriorConditionInput from './forminputs/InteriorConditionInput';
import SeatsInput from './forminputs/SeatsInput';
import SmokedInInput from './forminputs/SmokedInInput';
import StyledCheckbox from './StyledCheckbox';

export interface Props {
  fields: any;
  newForm?: boolean;
  form: UseForm;
}

const InteriorCondition: React.FC<Props> = ({ fields, newForm, form }) => {
  if (newForm) {
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
            ]
          )}
          checked={fields.noInteriorDamage?.value === 'Yes'}
          id="noInteriorDamage"
          dataQa="noInteriorDamage"
        />
      </CheckboxesContainer>
    );
  }

  return (
    <>
      <InteriorConditionInput field={fields.interiorCondition} />
      <InteriorDetails>
        <HorizontalRadioContainer>
          <SeatsInput field={fields.seats} />
        </HorizontalRadioContainer>
        <HorizontalRadioContainer>
          <SmokedInInput field={fields.smokedIn} />
        </HorizontalRadioContainer>
      </InteriorDetails>
    </>
  );
};

const InteriorDetails = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    display: block;
  }
`;

const HorizontalRadioContainer = styled.div`
  width: 49%;
  margin: 20px 0;
  @media (max-width: 767px) {
    width: 100%;
    margin: 20px 0 0;
  }
`;

export default InteriorCondition;
