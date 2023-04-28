import {
  HorizontalRadio,
  Select,
  SelectChanges,
  SelectItem,
  Typography,
} from '@vroom-web/ui-lib';
import React, { useState } from 'react';
import styled from 'styled-components';

import { STATES } from '../../modules/appraisalform/constants/misc';

import { Props } from 'src/components/CheckByMail';
import FormikInput from 'src/core/FormikInput';
import { PaymentMethodContext } from 'src/modules/options/paymentMethodContext';

type ViewProps = Props;

const CBMContainer = styled.div`
  width: 100%;
`;

const CBMMessage = styled(Typography.Body.Regular)`
  display: flex;
  padding: 25px 0 10px;
`;

const CBMMailingAddress = styled(Typography.Body.Regular)`
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
`;

const AddressLine = styled.span`
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 0px;
  }
`;

const ZipStateContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: block;
    margin-bottom: 0px;
  }

  @media (max-width: 420px) {
    display: flex;
    width: 100%;
  }
`;

const Address = styled(FormikInput)`
  width: 50%;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 16px;
  }
`;

const Apartment = styled(FormikInput)`
  width: 50%;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
`;

const City = styled(FormikInput)`
  width: 50%;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 16px;
  }
`;

const State = styled.div`
  button {
    border: 1px solid #d6d7da;
  }

  @media (max-width: 768px) {
    button {
      width: 70%;
    }
    width: 50%;
  }
`;

const Zip = styled(FormikInput)`
  width: 50%;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    width: 50%;
    margin-left: 16px;
  }
`;

const OptionContainer = styled.div<{ selected?: boolean }>`
  width: 25%;
  @media (max-width: 420px) {
    width: 100%;
  }
`;

const CheckByMailView: React.FC<ViewProps> = ({
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

export default CheckByMailView;
