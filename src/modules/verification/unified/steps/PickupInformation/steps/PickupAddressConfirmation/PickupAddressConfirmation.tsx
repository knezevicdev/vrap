import React from 'react';

import { Col, Row } from '../../../../../../../styled/grid';
import SelectBoxes from '../../../../components/SelectBoxes';
import { WizardStepProps } from '../../../../components/WizardForm';

const PickupAddressConfirmation = ({
  form,
  nextStep,
  goToStep,
}: WizardStepProps<{
  pickupAddressConfirmation: string;
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
          label="Is the pick up address the same as the primary owner's address?"
          options={['Yes', 'No']}
          control={form.control}
          id={'pickupAddressConfirmation'}
          onChange={(value) => {
            if (value === 'Yes') {
              goToStep?.(3);
              return;
            }
            nextStep?.();
          }}
        />
      </Col>
    </Row>
  );
};

export default PickupAddressConfirmation;
