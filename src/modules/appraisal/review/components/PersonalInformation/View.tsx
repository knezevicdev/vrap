import { Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Store from 'src/store';

interface Props {
  viewModel: ViewModel;
  store: Store;
}

const PersonalInformationView: React.FC<Props> = ({ viewModel, store }) => {
  const appraisalDetail = store.appraisal;
  const [visibleSection, setVisibleSection] = useState('');

  const onKeyDown = (event: any) => (): void => {
    const key = event.key;
    const section =
      event.currentTarget.title === visibleSection
        ? ''
        : event.currentTarget.title;

    if (key === 'Enter') {
      setVisibleSection(section);
    }
  };

  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.personalInformationInfotitle}</Subtitle>
        <Edit
          role="button"
          tabIndex={0}
          onClick={(): void => viewModel.handleEditClick()}
          onKeyDown={onKeyDown}
        >
          {viewModel.edit}
        </Edit>
      </SubTitleContainer>
      <Row>
        <Info>
          <Label>{viewModel.name}</Label>
          <Field>{`${appraisalDetail?.personalInfoForm?.firstName} ${appraisalDetail?.personalInfoForm?.lastName}`}</Field>
        </Info>
        <Info>
          <Label>{viewModel.email}</Label>
          <Field>{appraisalDetail?.personalInfoForm?.email}</Field>
        </Info>
        <Info>
          <Label>{viewModel.phoneNumber}</Label>
          {appraisalDetail?.personalInfoForm?.phoneNumber && (
            <Field>{appraisalDetail?.personalInfoForm?.phoneNumber}</Field>
          )}
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>{viewModel.zipCode}</Label>
          <Field>{appraisalDetail?.personalInfoForm?.zipCode}</Field>
        </Info>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  padding: 15px 0 20px 0;
`;

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;
`;

const Subtitle = styled(Typography.Title.Three)`
  line-height: 26px;
`;

const Row = styled.div`
  display: flex;
  :not(:last-child) {
    margin-bottom: 32px;
  }
  @media (max-width: 767px) {
    margin-top: 0;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
`;

const Label = styled(Typography.Fine)`
  font-size: 13px;
  letter-spacing: 0.35px;
  margin-bottom: 2px;
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

export default observer(PersonalInformationView);
