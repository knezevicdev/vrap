import React from 'react';

import Input from '../../../../components/Input';
import SelectBoxes from '../../../../components/SelectBoxes';
import { WizardStepProps } from '../../../../components/WizardForm';

import { Col, Row } from 'src/styled/grid';

const FirstOwnerConfirmation = ({
  form,
}: WizardStepProps<{
  firstOwnerConfirmation: string;
  documentMileageValue: number;
}>) => {
  return (
    <Row wrap="wrap" gap="10px">
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
        />
      </Col>

      <Col size={1} disableBottomGap>
        <Row>
          <Col size={{ default: 1 / 2, mobile: 1 }}>
            <Input
              id="documentMileageValue"
              name="documentMileageValue"
              control={form.control}
              placeholder="Mileage"
              label="Mileage shown on the odometer."
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default FirstOwnerConfirmation;
