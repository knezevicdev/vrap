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
  const OptionsList = () => {
    return (
      <>
        {appraisalDetail?.vehicleInfoForm?.vehicleOptions?.map(
          (element, index) => {
            return <Field key={index}>{element}</Field>;
          }
        )}
      </>
    );
  };
  function numberWithCommas(x: number | null) {
    if (x === null) {
      return '';
    } else if (isNaN(x)) {
      return '';
    } else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
  function addElipsesIfLong(str: string) {
    if (str) {
      return str.length > 23 ? str.substr(0, 20) + '...' : str;
    }
  }
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.vehicleInformationInfotitle}</Subtitle>
        <Edit onClick={(): void => viewModel.handleEditClick()}>
          {viewModel.edit}
        </Edit>
      </SubTitleContainer>
      <Row>
        <Info>
          <Label>{viewModel.vin}</Label>
          <Field>{appraisalDetail?.vehicleInfoForm?.vin}</Field>
        </Info>
        <Info>
          <Label>{viewModel.trim}</Label>
          <Field title={appraisalDetail?.vehicleInfoForm?.trim}>
            {addElipsesIfLong(appraisalDetail?.vehicleInfoForm?.trim)}
          </Field>
        </Info>
        <Info>
          <Label>{viewModel.mileage}</Label>
          <Field>
            {numberWithCommas(appraisalDetail?.vehicleInfoForm?.mileage)}
          </Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Field>{`(${appraisalDetail?.vehicleInfoForm?.year} ${appraisalDetail?.vehicleInfoForm?.make} ${appraisalDetail?.vehicleInfoForm?.model})`}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>{viewModel.exteriorColor}</Label>
          <Field>{appraisalDetail?.vehicleInfoForm?.exteriorColor}</Field>
        </Info>
        <Info>
          <Label>{viewModel.keysAmount}</Label>
          <Field>{appraisalDetail?.vehicleInfoForm?.keysAmount}</Field>
        </Info>

        <Info>
          <Label>{viewModel.vehicleOptions}</Label>
          {appraisalDetail?.vehicleInfoForm?.vehicleOptions?.length !== 0 ? (
            <OptionsList />
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
  text-overflow: ellipsis;
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
