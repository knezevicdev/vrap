import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { KeyboardEventHandler, useCallback } from 'react';

import { useAppStore } from '../../../../../context';
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
  const { store } = useAppStore();
  const appraisalDetail = store.appraisal;

  const handleEditClick = useCallback(() => {
    router
      .push({
        pathname: store.appraisal.appraisalPath,
        query: {
          vehicle: `${store.appraisal?.vehicleInfoForm?.vin}`,
          ...router.query,
        },
        hash: `#personalinformation`,
      })
      .catch((e) => {
        console.error(e);
      });
  }, [
    router,
    store.appraisal.appraisalPath,
    store.appraisal?.vehicleInfoForm?.vin,
  ]);

  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = (event) => {
    if (event.key === 'Enter') {
      handleEditClick();
    }
  };

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
          <Field>{`${appraisalDetail?.personalInfoForm?.firstName} ${appraisalDetail?.personalInfoForm?.lastName}`}</Field>
        </Info>
        <Info>
          <Label>Email Address</Label>
          <Field>{appraisalDetail?.personalInfoForm?.email}</Field>
        </Info>
        <Info>
          <Label>Phone Number</Label>
          <Field>
            {appraisalDetail?.personalInfoForm?.phoneNumber || 'N\\A'}
          </Field>
        </Info>
      </Row>
    </Container>
  );
};

export default observer(PersonalInformation);
