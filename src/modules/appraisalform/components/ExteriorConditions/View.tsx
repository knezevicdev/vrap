import { addStyleForMobile, Checkbox } from '@vroom-web/ui-lib';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import handleCheckChange from '../../utils/handleCheckChange';
import CheckboxTooltip from '../CheckboxTooltip';
import { UseForm } from '../componentInterfaces.d';
import AlternateAfterMarketModsOptionsGroup from '../forminputs/AlternateAfterMarketModsOptionsGroup';
import DentsInput from '../forminputs/DentsInput';
import DentsPanelsInput from '../forminputs/DentsPanelsInput';
import ExteriorConditionInput from '../forminputs/ExteriorConditionInput';
import HailDamageInput from '../forminputs/HailDamageInput';
import { FormFields } from '../forminputs/Inputs.language';
import PaintChippingInput from '../forminputs/PaintChippingInput';
import PaintChippingPanelsInput from '../forminputs/PaintChippingPanelsInput';
import RustInput from '../forminputs/RustInput';
import ScratchesInput from '../forminputs/ScratchesInput';
import ScratchesPanelsInput from '../forminputs/ScratchesPanelsInput';
import TireMilesInput from '../forminputs/TireMilesInput';
import ViewModel from './ViewModel';

interface Props {
  fields: any;
  viewModel: ViewModel;
  newForm?: boolean;
  form: UseForm;
}

const ExteriorConditionView: React.FC<Props> = ({
  fields,
  viewModel,
  newForm,
  form,
}) => {
  const showDentsPanels = fields.dents && fields.dents.value === 'Yes';
  const showPaintChippingPanels =
    fields.paintChipping && fields.paintChipping.value === 'Yes';
  const showScratchesPanels =
    fields.scratches && fields.scratches.value === 'Yes';

  ['dents', 'paintChipping', 'scratches'].map((damageType) => {
    const damageTypePanels = `${damageType}Panels`;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!fields[damageType]) return;
      if (fields[damageType].value === 'Yes') {
        fields[damageTypePanels].onChange({
          ...fields[damageTypePanels],
          value: undefined,
          isRequired: true,
        });
      } else {
        fields[damageTypePanels].onChange({
          ...fields[damageTypePanels],
          value: undefined,
          isRequired: false,
        });
      }
    }, [fields[damageType] && fields[damageType].value]);
  });

  useEffect(() => {
    if (viewModel.isRemoveMilesOnTiresExperiment) {
      fields.tiresAndWheels.onChange({
        ...fields.tiresAndWheels,
        value: 'Under 5K',
      });
    }
  }, [viewModel.isRemoveMilesOnTiresExperiment]);

  if (newForm) {
    return (
      <>
        <InputContainer modernSpacing>
          <Checkbox
            label={FormFields.paintChipping.newLabel}
            onChange={handleCheckChange(
              fields,
              'paintChipping',
              form.updateMultipleFields,
              ['noExteriorDamage']
            )}
            checked={fields.paintChipping?.value === 'Yes'}
            id="paintChipping"
            dataQa="paintChipping"
          />
          <CheckboxTooltip>Visibly dull or rough</CheckboxTooltip>
        </InputContainer>
        {showPaintChippingPanels && (
          <InputContainer modernSpacing>
            <PaintChippingPanels field={fields.paintChippingPanels} />
          </InputContainer>
        )}
        <InputContainer modernSpacing>
          <Checkbox
            label={FormFields.dents.newLabel}
            onChange={handleCheckChange(
              fields,
              'dents',
              form.updateMultipleFields,
              ['noExteriorDamage']
            )}
            checked={fields.dents?.value === FormFields.dents.yes}
            id="dents"
            dataQa="dents"
          />
        </InputContainer>
        {showDentsPanels && (
          <InputContainer modernSpacing>
            <DentsPanels field={fields.dentsPanels} />{' '}
          </InputContainer>
        )}
        <InputContainer modernSpacing>
          <Checkbox
            label={FormFields.scratches.newLabel}
            onChange={handleCheckChange(
              fields,
              'scratches',
              form.updateMultipleFields,
              ['noExteriorDamage']
            )}
            checked={fields.scratches?.value === FormFields.scratches.yes}
            id="scratches"
            dataQa="scratches"
          />
        </InputContainer>
        {showScratchesPanels && (
          <InputContainer modernSpacing>
            <ScratchesPanels field={fields.scratchesPanels} />
          </InputContainer>
        )}
        <InputContainer modernSpacing>
          <Checkbox
            label={FormFields.rust.newLabel}
            onChange={handleCheckChange(
              fields,
              'rust',
              form.updateMultipleFields,
              ['noExteriorDamage']
            )}
            checked={fields.rust?.value === FormFields.rust.yes}
            id="rust"
            dataQa="rust"
          />
        </InputContainer>
        <InputContainer modernSpacing>
          <Checkbox
            label={FormFields.hailDamage.newLabel}
            onChange={handleCheckChange(
              fields,
              'hailDamage',
              form.updateMultipleFields,
              ['noExteriorDamage']
            )}
            checked={fields.hailDamage?.value === FormFields.hailDamage.yes}
            id="hailDamage"
            dataQa="hailDamage"
          />
        </InputContainer>
        <InputContainer modernSpacing>
          <Checkbox
            label="Water Damage"
            onChange={handleCheckChange(
              fields,
              'floodDamage',
              form.updateMultipleFields,
              ['noExteriorDamage']
            )}
            checked={fields.floodDamage?.value === 'Yes'}
            id="floodDamage"
            dataQa="floodDamage"
          />
        </InputContainer>
        <InputContainer modernSpacing>
          <Checkbox
            label="Fire Damage"
            onChange={handleCheckChange(
              fields,
              'fireDamage',
              form.updateMultipleFields,
              ['noExteriorDamage']
            )}
            checked={fields.fireDamage?.value === 'Yes'}
            id="fireDamage"
            dataQa="fireDamage"
          />
        </InputContainer>
        <InputContainer modernSpacing>
          <Checkbox
            label="Worn Tires"
            onChange={handleCheckChange(
              fields,
              'wornTires',
              form.updateMultipleFields,
              ['noExteriorDamage']
            )}
            checked={fields.wornTires?.value === 'Yes'}
            id="wornTires"
            dataQa="wornTires"
          />
          <CheckboxTooltip>Needs to be replaced</CheckboxTooltip>
        </InputContainer>
        <InputContainer modernSpacing>
          <Checkbox
            label="No Exterior Damage"
            onChange={handleCheckChange(
              fields,
              'noExteriorDamage',
              form.updateMultipleFields,
              [
                'wornTires',
                'fireDamage',
                'floodDamage',
                'hailDamage',
                'rust',
                'scratches',
                'dents',
                'paintChipping',
              ]
            )}
            checked={fields.noExteriorDamage?.value === 'Yes'}
            id="noExteriorDamage"
            dataQa="noExteriorDamage"
          />
        </InputContainer>
      </>
    );
  }

  return (
    <>
      <InputContainer>
        <ExtCondition field={fields.exteriorCondition} />
      </InputContainer>
      {fields.rust && fields.dents && (
        <>
          <InputContainer>
            <Rust field={fields.rust} />
          </InputContainer>
          <InputContainer>
            <Dents field={fields.dents} />
          </InputContainer>
          {showDentsPanels && (
            <InputContainer>
              <DentsPanels field={fields.dentsPanels} />{' '}
            </InputContainer>
          )}
        </>
      )}
      <InputContainer>
        <HailDamageInput field={fields.hailDamage} />
      </InputContainer>
      <InputContainer>
        <PaintChipping field={fields.paintChipping} />
      </InputContainer>
      {showPaintChippingPanels && (
        <InputContainer>
          <PaintChippingPanels field={fields.paintChippingPanels} />
        </InputContainer>
      )}
      <InputContainer>
        <Scratches field={fields.scratches} />
      </InputContainer>
      {showScratchesPanels && (
        <InputContainer>
          <ScratchesPanels field={fields.scratchesPanels} />
        </InputContainer>
      )}
      {!newForm && !viewModel.isRemoveMilesOnTiresExperiment && (
        <InputContainer>
          <TireMilesInput field={fields.tiresAndWheels} />
        </InputContainer>
      )}
      <InputContainer>
        <AlternateAfterMarketModsOptionsGroup
          field={fields.afterMarket}
          otherAfterMarketField={fields.otherAfterMarket}
        />
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
  flex-direction: column;

  ${addStyleForMobile(`
    flex-direction: column;
    margin-bottom: 0;
  `)}
`;

const ExtCondition = styled(ExteriorConditionInput)`
  margin-right: 10px;
  ${addStyleForMobile(`
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  `)}
`;

const Rust = styled(RustInput)`
  width: 100%;
  margin: 16px 0;
`;

const Dents = styled(DentsInput)`
  width: 100%;
  margin: 16px 0;
`;

const DentsPanels = styled(DentsPanelsInput)`
  width: 100%;
  margin: 16px 0;
`;

const PaintChipping = styled(PaintChippingInput)`
  width: 100%;
  margin: 16px 0;
`;

const PaintChippingPanels = styled(PaintChippingPanelsInput)`
  width: 100%;
  margin: 16px 0;
`;

const Scratches = styled(ScratchesInput)`
  width: 100%;
  margin: 16px 0;
`;

const ScratchesPanels = styled(ScratchesPanelsInput)`
  width: 100%;
  margin: 16px 0;
`;

export default ExteriorConditionView;
