import { Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { KeyboardEventHandler } from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Store from 'src/store';

interface Props {
  viewModel: ViewModel;
  store: Store;
}

const MechanicalConditionView: React.FC<Props> = ({ viewModel, store }) => {
  const appraisalDetail = store.appraisal;

  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = (event) => {
    if (event.key === 'Enter') {
      viewModel.handleEditClick();
    }
  };

  const ActiveWarningLightsList = () => {
    return (
      <>
        {viewModel.warningLightsValues.map((element: any, index: any) => {
          return <Field key={index}>{element}</Field>;
        })}
      </>
    );
  };

  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.mechanicalConditionInfotitle}</Subtitle>
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
          <Label>{viewModel.runnable}</Label>
          <Field>{appraisalDetail?.mechConditionForm?.runnable}</Field>
        </Info>
        <Info>
          <Label>{viewModel.mechanicalCondition}</Label>
          <Field>
            {appraisalDetail?.mechConditionForm?.mechanicalCondition}
          </Field>
        </Info>
        {viewModel.warningLightsValues && (
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

export default observer(MechanicalConditionView);
