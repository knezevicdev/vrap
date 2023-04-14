import React from 'react';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../store/store';
import {
  Field,
  FullInfo,
  Info,
  Label,
  Row,
  SectionTitle,
} from '../../Styled.css';

const OwnerVerificationReview = () => {
  const {
    firstOwnerFirstName,
    firstOwnerLastName,
    firstOwnerAddress,
    firstOwnerState,
    firstOwnerZip,
    firstOwnerCity,
    firstOwnerApt,
    firstOwnerEmail,
    firstOwnerPhoneNumber,
    secondOwnerConfirmation,
    secondOwnerFirstName,
    secondOwnerLastName,
    secondOwnerAddress,
    secondOwnerState,
    secondOwnerZip,
    secondOwnerCity,
    secondOwnerApt,
    secondOwnerEmail,
    secondOwnerPhoneNumber,
  } = useVerificationStore(
    (state) => ({
      firstOwnerConfirmation: state.firstOwnerConfirmation,
      firstOwnerFirstName: state.firstOwnerFirstName,
      firstOwnerLastName: state.firstOwnerLastName,
      firstOwnerAddress: state.firstOwnerAddress,
      firstOwnerState: state.firstOwnerState,
      firstOwnerZip: state.firstOwnerZip,
      firstOwnerCity: state.firstOwnerCity,
      firstOwnerApt: state.firstOwnerApt,
      firstOwnerEmail: state.firstOwnerEmail,
      firstOwnerPhoneNumber: state.firstOwnerPhoneNumber,
      secondOwnerConfirmation: state.secondOwnerConfirmation,
      secondOwnerFirstName: state.secondOwnerFirstName,
      secondOwnerLastName: state.secondOwnerLastName,
      secondOwnerAddress: state.secondOwnerAddress,
      secondOwnerState: state.secondOwnerState,
      secondOwnerZip: state.secondOwnerZip,
      secondOwnerCity: state.secondOwnerCity,
      secondOwnerApt: state.secondOwnerApt,
      secondOwnerEmail: state.secondOwnerEmail,
      secondOwnerPhoneNumber: state.secondOwnerPhoneNumber,
    }),
    shallow
  );

  return (
    <div>
      <SectionTitle>Primary Owner&apos;s Information</SectionTitle>
      <Row>
        <Info>
          <Label>Name</Label>
          <Field>
            {firstOwnerFirstName} {firstOwnerLastName}
          </Field>
        </Info>
        <Info>
          <Label>Email</Label>
          <Field>{firstOwnerEmail}</Field>
        </Info>
        <Info>
          <Label>Phone number</Label>
          <Field>{firstOwnerPhoneNumber}</Field>
        </Info>
      </Row>
      <Row>
        <FullInfo>
          <Label>Address</Label>
          <Field>
            {`${firstOwnerApt} ${firstOwnerAddress} ${firstOwnerCity}, ${firstOwnerState} ${firstOwnerZip}`.trim()}
          </Field>
        </FullInfo>
      </Row>
      {secondOwnerConfirmation === 'Yes' && (
        <>
          <SectionTitle>Secondary Owner&apos;s Information</SectionTitle>
          <Row>
            <Info>
              <Label>Name</Label>
              <Field>
                {secondOwnerFirstName} {secondOwnerLastName}
              </Field>
            </Info>
            <Info>
              <Label>Email</Label>
              <Field>{secondOwnerEmail}</Field>
            </Info>
            <Info>
              <Label>Phone number</Label>
              <Field>{secondOwnerPhoneNumber}</Field>
            </Info>
          </Row>
          <Row>
            <FullInfo>
              <Label>Address</Label>
              <Field>
                {`${secondOwnerApt} ${secondOwnerAddress} ${secondOwnerCity}, ${secondOwnerState} ${secondOwnerZip}`.trim()}
              </Field>
            </FullInfo>
          </Row>
        </>
      )}
    </div>
  );
};

export default OwnerVerificationReview;
