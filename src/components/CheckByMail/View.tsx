import { SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import CheckByMailViewModel from './ViewModel';

import { Props } from 'src/components/CheckByMail';
import IsPrimaryAddress from 'src/components/IsPrimaryAddress';
import Dropdown from 'src/core/Dropdown';
import FormikInput from 'src/core/FormikInput';
import { Body } from 'src/core/Typography';
import { PaymentMethodContext } from 'src/modules/options/paymentMethodContext';

type ViewProps = Props & { viewModel: CheckByMailViewModel };

const CBMContainer = styled.div`
  width: 100%;
`;

const CBMMessage = styled(Body.Regular)`
  display: flex;
  padding: 25px 0 10px;
`;

const CBMMailingAddress = styled(Body.Regular)`
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

const CheckByMailView: React.FC<ViewProps> = ({
  mailingAddress,
  isPrimaryAddress,
  viewModel,
  setFieldValue,
  state,
}) => {
  const states = viewModel.getStates();
  const value = states.find((item) => item.value === state) ?? null;
  const handleSelectedItemChange = (value: SelectChanges<SelectItem>): void =>
    setFieldValue('state', value?.selectedItem?.value ?? '');
  // {({ setStateDropdown }): React.ReactNode => (
  return (
    <PaymentMethodContext.Consumer>
      {(): React.ReactNode => (
        <CBMContainer>
          <CBMMessage>{viewModel.mailingAddressMsg}</CBMMessage>
          <CBMMailingAddress className="fs-mask">
            <AddressLine>{mailingAddress['address_1']}</AddressLine>
            <AddressLine>
              {mailingAddress.city} {mailingAddress.state}{' '}
              {mailingAddress.zipcode}
            </AddressLine>
          </CBMMailingAddress>

          <IsPrimaryAddress selected={isPrimaryAddress} />

          {isPrimaryAddress === 'No' && (
            <>
              <InputContainer>
                <Address
                  id="address"
                  name={'address'}
                  type="text"
                  className="fs-mask"
                  placeholder={viewModel.addressLabel}
                  label={viewModel.addressLabel}
                />
                <Apartment
                  id="apartment"
                  name={'apartment'}
                  type="text"
                  className="fs-mask"
                  placeholder={viewModel.apartmentPlaceholder}
                  label={viewModel.apartmentLabel}
                />
              </InputContainer>
              <InputContainer>
                <City
                  id="city"
                  name={'city'}
                  type="text"
                  className="fs-mask"
                  placeholder={viewModel.cityLabel}
                  label={viewModel.cityLabel}
                />
                <ZipStateContainer>
                  <Dropdown
                    id="state"
                    className="state"
                    placeholder={viewModel.stateLabel}
                    label={viewModel.stateLabel}
                    items={states}
                    onSelectedItemChange={handleSelectedItemChange}
                    selectedItem={value}
                  />
                  <Zip
                    id="zipcode"
                    name={'zipcode'}
                    type="text"
                    className="fs-mask"
                    placeholder={viewModel.zipLabel}
                    label={viewModel.zipLabel}
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
