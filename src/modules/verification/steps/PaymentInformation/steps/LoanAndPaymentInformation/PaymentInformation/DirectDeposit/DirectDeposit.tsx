import React from 'react';

import Input from '../../../../../../components/Input';
import { StyledPlaidButton } from '../Style.css';
import useDirectDepositForm from './useDirectDepositForm';

import { Col, Row } from 'src/styled/grid';

interface Props {
  form: ReturnType<typeof useDirectDepositForm>;
  onSubmit(): void;
}

const DirectDeposit = ({ form, onSubmit }: Props) => {
  return (
    <div>
      <p>Can&apos;t find your bank? Enter bank information manually</p>

      <Row wrap="wrap" gap="20px">
        <Col
          size={{
            default: 1 / 2,
            mobile: 1,
          }}
        >
          <Input
            id="routingNumber"
            name="routingNumber"
            control={form.control}
            placeholder="Routing Number"
            label="Routing Number"
          />
        </Col>
        <Col
          size={{
            default: 1 / 2,
            mobile: 1,
          }}
        >
          <Input
            id="bankAccountNumber"
            name="bankAccountNumber"
            control={form.control}
            placeholder="Bank Account Number"
            label="Bank Account Number
"
          />
        </Col>
      </Row>
      <StyledPlaidButton disabled={!form.formState.isValid} onClick={onSubmit}>
        Submit
      </StyledPlaidButton>
    </div>
  );
};

export default DirectDeposit;
