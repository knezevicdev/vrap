import { addStyleForMobile } from '@vroom-web/ui-lib';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import AfterMarketModsOptionsGroup from '../forminputs/AfterMarketModsOptionsGroup';
import AlternateAfterMarketModsOptionsGroup from '../forminputs/AlternateAfterMarketModsOptionsGroup';
import DentsInput from '../forminputs/DentsInput';
import DentsPanelsInput from '../forminputs/DentsPanelsInput';
import ExteriorConditionInput from '../forminputs/ExteriorConditionInput';
import HailDamageInput from '../forminputs/HailDamageInput';
import PaintChippingInput from '../forminputs/PaintChippingInput';
import PaintChippingPanelsInput from '../forminputs/PaintChippingPanelsInput';
import RustInput from '../forminputs/RustInput';
import ScratchesInput from '../forminputs/ScratchesInput';
import ScratchesPanelsInput from '../forminputs/ScratchesPanelsInput';
import TireMilesInput from '../forminputs/TireMilesInput';
import ViewModel from './ViewModel';

interface Props {
  fields: any;
  disableExperiments: boolean;
  viewModel: ViewModel;
}

const ExteriorConditionView: React.FC<Props> = ({
  fields,
  disableExperiments,
  viewModel,
}) => {
  let isDetailedConditionsExperiment = viewModel.isDetailedConditionsExperiment();

  isDetailedConditionsExperiment = disableExperiments
    ? false
    : isDetailedConditionsExperiment;
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

  return (
    <>
      <InputContainer>
        <ExtCondition field={fields.exteriorCondition} />
      </InputContainer>
      {isDetailedConditionsExperiment && fields.rust && fields.dents && (
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
        <HailDamage field={fields.hailDamage} />
      </InputContainer>
      {isDetailedConditionsExperiment && (
        <>
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
        </>
      )}
      <InputContainer>
        <TireMilesInput field={fields.tiresAndWheels} />
      </InputContainer>
      <InputContainer>
        {isDetailedConditionsExperiment ? (
          <AlternateAfterMarketModsOptionsGroup
            field={fields.afterMarket}
            otherAfterMarketField={fields.otherAfterMarket}
          />
        ) : (
          <AfterMarketModsOptionsGroup
            field={fields.afterMarket}
            otherAfterMarketField={fields.otherAfterMarket}
          />
        )}
      </InputContainer>
    </>
  );
};

const InputContainer = styled.div`
  display: flex;
  text-align: left;
  margin-bottom: 20px;
  justify-content: space-between;

  ${addStyleForMobile(`
    flex-direction: column;
    margin-bottom: 0px;
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

const HailDamage = styled(HailDamageInput)`
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
