import { Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Store from 'src/store';

interface Props {
  viewModel: ViewModel;
  store: Store;
}

const VehicleInfomrationView: React.FC<Props> = ({ viewModel, store }) => {
  const appraisalDetail = store.appraisal;
  const ActiveWarningLightsList = () => {
    return (
      <>
        {appraisalDetail?.mechConditionForm?.warningLightsValues?.map(
          (element, index) => {
            return <Field key={index}>{element}</Field>;
          }
        )}
      </>
    );
  };
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.mechanicalConditionInfotitle}</Subtitle>
        <Edit onClick={(): void => viewModel.handleEditClick()}>
          {viewModel.edit}
        </Edit>
      </SubTitleContainer>
      <Row>
        <Info>
          <Label>{viewModel.runnable}</Label>
          <Field>{appraisalDetail?.mechConditionForm?.runnable}</Field>
        </Info>
        <Info>
          <Label>{viewModel.mechanicalCondition}</Label>
          <Field>
            {appraisalDetail?.mechConditionForm?.mechanicalCondition}
          </Field>
        </Info>
        {appraisalDetail?.mechConditionForm?.warningLightsValues && (
          <Info>
            <Label>{viewModel.warningLights}</Label>
            {appraisalDetail?.mechConditionForm?.warningLights === 'No' && (
              <Field>{appraisalDetail?.mechConditionForm?.warningLights}</Field>
            )}
            <ActiveWarningLightsList />
            {appraisalDetail?.mechConditionForm?.otherWarning && (
              <Field>{appraisalDetail?.mechConditionForm?.otherWarning}</Field>
            )}
          </Info>
        )}
      </Row>
      <Row>
        <Info>
          <Label>{viewModel.floodFireDamage}</Label>
          <Field>{appraisalDetail?.mechConditionForm?.floodFireDamage}</Field>
        </Info>

        <Info>
          <Label>{viewModel.additionalDetails}</Label>
          {appraisalDetail?.mechConditionForm?.additionalDetails ? (
            <Field>
              {appraisalDetail?.mechConditionForm?.additionalDetails}
            </Field>
          ) : (
            <Field>N\A</Field>
          )}
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
  width: 33%;
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

export default observer(VehicleInfomrationView);
