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
          label="Is there a second owner of this vehicle? You can check by seeing if there is a second person listed on your title."
          tooltip="If you co-own the vehicle with someone else, please make sure to provide their information. Not doing so will delay the purchase of your vehicle and your payment."
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
