import React from 'react';
import styled from 'styled-components';

import AdditionalDetailsInput from './forminputs/AdditionalDetailsInput';
import FloodFireDamageInput from './forminputs/FloodFireDamageInput';
import MechanicalConditionInput from './forminputs/MechanicalConditionInput';
import RunnableInput from './forminputs/RunnableInput';
import WarningLightsInput from './forminputs/WarningLightsInput';
import WarningLightsOptionsGroup from './forminputs/WarningLightsOptionsGroup';
export interface Props {
  fields: any;
}

const MechanicalCondition: React.FC<Props> = ({ fields }) => {
  const showWarningLights = fields.warningLights.value === 'Yes';

  return (
    <>
      <InputContainer>
        <Runnable field={fields.runnable} />
      </InputContainer>
      <InputContainer>
        <MechanicalConditionRadios field={fields.mechanicalCondition} />
      </InputContainer>
      <InputContainer>
        <Left>
          <WarningLights field={fields.warningLights} />
          {showWarningLights && (
            <WarningLightsOptionsContainer
              field={fields.warningLightsValues}
              otherWarningField={fields.otherWarning}
            />
          )}
        </Left>
        <FloodFireDamage field={fields.floodFireDamage} />
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

const WarningLightsOptionsContainer = styled(WarningLightsOptionsGroup)`
  margin-top: 10px;
`;

const Runnable = styled(RunnableInput)`
  width: 50%;
  margin-right: 10px;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
`;

const WarningLights = styled(WarningLightsInput)`
  margin-right: 10px;
  @media (max-width: 768px) {
    margin: 0 0 16px 0;
  }
`;

const FloodFireDamage = styled(FloodFireDamageInput)`
  width: 50%;
  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
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
