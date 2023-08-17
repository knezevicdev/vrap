import { Checkbox } from '@vroom-web/ui-lib';
import React, { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { displayPhoneNumber } from '../../../../../../../utils';
import { lettersNumbersHyphensOnly } from '../../../../../../appraisalform/components/formatting';
import { STATES } from '../../../../../../appraisalform/constants/misc';
import Input from '../../../../../components/Input';
import { EditStep } from '../../../../../components/MultiStepForm/Style.css';
import Select from '../../../../../components/Select';
import PrevNextButtons from '../../../../../components/WizardForm/PrevNextButtons';
import { SectionTitle } from '../../../../../Styled.css';
import LxBank from './LxBank';
import {
  Label,
  LabelContainer,
  PreviewLine,
  SecurityLogo,
  SecurityMessage,
} from './Style.css';
import useAvailableFields, { LoanField } from './useAvailableFields';
import useCaf from './useCaf';

import { Icons } from 'src/core/Icon';
import { Col, Row } from 'src/styled/grid';

export interface LoanInformationForm {
  loanStepCompleted: boolean;
  bankName: string;
  manualBankName: string;
  phoneNumber: string;
  accountNumber: string;
  lastFourDigits: string;
  state: string;
  acknowledgment: boolean;
  lienId: string;
  accFields: boolean;
}

interface Props {
  form: UseFormReturn<LoanInformationForm>;
  onPrev: () => void;
  onNext: () => void;
  onEdit: () => void;
  preview?: boolean;
}

const LoanInformation = ({ form, onPrev, onNext, onEdit, preview }: Props) => {
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

  if (preview) {
    return (
      <PreviewLine>
        <SectionTitle>Payments on Vehicle</SectionTitle>
        <EditStep role="button" tabIndex={0} onClick={onEdit}>
          Edit
        </EditStep>
      </PreviewLine>
    );
  }

  return (
    <Row wrap="wrap" gap="20px">
      <SectionTitle>Payments on Vehicle</SectionTitle>
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
            if (form.getValues().bankName !== '') {
              form.trigger();
            }
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
          onChange={(event) =>
            form.setValue('acknowledgment', event.target.checked)
          }
          label="I authorize Vroom to inquire and request any necessary information from my lienholder"
          id="lien-agreement"
          dataQa="lien-agreement"
        />
      </Col>
      <Col size={1}>
        <PrevNextButtons
          disableNext={!form.formState.isValid || !isAcknowledged}
          onPrev={onPrev}
          onNext={onNext}
        />
      </Col>
    </Row>
  );
};

export default LoanInformation;
