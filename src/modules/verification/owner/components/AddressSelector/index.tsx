import { Autocomplete } from '@react-google-maps/api';
import { noop } from 'lodash';
import React, { ReactElement, useRef } from 'react';
import { SetRequired } from 'type-fest';

import { inputChange } from '../../utils';
import useHandlePlaceChanged from './useHandlePlaceChanged';

import {
  FormField,
  UseForm,
} from 'src/modules/appraisalform/components/componentInterfaces.d';
import StateInput from 'src/modules/appraisalform/components/forminputs/StateInput';
import ZipCodeInput from 'src/modules/appraisalform/components/forminputs/ZipCodeInput';
import Input from 'src/modules/appraisalform/components/Input';
import { Col, Row } from 'src/styled/grid';

export interface Address {
  streetNumber: string;
  street: string;
  city: string;
  state: string;
  stateLongName: string;
  country: string;
  addressLine: string;
  zip: string;
}

interface Props {
  fields: Record<string, FormField>;
  form: UseForm;
  fieldMap: SetRequired<
    Partial<Record<keyof Address | 'apt', string>>,
    'addressLine' | 'zip' | 'city' | 'state' | 'apt'
  >;
}

const AddressSelector = ({ fields, form, fieldMap }: Props): ReactElement => {
  const autocomplete = useRef<google.maps.places.Autocomplete>();

  const handlePlaceChanged = useHandlePlaceChanged(autocomplete, (address) => {
    form.updateMultipleFields(
      Object.fromEntries(
        Object.entries(fieldMap)
          .filter(([key]) =>
            [
              'streetNumber',
              'street',
              'city',
              'state',
              'stateLongName',
              'country',
              'addressLine',
              'zip',
            ].includes(key)
          )
          .map(([field, key]) => [
            key,
            {
              ...fields[key],
              value: address[field as keyof Address],
            },
          ])
      )
    );
  });

  return (
    <Row wrap="wrap" gap="20px">
      <Col size={1}>
        <Autocomplete
          onPlaceChanged={handlePlaceChanged}
          onLoad={(box) => {
            autocomplete.current = box;
          }}
          restrictions={{
            country: ['us'],
          }}
        >
          <Input
            field={{
              ...fields[fieldMap.addressLine],
              label: 'Address',
              onChange: inputChange(fields[fieldMap.addressLine], true),
            }}
          />
        </Autocomplete>
      </Col>
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <Input
          field={{
            ...fields[fieldMap.apt],
            label: 'Apartment / Suite number (optional)',
            onChange: inputChange(fields[fieldMap.apt], false),
          }}
        />
      </Col>
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <Input
          field={{
            ...fields[fieldMap.city],
            label: 'City',
            onChange: inputChange(fields[fieldMap.city], true),
          }}
        />
      </Col>
      <Col size={1 / 2}>
        <StateInput field={fields[fieldMap.state]} onKeyPressEnter={noop} />
      </Col>
      <Col size={1 / 2}>
        <ZipCodeInput field={fields[fieldMap.zip]} />
      </Col>
    </Row>
  );
};

export default AddressSelector;
