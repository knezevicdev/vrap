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

const ExteriorConditionView: React.FC<Props> = ({ viewModel, store }) => {
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

  const AfterMarketList = () => {
    return (
      <>
        {viewModel.afterMarketOptions.map((element: any, index: any) => {
          let value = element;
          if (element === 'Other') {
            value = `Other (${appraisalDetail?.extConditionForm?.otherAfterMarket})`;
          }
          return <Field key={index}>{value}</Field>;
        })}
      </>
    );
  };

  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.exteriorConditionInfotitle}</Subtitle>
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
          <Label>{viewModel.exteriorCondition}</Label>
          <Field>{appraisalDetail?.extConditionForm?.exteriorCondition}</Field>
        </Info>
        <Info>
          <Label>{viewModel.hailDamage}</Label>
          <Field>{appraisalDetail?.extConditionForm?.hailDamage}</Field>
        </Info>
        <Info>
          <Label>{viewModel.tiresAndWheels}</Label>
          <Field>{appraisalDetail?.extConditionForm?.tiresAndWheels}</Field>
        </Info>
        <Info>
          <Label>{viewModel.afterMarket}</Label>
          {appraisalDetail?.extConditionForm?.otherAfterMarket !== 'No' ? (
            <AfterMarketList />
          ) : (
            <Field>N\A</Field>
          )}
        </Info>
      </Row>
      <Row>
        {appraisalDetail?.extConditionForm?.rust && (
          <Info>
            <Label>{viewModel.rust}</Label>
            <Field>{appraisalDetail?.extConditionForm?.rust}</Field>
          </Info>
        )}
        {appraisalDetail?.extConditionForm?.dentsPanels !== 0 && (
          <Info>
            <Label>{viewModel.dents}</Label>
            <Field>
              {appraisalDetail?.extConditionForm?.dentsPanels} Panel(s)
            </Field>
          </Info>
        )}
        {appraisalDetail?.extConditionForm?.paintChippingPanels !== 0 && (
          <Info>
            <Label>{viewModel.paintChipping}</Label>
            <Field>
              {appraisalDetail?.extConditionForm?.paintChippingPanels} Panel(s)
            </Field>
          </Info>
        )}
        {appraisalDetail?.extConditionForm?.scratches && (
          <Info>
            <Label>{viewModel.scratches}</Label>
            <Field>{appraisalDetail?.extConditionForm?.scratches}</Field>
          </Info>
        )}
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

export default observer(ExteriorConditionView);
