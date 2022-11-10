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
}

const CombinedVehicleInfoForms = (props: Props): ReactNode => {
  return (
    <div>
      <VehicleHistory {...props} />
      <hr />
      <p>Does your vehicle have any of the issues listed below?</p>
      <Heading>Mechanical & Electrical Issues</Heading>
      <MechanicalCondition {...props} newForm />
      <Heading>Exterior Damage</Heading>
      <ExteriorCondition {...props} newForm />
      <Heading>Interior Damage</Heading>
      <InteriorCondition {...props} newForm />
      <AftermarketInput
        field={props.fields.afterMarket}
        otherAfterMarketField={props.fields.otherAfterMarket}
        newForm={true}
      />
      <br />
      <AdditionalDetailsInput field={props.fields.additionalDetails} />
    </div>
  );
};

const AftermarketInput = styled(AlternateAfterMarketModsOptionsGroup)`
  h3 {
    font-weight: 700;
    font-size: 16px;
  }
`;

const Heading = styled.strong`
  margin-bottom: 10px;
  display: block;
`;

export default CombinedVehicleInfoForms;
