import { Typography } from '@vroom-web/ui-lib';
import React, { useEffect, useRef } from 'react';

import { Col, Row } from '../../../../../../styled/grid';
import { displayPhoneNumber } from '../../../../../../utils';
import AddressSelector from '../../../../components/AddressSelector';
import Checkbox from '../../../../components/Checkbox';
import Input from '../../../../components/Input';
import { WizardStepProps } from '../../../../components/WizardForm';

const SecondOwnerInfo = ({
  form,
}: WizardStepProps<{
  firstName: string;
  middleName: string;
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
  firstOwnerAddress: string;
  firstOwnerState: string;
  firstOwnerZip: string;
  firstOwnerCity: string;
  firstOwnerApt: string;
  sameAddressAsFirstOwner: boolean;
}>) => {
  const sameAddressAsFirstOwner = form.watch('sameAddressAsFirstOwner');
  const lastSameAddressAsFirstOwner = useRef(sameAddressAsFirstOwner);

  useEffect(() => {
    if (lastSameAddressAsFirstOwner.current !== sameAddressAsFirstOwner) {
      lastSameAddressAsFirstOwner.current = sameAddressAsFirstOwner;
      const formValues = form.getValues();

      form.setValue('address', formValues.firstOwnerAddress);
      form.setValue('city', formValues.firstOwnerCity);
      form.setValue('apt', formValues.firstOwnerApt);
      form.setValue('state', formValues.firstOwnerState);
      form.setValue('zip', formValues.firstOwnerZip);

      form.trigger('address');
      form.trigger('city');
      form.trigger('apt');
      form.trigger('state');
      form.trigger('zip');
    }
  }, [form, sameAddressAsFirstOwner]);

  return (
    <>
      <Typography.Title.Three>
        Second owner contact information
      </Typography.Title.Three>
      <Row wrap="wrap" gap="20px">
        <Col
          size={{
            default: 1 / 3,
            mobile: 1,
          }}
        >
          <Input
            id="secondOwnerFirstName"
            name="firstName"
            control={form.control}
            placeholder="First name"
            label="First name"
          />
        </Col>
        <Col
          size={{
            default: 1 / 3,
            mobile: 1,
          }}
        >
          <Input
            id="secondOwnerMiddleName"
            name="middleName"
            control={form.control}
            placeholder="Middle name"
            label="Middle name"
            tooltip={{
              content:
                'If you have your vehicle’s title, please enter your name exactly as it appears there.',
            }}
          />
        </Col>
        <Col
          size={{
            default: 1 / 3,
            mobile: 1,
          }}
        >
          <Input
            id="secondOwnerLastName"
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
        <Col size={1 / 2}>
          <Checkbox
            label="Same address as primary owner"
            id="secondOwnerAddressSameAsFirstOwner"
            name="sameAddressAsFirstOwner"
            control={form.control}
          />
        </Col>
        {!sameAddressAsFirstOwner && (
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
        )}
      </Row>
    </>
  );
};

export default SecondOwnerInfo;
