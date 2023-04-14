import { Autocomplete } from '@react-google-maps/api';
import React, { ReactElement, useRef } from 'react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { SetRequired } from 'type-fest';

import { STATES } from '../../../../appraisalform/constants/misc';
import Input from '../Input';
import Select from '../Select';
import useHandlePlaceChanged from './useHandlePlaceChanged';

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

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  fieldMap: SetRequired<
    Partial<Record<keyof Address | 'apt', Path<T>>>,
    'addressLine' | 'zip' | 'city' | 'state' | 'apt'
  >;
}

const AddressSelector = <T extends FieldValues>({
  form,
  fieldMap,
}: Props<T>): ReactElement => {
  const autocomplete = useRef<google.maps.places.Autocomplete>();

  const handlePlaceChanged = useHandlePlaceChanged(autocomplete, (address) => {
    form.setValue(
      fieldMap.addressLine,
      address.addressLine as PathValue<T, typeof fieldMap.addressLine>
    );
    form.setValue(
      fieldMap.city,
      address.city as PathValue<T, typeof fieldMap.addressLine>
    );
    form.setValue(
      fieldMap.zip,
      address.zip as PathValue<T, typeof fieldMap.addressLine>
    );
    form.setValue(
      fieldMap.state,
      address.state as PathValue<T, typeof fieldMap.addressLine>
    );
    form.trigger(fieldMap.addressLine);
    form.trigger(fieldMap.city);
    form.trigger(fieldMap.zip);
    form.trigger(fieldMap.state);
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
            label="Address"
            placeholder="Address"
            control={form.control}
            id={fieldMap.addressLine}
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
          label="Apartment / Suite number (optional)"
          placeholder="Apartment / Suite number (optional)"
          control={form.control}
          id={fieldMap.apt}
        />
      </Col>
      <Col
        size={{
          default: 1 / 2,
          mobile: 1,
        }}
      >
        <Input
          label="City"
          placeholder="City"
          control={form.control}
          id={fieldMap.city}
        />
      </Col>
      <Col size={1 / 2}>
        <Select
          label="State"
          placeholder="State"
          control={form.control}
          id={fieldMap.state}
          options={STATES}
        />
      </Col>
      <Col size={1 / 2}>
        <Input
          label="Zip Code"
          placeholder="Zip Code"
          control={form.control}
          id={fieldMap.zip}
        />
      </Col>
    </Row>
  );
};

export default AddressSelector;
