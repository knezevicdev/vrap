import {
  HorizontalRadio,
  Select,
  SelectChanges,
  SelectItem,
} from '@vroom-web/ui-lib';
import React, { useState } from 'react';

import { MailingAddress } from '../../interfaces.d';
import { STATES } from '../../modules/appraisalform/constants/misc';
import {
  Address,
  AddressLine,
  Apartment,
  CBMContainer,
  CBMMailingAddress,
  CBMMessage,
  City,
  InputContainer,
  OptionContainer,
  State,
  Zip,
  ZipStateContainer,
} from './Style.css';

import { PaymentMethodContext } from 'src/modules/options/paymentMethodContext';

export type Props = {
  mailingAddress: MailingAddress;
  isPrimaryAddress: string;
  setFieldValue: (field: string, value: string) => void;
  state: string;
};

const CheckByMail: React.FC<Props> = ({
  mailingAddress,
  isPrimaryAddress,
  setFieldValue,
  state,
}) => {
  const value = STATES.find((item) => item.value === state) ?? null;
  const [usePrimary, setUsePrimary] = useState<string>(isPrimaryAddress);
  const handleSelectedItemChange = (value: SelectChanges<SelectItem>): void =>
    setFieldValue('state', value?.selectedItem?.value ?? '');
  const OPTIONS = [
    {
      label: 'Yes',
      value: 'Yes',
    },
    {
      label: 'No',
      value: 'No',
    },
  ];
  const setIsPrimaryAddress = (value: string) => {
    setUsePrimary(value);
    isPrimaryAddress = value;
    setFieldValue('isPrimaryAddress', value);
  };
  return (
    <PaymentMethodContext.Consumer>
      {(): React.ReactNode => (
        <CBMContainer>
          <CBMMessage>
            Should we send the check to the primary owner&apos;s address?
          </CBMMessage>
          <CBMMailingAddress>
            <AddressLine>{mailingAddress['address_1']}</AddressLine>
            <AddressLine>
              {mailingAddress.city} {mailingAddress.state}{' '}
              {mailingAddress.zipcode}
            </AddressLine>
          </CBMMailingAddress>

          <OptionContainer>
            <HorizontalRadio
              id="isPrimaryAddress"
              options={OPTIONS}
              value={usePrimary}
              onChange={setIsPrimaryAddress}
            />
          </OptionContainer>

          {usePrimary === 'No' && (
            <>
              <InputContainer>
                <Address
                  id="address"
                  name={'address'}
                  type="text"
                  placeholder="Address"
                  label="Address"
                />
                <Apartment
                  id="apartment"
                  name={'apartment'}
                  type="text"
                  placeholder="Apt/Suite"
                  label="Apartment / Suite Number (optional)"
                />
              </InputContainer>
              <InputContainer>
                <City
                  id="city"
                  name={'city'}
                  type="text"
                  placeholder="City"
                  label="City"
                />
                <ZipStateContainer>
                  <State>
                    <Select
                      id="state"
                      placeholder="State"
                      label="State"
                      items={STATES}
                      onSelectedItemChange={handleSelectedItemChange}
                      selectedItem={value}
                    />
                  </State>
                  <Zip
                    id="zipcode"
                    name={'zipcode'}
                    type="text"
                    placeholder="Zip Code"
                    label="Zip Code"
                    fluid={true}
                    maxLength={5}
                  />
                </ZipStateContainer>
              </InputContainer>
            </>
          )}
        </CBMContainer>
      )}
    </PaymentMethodContext.Consumer>
  );
};

export default CheckByMail;
