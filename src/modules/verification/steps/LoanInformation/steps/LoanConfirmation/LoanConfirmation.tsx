import React from 'react';

import { Col, Row } from '../../../../../../styled/grid';
import SelectBoxes from '../../../../components/SelectBoxes';
import { WizardStepProps } from '../../../../components/WizardForm';

const LoanConfirmation = ({
  form,
  nextStep,
}: WizardStepProps<{
  loanConfirmation: string;
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
          label="Are you currently making payments on the vehicle?"
          options={['Yes', 'No']}
          control={form.control}
          id={'loanConfirmation'}
          onChange={(value) => {
            if (value === 'Yes') nextStep?.();
          }}
        />
      </Col>
    </Row>
  );
};

export default LoanConfirmation;
