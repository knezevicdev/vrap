import React from 'react';

import { Col, Row } from '../../../../../../../styled/grid';
import SelectBoxes from '../../../../components/SelectBoxes';
import { WizardStepProps } from '../../../../components/WizardForm';

const ContactInfoConfirmation = ({
  form,
  nextStep,
}: WizardStepProps<{
  contactInfoConfirmation: string;
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
          label="Will the primary owner be the point of contact when we pick up this vehicle?"
          options={['Yes', 'No']}
          control={form.control}
          id={'contactInfoConfirmation'}
          onChange={(value) => {
            if (value === 'No') nextStep?.();
          }}
        />
      </Col>
    </Row>
  );
};

export default ContactInfoConfirmation;
