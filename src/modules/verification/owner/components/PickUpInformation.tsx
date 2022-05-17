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
import SelectBoxes, {
  Label,
  LabelContainer,
} from 'src/modules/appraisalform/components/SelectBoxes';
import { Col } from 'src/styled/grid';

interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
  contactFields: Record<string, FormField>;
}

const PickUpInformation = ({
  fields,
  form,
  contactFields,
}: Props): ReactElement => {
  useToggleRequiredFields(
    form,
    'pickupAddress',
    fields.sameAddress.value === 'No',
    ['pickupAddressApt']
  );
  useToggleRequiredFields(
    form,
    'pickupContact',
    fields.sameContact.value === 'No'
  );

  return (
    <FormStepWrapper wrap="wrap" gap="20px">
      <Col size={1}>
        <LabelContainer>
          <Label>
            Is the pick up address the same as the primary owner&apos;s address?
          </Label>
        </LabelContainer>
        <Label>{contactFields.address.value}</Label>
        <br />
        <Label>
          {contactFields.city.value} {contactFields.state.value}{' '}
          {contactFields.zip.value}
        </Label>
      </Col>
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <SelectBoxes
          field={{
            ...fields.sameAddress,
            options: ['Yes', 'No'],
            onClick: inputChange(fields.sameAddress),
          }}
        />
      </Col>
      <Col size={1 / 2} />
      {fields.sameAddress.value === 'No' && (
        <Col size={1}>
          <LabelContainer>
            <Label>
              Please provide the pick up information for this vehicle.
            </Label>
          </LabelContainer>
        </Col>
      )}
      <AddressSelector
        fields={fields}
        form={form}
        fieldMap={{
          addressLine: 'pickupAddressAddress',
          state: 'pickupAddressState',
          zip: 'pickupAddressZip',
          city: 'pickupAddressCity',
          streetNumber: 'pickupAddressApt',
        }}
      />
      <Col size={1}>
        <LabelContainer>
          <Label>
            Will the primary owner be the point of contact when we pick up this
            vehicle?
          </Label>
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
            ...fields.sameContact,
            options: ['Yes', 'No'],
            onClick: inputChange(fields.sameContact),
          }}
        />
      </Col>
      <Col size={1 / 2} />
      {fields.sameContact.value === 'No' && (
        <>
          <Col size={1}>
            <LabelContainer>
              <Label>
                Who should we contact when we come pick up your car?
              </Label>
            </LabelContainer>
          </Col>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <FirstNameInput field={fields.pickupContactFirstName} />
          </Col>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <LastNameInput field={fields.pickupContactLastName} />
          </Col>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <EmailInput field={fields.pickupContactEmail} />
          </Col>
          <Col
            size={{
              default: 1 / 2,
              mobile: 1,
            }}
          >
            <PhoneInput field={fields.pickupContactPhone} />
          </Col>
        </>
      )}
    </FormStepWrapper>
  );
};

export default PickUpInformation;
