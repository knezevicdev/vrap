import { Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { KeyboardEventHandler } from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const VehicleInformationView: React.FC<Props> = ({ viewModel }) => {
  const OptionsList = () => {
    return (
      <>
        {viewModel.vehicleFormInfoOptions.map((element: any, index: any) => {
          return <Field key={index}>{element}</Field>;
        })}
      </>
    );
  };

  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = (event) => {
    if (event.key === 'Enter') {
      viewModel.handleEditClick();
    }
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
          <Label>{viewModel.vin}</Label>
          <Field>{viewModel.vehicleFormInfoVin}</Field>
        </Info>
        {viewModel.vehicleFormInfoTrim && (
          <Info>
            <Label>{viewModel.trim}</Label>
            <Field title={viewModel.vehicleFormInfoTrim}>
              {addElipsesIfLong(viewModel.vehicleFormInfoTrim)}
            </Field>
          </Info>
        )}
        <Info>
          <Label>{viewModel.mileage}</Label>
          <Field>{numberWithCommas(viewModel.vehicleFormInfoMileage)}</Field>
        </Info>
      </Row>
      <Row>
        <Info fullWidth={true}>
          <Field>{`(${viewModel.vehicleFormInfoYear} ${viewModel.vehicleFormInfoMake} ${viewModel.vehicleFormInfoModel})`}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>{viewModel.exteriorColor}</Label>
          <Field>{viewModel.vehicleFormInfoColor}</Field>
        </Info>
        <Info>
          <Label>{viewModel.keysAmount}</Label>
          <Field>{viewModel.vehicleFormInfoKeys}</Field>
        </Info>

        <Info>
          <Label>{viewModel.vehicleOptions}</Label>
          {viewModel.vehicleFormInfoOptions.length !== 0 ? (
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

const Info = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.fullWidth ? '100%;' : '33%')};
`;

const Label = styled(Typography.Fine)`
  font-size: 13px;
  letter-spacing: 0.35px;
  margin-bottom: 2px;
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

export default observer(VehicleInformationView);
