import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { FormField } from '../../../interfaces.d';
import { UseForm } from './componentInterfaces.d';
import ExteriorCondition from './ExteriorConditions';
import AdditionalDetailsInput from './forminputs/AdditionalDetailsInput';
import AlternateAfterMarketModsOptionsGroup from './forminputs/AlternateAfterMarketModsOptionsGroup';
import InteriorCondition from './interiorcondition';
import MechanicalCondition from './mechanicalcondition';
import VehicleHistory from './VehicleHistory';

interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
  combinedFormInvalidSections: Record<string, boolean | undefined>;
}

const CombinedVehicleInfoForms = (props: Props): ReactNode => {
  const { isMechanicalSelected, isExteriorSelected, isInteriorSelected } =
    props.combinedFormInvalidSections;

  return (
    <div>
      <VehicleHistory {...props} />
      <hr />
      <p>Does your vehicle have any of the issues listed below?</p>
      <Heading id="mechanical-issues-h">Mechanical & Electrical Issues</Heading>
      <MechanicalCondition {...props} />
      {isMechanicalSelected === false && (
        <ErrorFeedback>Please select at least one option</ErrorFeedback>
      )}
      <Heading id="exterior-damage-h">Exterior Damage</Heading>
      <ExteriorCondition {...props} />
      {isExteriorSelected === false && isMechanicalSelected && (
        <ErrorFeedback>Please select at least one option</ErrorFeedback>
      )}
      <Heading id="interior-damage-h">Interior Damage</Heading>
      <InteriorCondition {...props} />
      {isInteriorSelected === false &&
        isExteriorSelected &&
        isMechanicalSelected && (
          <ErrorFeedback>Please select at least one option</ErrorFeedback>
        )}
      <AftermarketInput
        field={props.fields.afterMarket}
        otherAfterMarketField={props.fields.otherAfterMarket}
        emissionField={props.fields.passStateEmissionStandards}
      />
      <br />
      <AdditionalDetailsInput field={props.fields.additionalDetails} />
    </div>
  );
};

const AftermarketInput = styled(AlternateAfterMarketModsOptionsGroup)`
  margin-top: 16px;

  h3 {
    font-weight: 700;
    font-size: 16px;
  }
`;

const Heading = styled.strong`
  margin-bottom: 10px;
  display: block;
  margin-top: 16px;
`;

const ErrorFeedback = styled.div`
  font-family: Calibre, sans-serif;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #f26900;
`;

export default CombinedVehicleInfoForms;
