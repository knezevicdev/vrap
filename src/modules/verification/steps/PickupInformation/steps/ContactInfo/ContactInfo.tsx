import { Typography } from '@vroom-web/ui-lib';
import React from 'react';

import { Col, Row } from '../../../../../../styled/grid';
import { displayPhoneNumber } from '../../../../../../utils';
import Input from '../../../../components/Input';
import { WizardStepProps } from '../../../../components/WizardForm';

const ContactInfo = ({
  form,
}: WizardStepProps<{
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}>) => {
  return (
    <>
      <Typography.Title.Three>
        Pickup contact information
      </Typography.Title.Three>
      <Row wrap="wrap" gap="20px">
        <Col size={1 / 2}>
          <Input
            id="pickupContactFirstName"
            name="firstName"
            control={form.control}
            placeholder="First name"
            label="First name"
          />
        </Col>
        <Col size={1 / 2}>
          <Input
            id="pickupContactLastName"
            name="lastName"
            control={form.control}
            placeholder="Last name"
            label="Last name"
          />
        </Col>
        <Col size={1 / 2}>
          <Input
            placeholder="Email"
            label="Email address"
            type="email"
            id="pickupContactEmail"
            name="email"
            control={form.control}
          />
        </Col>
        <Col size={1 / 2}>
          <Input
            placeholder="(  ) ___-____"
            label="Phone number"
            id="pickupContactPhoneNumber"
            name="phoneNumber"
            control={form.control}
            valueFormatter={displayPhoneNumber}
          />
        </Col>
      </Row>
    </>
  );
};

export default ContactInfo;
