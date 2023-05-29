import React, { useEffect } from 'react';
import styled from 'styled-components';

import useMediaQuery from '../../../../hooks/useMediaQuery';
import handleCheckChange from '../../utils/handleCheckChange';
import CheckboxesContainer from '../CheckboxesContainer';
import { UseForm } from '../componentInterfaces.d';
import DentsPanelsInput from '../forminputs/DentsPanelsInput';
import MajorExteriorPanelsInput from '../forminputs/MajorExteriorPanelsInput';
import PaintChippingPanelsInput from '../forminputs/PaintChippingPanelsInput';
import ScratchesPanelsInput from '../forminputs/ScratchesPanelsInput';
import StyledCheckbox from '../StyledCheckbox';

interface Props {
  fields: any;
  form: UseForm;
}

const damageTypePanelMap: Record<string, string> = {
  dents: 'dentsPanels',
  paintChipping: 'paintChippingPanels',
  scratches: 'scratchesPanels',
  majorDamageExterior: 'panelsWithMajorDamage',
};

const ExteriorConditions: React.FC<Props> = ({ fields, form }) => {
  const isMobile = useMediaQuery('mobile');
  const showDentsPanels = fields.dents && fields.dents.value === 'Yes';
  const showPaintChippingPanels =
    fields.paintChipping && fields.paintChipping.value === 'Yes';
  const showScratchesPanels =
    fields.scratches && fields.scratches.value === 'Yes';
  const showMajorDamagePanels =
    fields.majorDamageExterior && fields.majorDamageExterior.value === 'Yes';

  ['dents', 'paintChipping', 'scratches', 'majorDamageExterior'].map(
    (damageType) => {
      const damageTypePanels = damageTypePanelMap[damageType];
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
    }
  );

  return (
    <CheckboxesContainer>
      <StyledCheckbox
        label="Paint Damage/Imperfections"
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
        label="Hail Damage"
        onChange={handleCheckChange(
          fields,
          'hailDamage',
          form.updateMultipleFields,
          ['noExteriorDamage']
        )}
        checked={fields.hailDamage?.value === 'Yes'}
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
        label="Scratches"
        onChange={handleCheckChange(
          fields,
          'scratches',
          form.updateMultipleFields,
          ['noExteriorDamage']
        )}
        checked={fields.scratches?.value === 'Yes'}
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
        label="Rust"
        onChange={handleCheckChange(fields, 'rust', form.updateMultipleFields, [
          'noExteriorDamage',
        ])}
        checked={fields.rust?.value === 'Yes'}
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
        label="Minor Dents or Dings"
        description="Larger than ½″ in size"
        onChange={handleCheckChange(
          fields,
          'dents',
          form.updateMultipleFields,
          ['noExteriorDamage']
        )}
        checked={fields.dents?.value === 'Yes'}
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
        label="Tire(s) requiring replacement"
        onChange={handleCheckChange(
          fields,
          'wornTires',
          form.updateMultipleFields,
          ['noExteriorDamage']
        )}
        checked={fields.wornTires?.value === 'Yes'}
        id="wornTires"
        dataQa="wornTires"
        description="1 or more mismatched or worn tires"
      />
      <StyledCheckbox
        label="Windshield is cracked/chipped"
        onChange={handleCheckChange(
          fields,
          'windshieldCrackedChipped',
          form.updateMultipleFields,
          ['noExteriorDamage']
        )}
        checked={fields.windshieldCrackedChipped?.value === 'Yes'}
        id="windshieldCrackedChipped"
        dataQa="windshieldCrackedChipped"
      />
      <StyledCheckbox
        label="Frame or Structural Damage"
        onChange={handleCheckChange(
          fields,
          'frameOrStructuralDamage',
          form.updateMultipleFields,
          ['noExteriorDamage']
        )}
        checked={fields.frameOrStructuralDamage?.value === 'Yes'}
        id="frameOrStructuralDamage"
        dataQa="frameOrStructuralDamage"
      />
      <StyledCheckbox
        label="Major Damage"
        description="Panel(s) requiring repair or replacement"
        onChange={handleCheckChange(
          fields,
          'majorDamageExterior',
          form.updateMultipleFields,
          ['noExteriorDamage']
        )}
        checked={fields.majorDamageExterior.value === 'Yes'}
        id="majorDamageExterior"
        dataQa="majorDamageExterior"
      />
      {showMajorDamagePanels && isMobile && (
        <PanelsWrapper>
          <MajorExteriorPanels field={fields.panelsWithMajorDamage} />
        </PanelsWrapper>
      )}
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
            'majorDamageExterior',
            'frameOrStructuralDamage',
            'windshieldCrackedChipped',
          ]
        )}
        checked={fields.noExteriorDamage?.value === 'Yes'}
        id="noExteriorDamage"
        dataQa="noExteriorDamage"
      />
      {showMajorDamagePanels && !isMobile && (
        <PanelsWrapper>
          <MajorExteriorPanels field={fields.panelsWithMajorDamage} />
        </PanelsWrapper>
      )}
    </CheckboxesContainer>
  );
};

const PanelsWrapper = styled.div`
  grid-column: 1/-1;
`;

const DentsPanels = styled(DentsPanelsInput)`
  width: 100%;
  margin: 16px 0;
`;

const MajorExteriorPanels = styled(MajorExteriorPanelsInput)`
  width: 100%;
  margin: 16px 0;
`;

const PaintChippingPanels = styled(PaintChippingPanelsInput)`
  width: 100%;
  margin: 16px 0;
`;

const ScratchesPanels = styled(ScratchesPanelsInput)`
  width: 100%;
  margin: 16px 0;
`;

export default ExteriorConditions;
