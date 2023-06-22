import React from 'react';
import { shallow } from 'zustand/shallow';

import { Col, Row } from '../../../../../../../../styled/grid';
import AddressSelector from '../../../../../../components/AddressSelector';
import SelectBoxes from '../../../../../../components/SelectBoxes';
import useVerificationStore from '../../../../../../store/store';
import { StyledPlaidButton } from '../Style.css';
import usePaymentAddressForm from './usePaymentAddressForm';

interface Props {
  form: ReturnType<typeof usePaymentAddressForm>;
  onSubmit(): void;
}

const PaymentAddressSelector = ({ form, onSubmit }: Props) => {
  const sameAsPrimaryOwner = form.watch('sameAsPrimaryOwner');

  const {
    firstOwnerAddress,
    firstOwnerState,
    firstOwnerZip,
    firstOwnerCity,
    firstOwnerApt,
  } = useVerificationStore(
    (state) => ({
      firstOwnerAddress: state.firstOwnerAddress,
      firstOwnerState: state.firstOwnerState,
      firstOwnerZip: state.firstOwnerZip,
      firstOwnerCity: state.firstOwnerCity,
      firstOwnerApt: state.firstOwnerApt || '',
    }),
    shallow
  );
  return (
    <div>
      <p>Should we send the check to the primary owner&apos;s address?</p>
      <Row gap="10px">
        <Col
          size={{
            default: 1 / 2,
            mobile: 1,
          }}
        >
          <SelectBoxes
            label={`${firstOwnerApt} ${firstOwnerAddress} ${firstOwnerCity}, ${firstOwnerState} ${firstOwnerZip}`.trim()}
            options={['Yes', 'No']}
            control={form.control}
            id="sameAsPrimaryOwner"
          />
        </Col>
      </Row>
      {sameAsPrimaryOwner === 'No' && (
        <AddressSelector
          idPrefix="payment"
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
      <StyledPlaidButton disabled={!form.formState.isValid} onClick={onSubmit}>
        Submit
      </StyledPlaidButton>
    </div>
  );
};

export default PaymentAddressSelector;
