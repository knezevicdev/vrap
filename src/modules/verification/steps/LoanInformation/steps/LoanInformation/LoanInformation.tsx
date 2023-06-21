import { Checkbox } from '@vroom-web/ui-lib';
import React, { useEffect, useRef } from 'react';

import { displayPhoneNumber } from '../../../../../../utils';
import { lettersNumbersHyphensOnly } from '../../../../../appraisalform/components/formatting';
import { STATES } from '../../../../../appraisalform/constants/misc';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import { WizardStepProps } from '../../../../components/WizardForm';
import LxBank from './LxBank';
import {
  Label,
  LabelContainer,
  SecurityLogo,
  SecurityMessage,
} from './Style.css';
import useAvailableFields, { LoanField } from './useAvailableFields';
import useCaf from './useCaf';

import { Icons } from 'src/core/Icon';
import { Col, Row } from 'src/styled/grid';

const LoanInformation = ({
  form,
}: WizardStepProps<{
  bankName: string;
  manualBankName: string;
  phoneNumber: string;
  accountNumber: string;
  lastFourDigits: string;
  state: string;
  acknowledgment: boolean;
  lienId: string;
  accFields: boolean;
}>) => {
  const lastAcknowledged = useRef(false);
  const caf = useCaf();
  const availableFields = useAvailableFields(caf, form);

  const isAcknowledged = form.watch('acknowledgment');

  // react-hook-form have some troubles working in controlled mode
  // this should be removed when we make ref in ui-lin inputs
  // and change implementation to uncontrolled inputs
  useEffect(() => {
    if (isAcknowledged && !lastAcknowledged.current) {
      lastAcknowledged.current = true;
      form.trigger();
    } else if (lastAcknowledged.current !== isAcknowledged) {
      lastAcknowledged.current = false;
    }
  }, [form, isAcknowledged]);

  return (
    <Row wrap="wrap" gap="20px">
      <Col size={1}>
        <LabelContainer>
          <Label>
            Don&apos;t worry, we&apos;ll pay off the remaining balance. Please
            call the bank where you make your car payments and authorize Vroom
            to ask about a payoff quote.
          </Label>
        </LabelContainer>
      </Col>
      <Col>
        <LxBank
          label="Name of Lien Financial Institution"
          onChange={(bankName: string, lenderId: string) => {
            form.setValue('bankName', bankName);
            form.setValue('lienId', lenderId);
          }}
          defaultValue={form.getValues().bankName}
        />
      </Col>
      {availableFields.includes(LoanField.LIEN_NAME) && (
        <Col>
          <Input
            placeholder="Lienholder Name"
            label="Lienholder Name"
            id="manualBankName"
            name="manualBankName"
            control={form.control}
          />
        </Col>
      )}
      {availableFields.includes(LoanField.PHONE_NUMBER) && (
        <Col
          size={{
            default: 1 / 2,
            mobile: 1,
          }}
        >
          <Input
            placeholder="(  ) ___-____"
            label="Phone number"
            id="phoneNumber"
            name="phoneNumber"
            control={form.control}
            valueFormatter={displayPhoneNumber}
          />
        </Col>
      )}
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <Input
          placeholder="xxxxxxxxxxxx"
          label="Lien Account Number"
          id="accountNumber"
          name="accountNumber"
          control={form.control}
          valueFormatter={(value: string) =>
            lettersNumbersHyphensOnly(value, 25)
          }
        />
      </Col>
      {availableFields.includes(LoanField.SSN_LAST_DIGITS) && (
        <>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <Input
              placeholder="____"
              label="Last Four Digits of Social Security Number (optional)"
              id="lastFourDigits"
              name="lastFourDigits"
              control={form.control}
              type="password"
            />
          </Col>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <SecurityMessage>
              <SecurityLogo icon={Icons.SECURE_LOCK_GREEN} />
              <div>
                Your application, and all information provided, is safe and
                secure
              </div>
            </SecurityMessage>
          </Col>
        </>
      )}
      <Col disableBottomGap>
        <LabelContainer>
          <Label>Where is the vehicle registered?</Label>
        </LabelContainer>
      </Col>
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <Select
          label="State"
          placeholder="State"
          control={form.control}
          id="loanState"
          name="state"
          options={STATES}
        />
      </Col>
      <Col size={1 / 2} />
      <Col>
        <Checkbox
          checked={isAcknowledged}
          onChange={() => form.setValue('acknowledgment', !isAcknowledged)}
          label="I authorize Vroom to inquire and request any necessary information from my lienholder"
          id="lien-agreement"
          dataQa="lien-agreement"
        />
      </Col>
    </Row>
  );
};

export default LoanInformation;
