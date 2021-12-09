import AfterMarketModsOptionsGroup from '@app/components/Form/Inputs/AppraisalFormInput/AfterMarketModsOptionsGroup';
import AlternateAfterMarketModsOptionsGroup from '@app/components/Form/Inputs/AppraisalFormInput/AlternateAfterMarketModsOptionsGroup';
import DentsInput from '@app/components/Form/Inputs/AppraisalFormInput/DentsInput';
import DentsPanelsInput from '@app/components/Form/Inputs/AppraisalFormInput/DentsPanelsInput';
import ExteriorConditionInput from '@app/components/Form/Inputs/AppraisalFormInput/ExteriorConditionInput';
import HailDamageInput from '@app/components/Form/Inputs/AppraisalFormInput/HailDamageInput';
import PaintChippingInput from '@app/components/Form/Inputs/AppraisalFormInput/PaintChippingInput';
import PaintChippingPanelsInput from '@app/components/Form/Inputs/AppraisalFormInput/PaintChippingPanelsInput';
import RustInput from '@app/components/Form/Inputs/AppraisalFormInput/RustInput';
import ScratchesInput from '@app/components/Form/Inputs/AppraisalFormInput/ScratchesInput';
import ScratchesPanelsInput from '@app/components/Form/Inputs/AppraisalFormInput/ScratchesPanelsInput';
import TireMilesInput from '@app/components/Form/Inputs/AppraisalFormInput/TireMilesInput';
import { selectExperiment } from '@app/store/absmartly/selectors';
import { APPRAISAL_DETAILED_CONDITION_QUESTIONS } from '@app/store/absmartly/types';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import styled from 'styled-components';

const ExteriorCondition = ({
  fields,
  disableExperiments,
  isDetailedConditionsExperiment,
}) => {
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

ExteriorCondition.propTypes = {
  fields: PropTypes.object,
  disableExperiments: PropTypes.bool,
  isDetailedConditionsExperiment: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isDetailedConditionsExperiment: selectExperiment(
      state,
      APPRAISAL_DETAILED_CONDITION_QUESTIONS
    ),
  };
};

const InputContainer = styled.div`
  display: flex;
  text-align: left;
  margin-bottom: 20px;
  justify-content: space-between;

  ${(props) => props.theme.media.lte('mobile')} {
    flex-direction: column;
    margin-bottom: 0px;
  }
`;

const ExtCondition = styled(ExteriorConditionInput)`
  margin-right: 10px;
  ${(props) => props.theme.media.lte('mobile')} {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
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

export default compose(withRouter, connect(mapStateToProps))(ExteriorCondition);
