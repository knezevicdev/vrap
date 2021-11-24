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
  const AfterMarketList = () => {
    return (
      <>
        {appraisalDetail?.extConditionForm?.afterMarket?.map(
          (element, index) => {
            let value = element;
            if (element === 'Other') {
              value = `Other (${appraisalDetail?.extConditionForm?.otherAfterMarket})`;
            }
            return <Field key={index}>{value}</Field>;
          }
        )}
      </>
    );
  };
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.exteriorConditionInfotitle}</Subtitle>
        <Edit onClick={(): void => viewModel.handleEditClick()}>
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
          <AfterMarketList />
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
            {appraisalDetail?.extConditionForm?.dentsPanels} Panel(s)
          </Field>
        </Info>
        <Info>
          <Label>{viewModel.paintChipping}</Label>
          <Field>
            {appraisalDetail?.extConditionForm?.paintChippingPanels} Panel(s)
          </Field>
        </Info>
        <Info>
          <Label>{viewModel.scratches}</Label>
          <Field>{appraisalDetail?.extConditionForm?.scratches}</Field>
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

export default observer(VehicleInfomrationView);
