import React from 'react';

import { Col, Row } from '../../../../../../styled/grid';
import SelectBoxes from '../../../../components/SelectBoxes';
import { WizardStepProps } from '../../../../components/WizardForm';

const FirstOwnerConfirmation = ({
  form,
  nextStep,
}: WizardStepProps<{
  firstOwnerConfirmation: string;
}>) => {
  return (
    <Row>
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <SelectBoxes
          label="Are you the owner of this vehicle?"
          options={['Yes', 'No']}
          control={form.control}
          id={'firstOwnerConfirmation'}
          onChange={nextStep}
        />
      </Col>
    </Row>
  );
};

export default FirstOwnerConfirmation;
