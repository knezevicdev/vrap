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

const PickupInformationReview = () => {
  const {
    pickupAddress,
    pickupState,
    pickupZip,
    pickupCity,
    pickupApt,
    pickupContactFirstName,
    pickupContactLastName,
    pickupContactEmail,
    pickupContactPhoneNumber,
  } = useVerificationStore(
    (state) => ({
      pickupAddress: state.pickupAddress,
      pickupState: state.pickupState,
      pickupZip: state.pickupZip,
      pickupCity: state.pickupCity,
      pickupApt: state.pickupApt || '',
      pickupContactFirstName: state.pickupContactFirstName,
      pickupContactLastName: state.pickupContactLastName,
      pickupContactEmail: state.pickupContactEmail,
      pickupContactPhoneNumber: state.pickupContactPhoneNumber,
    }),
    shallow
  );

  return (
    <div>
      <SectionTitle>Pick up address</SectionTitle>
      <Row>
        <FullInfo>
          <Field>
            {`${pickupApt} ${pickupAddress} ${pickupCity}, ${pickupState} ${pickupZip}`.trim()}
          </Field>
        </FullInfo>
      </Row>
      <SectionTitle>Contact Information</SectionTitle>
      <Row>
        <FullInfo>
          <Label>Name</Label>
          <Field>
            {pickupContactFirstName} {pickupContactLastName}
          </Field>
        </FullInfo>
      </Row>
      <Row>
        <Info>
          <Label>Email</Label>
          <Field>{pickupContactEmail}</Field>
        </Info>
        <Info>
          <Label>Phone number</Label>
          <Field>{pickupContactPhoneNumber}</Field>
        </Info>
      </Row>
    </div>
  );
};

export default PickupInformationReview;
