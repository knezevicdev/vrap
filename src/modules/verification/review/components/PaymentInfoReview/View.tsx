import { Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Store from 'src/store';
import {
  displayAccountNumber,
  displayFirstTextUpper,
  hiddenString,
} from 'src/utils';
interface Props {
  viewModel: ViewModel;
  store: Store;
}

const PaymentInfoReviewView: React.FC<Props> = ({ viewModel, store }) => {
  const { values, address } = store.payment;
  const { mutationInput } = store.deposit;
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.title}</Subtitle>
        <Edit onClick={(): void => viewModel.handleEditClick()}>
          {viewModel.edit}
        </Edit>
      </SubTitleContainer>
      {values?.paymentOption === 'Check by Mail' && (
        <>
          <Row>
            <Info>
              <Label>{viewModel.methodOfPayment}</Label>
              <Field>{values?.paymentOption}</Field>
            </Info>
            <AddressInfo>
              <Label>{viewModel.address}</Label>
              <Field>
                {address?.address_1} {address?.address_2} {address?.city},{' '}
                {address?.state} {address?.zipcode}
              </Field>
            </AddressInfo>
          </Row>
        </>
      )}
      {values?.paymentOption !== 'Check by Mail' &&
        mutationInput === undefined && (
          <>
            <Row>
              <Info>
                <Label>{viewModel.methodOfPayment}</Label>
                <Field>{values?.paymentOption}</Field>
              </Info>
              <Info>
                <Label>{viewModel.bankRoutingNumber}</Label>
                <Field>{values?.routingNumber}</Field>
              </Info>
            </Row>
            <Row>
              <Info>
                <Label>{viewModel.accountForDeposit}</Label>
                <Field>{displayAccountNumber(values?.bankAccountNumber)}</Field>
              </Info>
            </Row>
          </>
        )}
      {values?.paymentOption !== 'Check by Mail' &&
        mutationInput !== undefined && (
          <>
            <Row>
              <Info>
                <Label>{viewModel.methodOfPayment}</Label>
                <Field>{viewModel.directDeposit}</Field>
              </Info>
              <Info>
                <Label>{viewModel.selectedBank}</Label>
                <Field>{mutationInput?.Institution?.Name}</Field>
              </Info>
            </Row>
            <Row>
              <Info>
                <Label>{viewModel.accountForDeposit}</Label>
                <Field>
                  {displayFirstTextUpper(mutationInput?.Account?.Subtype)}:
                  {' ' + hiddenString(7) + mutationInput?.Account?.Mask}
                </Field>
              </Info>
            </Row>
          </>
        )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0 30px 0;
`;

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 26px;
`;

const Subtitle = styled(Typography.Title.Three)`
  line-height: 26px;
`;

const Row = styled.div`
  display: flex;
  margin-top: 15px;
  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const AddressInfo = styled(Info)`
  width: 66%;
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const Label = styled(Typography.Fine)`
  font-size: 13px;
  letter-spacing: 0.35px;
`;

const Field = styled(Typography.Body.Regular)`
  word-wrap: break-word;
`;

const Edit = styled(Typography.Body.Regular)`
  margin-left: 5px;
  cursor: pointer;
  font-size: 16px;
  line-height: 22px;
  color: #e7131a;
  padding-top: 4px;
`;

export default observer(PaymentInfoReviewView);
