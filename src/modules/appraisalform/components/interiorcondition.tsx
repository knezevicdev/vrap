import { addStyleForMobile, Checkbox } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import handleCheckChange from '../utils/handleCheckChange';
import CheckboxTooltip from './CheckboxTooltip';
import { UseForm } from './componentInterfaces.d';
import InteriorConditionInput from './forminputs/InteriorConditionInput';
import SeatsInput from './forminputs/SeatsInput';
import SmokedInInput from './forminputs/SmokedInInput';

export interface Props {
  fields: any;
  newForm?: boolean;
  form: UseForm;
}

const InteriorCondition: React.FC<Props> = ({ fields, newForm, form }) => {
  if (newForm) {
    return (
      <>
        <InputContainer modernSpacing>
          <Checkbox
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
        </InputContainer>
        <InputContainer modernSpacing>
          <Checkbox
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
          />
          <CheckboxTooltip>Smoking, pets, etc.</CheckboxTooltip>
        </InputContainer>
        <InputContainer modernSpacing>
          <Checkbox
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
          />
          <CheckboxTooltip>Navigation, entertainment, etc.</CheckboxTooltip>
        </InputContainer>
        <InputContainer modernSpacing>
          <Checkbox
            label="Damaged Dashboard or Interior Panels"
            onChange={handleCheckChange(
              fields,
              'damagedDashboardOrPanels',
              form.updateMultipleFields,
              ['noInteriorDamage']
            )}
            checked={fields.damagedDashboardOrPanels?.value === 'Yes'}
            id="damagedDashboardOrPanels"
            dataQa="damagedDashboardOrPanels"
          />
        </InputContainer>
        <InputContainer modernSpacing>
          <Checkbox
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
        </InputContainer>
      </>
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

type InputContainerProps = {
  modernSpacing?: boolean;
};

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  text-align: left;
  margin-bottom: ${({ modernSpacing }) =>
    modernSpacing ? '16px !important' : `20px`};
  justify-content: space-between;
  flex-direction: column;

  ${addStyleForMobile(`
    flex-direction: column;
    margin-bottom: 0px;
  `)}
`;

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
