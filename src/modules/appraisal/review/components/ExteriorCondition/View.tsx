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

const ExteriorConditionView: React.FC<Props> = ({ viewModel, store }) => {
  const appraisalDetail = store.appraisal;

  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = (event) => {
    if (event.key === 'Enter') {
      viewModel.handleEditClick();
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
          <Label>{viewModel.afterMarket}</Label>
          {appraisalDetail?.extConditionForm?.afterMarket.length > 0 ? (
            <AfterMarketList />
          ) : (
            <Field>N\A</Field>
          )}
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>{viewModel.rust}</Label>
          <Field>{appraisalDetail?.extConditionForm?.rust}</Field>
        </Info>
        <Info>
          <Label>{viewModel.dents}</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.dentsPanels
              ? `${appraisalDetail?.extConditionForm?.dentsPanels} Panel(s)`
              : appraisalDetail?.extConditionForm?.dents}
          </Field>
        </Info>
        <Info>
          <Label>{viewModel.paintChipping}</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.paintChippingPanels
              ? `${appraisalDetail?.extConditionForm?.paintChippingPanels} Panel(s)`
              : appraisalDetail?.extConditionForm?.paintChipping}
          </Field>
        </Info>
        <Info>
          <Label>{viewModel.scratches}</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.scratchesPanels
              ? `${appraisalDetail?.extConditionForm?.scratchesPanels} Panel(s)`
              : appraisalDetail?.extConditionForm?.scratches}
          </Field>
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
  width: 25%;
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

export default observer(ExteriorConditionView);
