import React from 'react';

import SelectBoxes from '../../../../components/SelectBoxes';
import { WizardStepProps } from '../../../../components/WizardForm';

import { Col, Row } from 'src/styled/grid';

const SecondOwnerConfirmation = ({
  form,
  nextStep,
}: WizardStepProps<{
  secondOwnerConfirmation: string;
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
          label="Is there a second owner of this vehicle?"
          options={['Yes', 'No']}
          control={form.control}
          id={'secondOwnerConfirmation'}
          onChange={(value) => {
            if (value === 'Yes') nextStep?.();
          }}
        />
      </Col>
    </Row>
  );
};

export default SecondOwnerConfirmation;
