import { addStyleForMobile } from '@vroom-web/ui-lib';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import useIsMobile from '../../../../hooks/useIsMobile';
import handleCheckChange from '../../utils/handleCheckChange';
import CheckboxesContainer from '../CheckboxesContainer';
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
import StyledCheckbox from '../StyledCheckbox';

interface Props {
  fields: any;
  newForm?: boolean;
  form: UseForm;
}

const ExteriorConditionView: React.FC<Props> = ({
  fields,
  newForm,
  form,
}) => {
  const isMobile = useIsMobile();
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

  if (newForm) {
    return (
      <CheckboxesContainer>
        <StyledCheckbox
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
          description="Visibly faded, rough, or peeling"
        />
        {showPaintChippingPanels && isMobile && (
          <PanelsWrapper>
            <PaintChippingPanels field={fields.paintChippingPanels} />
          </PanelsWrapper>
        )}
        <StyledCheckbox
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
          description="5 or more dents to any panel"
        />
        {showPaintChippingPanels && !isMobile && (
          <PanelsWrapper>
            <PaintChippingPanels field={fields.paintChippingPanels} />
          </PanelsWrapper>
        )}
        <StyledCheckbox
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
          description="Visible scratches"
        />
        {showScratchesPanels && isMobile && (
          <PanelsWrapper>
            <ScratchesPanels field={fields.scratchesPanels} />
          </PanelsWrapper>
        )}
        <StyledCheckbox
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
          description="Visible signs of rust on any panels"
        />
        {showScratchesPanels && !isMobile && (
          <PanelsWrapper>
            <ScratchesPanels field={fields.scratchesPanels} />
          </PanelsWrapper>
        )}
        <StyledCheckbox
          label="Dents or Dings"
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
        {showDentsPanels && isMobile && (
          <PanelsWrapper>
            <DentsPanels field={fields.dentsPanels} />
          </PanelsWrapper>
        )}
        <StyledCheckbox
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
          description="Flood or water damage"
        />
        {showDentsPanels && !isMobile && (
          <PanelsWrapper>
            <DentsPanels field={fields.dentsPanels} />
          </PanelsWrapper>
        )}
        <StyledCheckbox
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
        <StyledCheckbox
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
          description="At least one tire needing replacement"
        />
        <StyledCheckbox
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
      </CheckboxesContainer>
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
      <InputContainer>
        <AlternateAfterMarketModsOptionsGroup
          field={fields.afterMarket}
          otherAfterMarketField={fields.otherAfterMarket}
        />
      </InputContainer>
    </>
  );
};

const PanelsWrapper = styled.div`
  grid-column: 1/-1;
`;

const InputContainer = styled.div`
  display: flex;
  text-align: left;
  margin-bottom: 20px;
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
