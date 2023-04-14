import { Typography } from '@vroom-web/ui-lib';
import React from 'react';

import { Col, Row } from '../../../../../../../styled/grid';
import { displayPhoneNumber } from '../../../../../../../utils';
import AddressSelector from '../../../../components/AddressSelector';
import Input from '../../../../components/Input';
import { WizardStepProps } from '../../../../components/WizardForm';

const FirstOwnerInfo = ({
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
}>) => {
  return (
    <>
      <Typography.Title.Three>Owner contact information</Typography.Title.Three>
      <Row wrap="wrap" gap="20px">
        <Col size={1 / 2}>
          <Input
            id="firstName"
            control={form.control}
            placeholder="First name"
            label="First name"
          />
        </Col>
        <Col size={1 / 2}>
          <Input
            id="lastName"
            control={form.control}
            placeholder="Last name"
            label="Last name"
          />
        </Col>
        <AddressSelector
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
            id="email"
            control={form.control}
          />
        </Col>
        <Col size={1 / 2}>
          <Input
            placeholder="(  ) ___-____"
            label="Phone number"
            id="phoneNumber"
            control={form.control}
            valueFormatter={displayPhoneNumber}
          />
        </Col>
      </Row>
    </>
  );
};

export default FirstOwnerInfo;
