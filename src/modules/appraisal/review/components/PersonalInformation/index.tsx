import { useRouter } from 'next/router';
import React, { KeyboardEventHandler, useCallback } from 'react';

import useAppraisalStore from '../../../../../store/appraisalStore';
import {
  Container,
  Edit,
  Field,
  Info,
  Label,
  Row,
  Subtitle,
  SubTitleContainer,
} from './Style.css';

const PersonalInformation: React.FC = () => {
  const router = useRouter();

  const handleEditClick = useCallback(() => {
    router
      .push({
        pathname: useAppraisalStore.getState().appraisalPath(),
        query: {
          vehicle: `${useAppraisalStore.getState().vehicleInfoForm?.vin}`,
        },
        hash: `#personalinformation`,
      })
      .catch((e) => {
        console.error(e);
      });
  }, [router]);

  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = (event) => {
    if (event.key === 'Enter') {
      handleEditClick();
    }
  };

  const personalInfoForm = useAppraisalStore((state) => state.personalInfoForm);

  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>Your Information</Subtitle>
        <Edit
          role="button"
          tabIndex={0}
          onClick={handleEditClick}
          onKeyDown={onKeyDown}
        >
          Edit
        </Edit>
      </SubTitleContainer>
      <Row>
        <Info>
          <Label>Name</Label>
          <Field>{`${personalInfoForm?.firstName} ${personalInfoForm?.lastName}`}</Field>
        </Info>
        <Info>
          <Label>Email Address</Label>
          <Field>{personalInfoForm?.email}</Field>
        </Info>
        <Info>
          <Label>Phone Number</Label>
          <Field>{personalInfoForm?.phoneNumber || 'N\\A'}</Field>
        </Info>
      </Row>
    </Container>
  );
};

export default PersonalInformation;
