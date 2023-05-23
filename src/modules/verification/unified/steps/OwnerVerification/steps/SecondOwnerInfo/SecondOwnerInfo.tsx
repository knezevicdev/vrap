import { Typography } from '@vroom-web/ui-lib';
import React from 'react';

import { Col, Row } from '../../../../../../../styled/grid';
import { displayPhoneNumber } from '../../../../../../../utils';
import AddressSelector from '../../../../components/AddressSelector';
import Input from '../../../../components/Input';
import { WizardStepProps } from '../../../../components/WizardForm';

const SecondOwnerInfo = ({
  form,
}: WizardStepProps<{
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  zip: string;
  city: string;
  apt: string;
  email: string;
  phoneNumber: string;
  firstOwnerEmail: string;
  firstOwnerPhoneNumber: string;
}>) => {
  return (
    <>
      <Typography.Title.Three>
        Second owner contact information
      </Typography.Title.Three>
      <Row wrap="wrap" gap="20px">
        <Col size={1 / 2}>
          <Input
            id="secondOwnerFirstName"
            name="firstName"
            control={form.control}
            placeholder="First name"
            label="First name"
          />
        </Col>
        <Col size={1 / 2}>
          <Input
            id="secondOwnerLastName"
            name="lastName"
            control={form.control}
            placeholder="Last name"
            label="Last name"
          />
        </Col>
        <AddressSelector
          idPrefix="secondOwner"
          form={form}
          fieldMap={{
            addressLine: 'address',
            state: 'state',
            zip: 'zip',
            city: 'city',
            apt: 'apt',
          }}
        />
        <Col size={1 / 2}>
          <Input
            placeholder="Email"
            label="Email address"
            type="email"
            id="secondOwnerEmail"
            name="email"
            control={form.control}
          />
        </Col>
        <Col size={1 / 2}>
          <Input
            placeholder="(  ) ___-____"
            label="Phone number"
            id="secondOwnerPhoneNumber"
            name="phoneNumber"
            control={form.control}
            valueFormatter={displayPhoneNumber}
          />
        </Col>
      </Row>
    </>
  );
};

export default SecondOwnerInfo;
