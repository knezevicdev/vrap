import { useABSmartly } from '@vroom-web/analytics-integration';
import { Checkbox, SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import { noop } from 'lodash';
import React, { ReactElement, useEffect, useState } from 'react';

import {
  FormStepWrapper,
  SecurityLogo,
  SecurityMessage,
} from '../../Style.css';
import { inputChange } from '../../utils';
import LxBank from '../LxBank';
import useAvailableFields, { LoanField } from './useAvailableFields';

import { Icons } from 'src/core/Icon';
import {
  FormField,
  UseForm,
} from 'src/modules/appraisalform/components/componentInterfaces.d';
import LastFourSSNInput from 'src/modules/appraisalform/components/forminputs/LastFourSSNInput';
import LoanAccountNumberInput from 'src/modules/appraisalform/components/forminputs/LoanAccountNumberInput';
import PhoneInput from 'src/modules/appraisalform/components/forminputs/PhoneInput';
import StateInput from 'src/modules/appraisalform/components/forminputs/StateInput';
import Input from 'src/modules/appraisalform/components/Input';
import Select from 'src/modules/appraisalform/components/Select';
import SelectBoxes, {
  Label,
  LabelContainer,
} from 'src/modules/appraisalform/components/SelectBoxes';
import { Caf } from 'src/networking/models/Price';
import { getCaf } from 'src/networking/request';
import { Col } from 'src/styled/grid';

interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
  contactFields: Record<string, FormField>;
}

const LoanInformation = ({ fields, form }: Props): ReactElement => {
  const [caf, setCaf] = useState<Caf[]>([]);
  const availableFields = useAvailableFields(caf, form);
  const absmartly = useABSmartly();
  const isVerificationLossExpressExp = absmartly.isInExperiment(
    'ac-verification-loss-express'
  );

  useEffect(() => {
    getCaf()
      .then((res) => {
        if ('data' in res) {
          setCaf(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <FormStepWrapper wrap="wrap" gap="20px">
      <Col size={1} disableBottomGap>
        <LabelContainer>
          <Label>Are you currently making payments on the vehicle?</Label>
        </LabelContainer>
      </Col>
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <SelectBoxes
          field={{
            ...fields.activeLoan,
            options: ['Yes', 'No'],
            onClick: inputChange(fields.activeLoan),
          }}
        />
      </Col>
      <Col size={1 / 2} />
      {fields.activeLoan.value === 'Yes' && (
        <>
          <Col size={1}>
            <LabelContainer>
              <Label>
                Don&apos;t worry, we&apos;ll pay off the remaining balance.
                Please call the bank where you make your car payments and
                authorize Vroom to ask about a payoff quote.
              </Label>
            </LabelContainer>
          </Col>
          {!isVerificationLossExpressExp && (
            <Col>
              <Select
                field={{
                  ...fields.bank,
                  label: 'Name of Lien Financial Institution',
                  defaultLabel: 'Select your lien financial institution',
                  options: [
                    ...caf.map((caf) => ({
                      label: caf.lienholder_name,
                      value: caf.lienholder_name,
                    })),
                    {
                      label: 'Other',
                      value: 'Other',
                    },
                  ],
                  onChange: (changes: SelectChanges<SelectItem>) => {
                    const value = changes.selectedItem?.value;
                    fields.bank.onChange({ ...fields.bank, value });
                  },
                }}
              />
            </Col>
          )}
          {isVerificationLossExpressExp && (
            <Col>
              <LxBank
                field={{
                  ...fields.bank,
                  label: 'Name of Lien Financial Institution',
                  onChange: (bankName: string, lenderId: string) => {
                    fields.bank.onChange({
                      ...fields.bank,
                      value: bankName,
                      lenderId,
                    });
                  },
                }}
              />
            </Col>
          )}
          {availableFields.includes(LoanField.LIEN_NAME) && (
            <Col>
              <Input
                field={{
                  ...fields.name,
                  label: 'Lienholder Name',
                  onChange: inputChange(fields.name),
                }}
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
              <PhoneInput
                field={{
                  ...fields.phoneNumber,
                  label: 'Financial Institution Phone Number (optional)',
                }}
              />
            </Col>
          )}
          {availableFields.includes(LoanField.ACCOUNT_NUMBER) && (
            <Col
              size={{
                default: 1 / 2,
                mobile: 1,
              }}
            >
              <LoanAccountNumberInput field={fields.accountNumber} />
            </Col>
          )}
          {availableFields.includes(LoanField.SSN_LAST_DIGITS) && (
            <>
              <Col
                size={{
                  default: 1 / 2,
                  mobile: 1,
                }}
              >
                <LastFourSSNInput field={fields.lastFour} required={false} />
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
            <StateInput field={fields.state} onKeyPressEnter={noop} />
          </Col>
          <Col size={1 / 2} />
          <Col>
            <Checkbox
              checked={fields.agreement.value}
              onChange={(): void =>
                fields.agreement.onChange({
                  ...fields.agreement,
                  value: fields.agreement.value ? '' : true,
                })
              }
              label="I authorize Vroom to inquire and request any necessary information from my lienholder"
              id="lien-agreement"
              dataQa="lien-agreement"
            />
          </Col>
        </>
      )}
    </FormStepWrapper>
  );
};

export default LoanInformation;
