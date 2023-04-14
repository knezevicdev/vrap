import { Typography } from '@vroom-web/ui-lib';
import React from 'react';

import AddressSelector from '../../../../components/AddressSelector';
import { WizardStepProps } from '../../../../components/WizardForm';

const PickupAddressInfo = ({
  form,
}: WizardStepProps<{
  address: string;
  state: string;
  zip: string;
  city: string;
  apt: string;
}>) => {
  return (
    <>
      <Typography.Title.Three>Pickup address</Typography.Title.Three>
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
    </>
  );
};

export default PickupAddressInfo;
