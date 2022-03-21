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

const InteriorConditionView: React.FC<Props> = ({ viewModel, store }) => {
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
        <Subtitle>{viewModel.interiorConditionInfotitle}</Subtitle>
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
          <Label>{viewModel.interiorMaterial}</Label>
          <Field>{appraisalDetail?.intConditionForm?.seats}</Field>
        </Info>
        <Info>
          <Label>{viewModel.interiorCondition}</Label>
          <Field>{appraisalDetail?.intConditionForm?.interiorCondition}</Field>
        </Info>
        <Info>
          <Label>{viewModel.odor}</Label>
          <Field>{appraisalDetail?.intConditionForm?.smokedIn}</Field>
        </Info>
      </Row>
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
  width: 50%;
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

export default observer(InteriorConditionView);
