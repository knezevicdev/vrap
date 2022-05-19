import React, { ReactElement } from 'react';

import { FormStepWrapper } from '../Style.css';
import { inputChange, useToggleRequiredFields } from '../utils';
import AddressSelector from './AddressSelector';

import {
  FormField,
  UseForm,
} from 'src/modules/appraisalform/components/componentInterfaces.d';
import EmailInput from 'src/modules/appraisalform/components/forminputs/EmailInput';
import FirstNameInput from 'src/modules/appraisalform/components/forminputs/FirstNameInput';
import LastNameInput from 'src/modules/appraisalform/components/forminputs/LastNameInput';
import PhoneInput from 'src/modules/appraisalform/components/forminputs/PhoneInput';
import SelectBoxes from 'src/modules/appraisalform/components/SelectBoxes';
import { Col } from 'src/styled/grid';

interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
}

const ContactInformation = ({ fields, form }: Props): ReactElement => {
  useToggleRequiredFields(
    form,
    'second',
    fields.hasSecondOwner.value === 'Yes',
    ['secondApt']
  );

  return (
    <FormStepWrapper wrap="wrap" gap="20px">
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <SelectBoxes
          field={{
            ...fields.youOwner,
            options: ['Yes', 'No'],
            label: 'Are you the owner of this vehicle?',
            onClick: inputChange(fields.youOwner),
          }}
        />
      </Col>
      <Col size={1 / 2} />
      {fields.youOwner.value !== '' && (
        <>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <FirstNameInput field={fields.firstName} />
          </Col>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <LastNameInput field={fields.lastName} />
          </Col>
          <AddressSelector
            fields={fields}
            form={form}
            fieldMap={{
              addressLine: 'address',
              state: 'state',
              zip: 'zip',
              city: 'city',
              streetNumber: 'apt',
            }}
          />
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <EmailInput field={fields.email} />
          </Col>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <PhoneInput field={fields.phone} />
          </Col>
        </>
      )}
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <SelectBoxes
          field={{
            ...fields.hasSecondOwner,
            options: ['Yes', 'No'],
            label: 'Is there a second owner of this vehicle?',
            onClick: inputChange(fields.hasSecondOwner),
          }}
        />
      </Col>
      <Col size={1 / 2} />
      {fields.hasSecondOwner.value === 'Yes' && (
        <>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <FirstNameInput field={fields.secondFirstName} />
          </Col>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <LastNameInput field={fields.secondLastName} />
          </Col>
          <AddressSelector
            fields={fields}
            form={form}
            fieldMap={{
              addressLine: 'secondAddress',
              state: 'secondState',
              zip: 'secondZip',
              city: 'secondCity',
              streetNumber: 'secondApt',
            }}
          />
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <EmailInput field={fields.secondEmail} />
          </Col>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <PhoneInput field={fields.secondPhone} />
          </Col>
        </>
      )}
    </FormStepWrapper>
  );
};

export default ContactInformation;
