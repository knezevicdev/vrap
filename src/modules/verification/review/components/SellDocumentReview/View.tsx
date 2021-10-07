import { Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon';
import Store from 'src/store';
import { displayNumber } from 'src/utils';

interface Props {
  viewModel: ViewModel;
  store: Store;
}

const SellDocumentsReview: React.FC<Props> = ({ viewModel, store }) => {
  const { verificationDetail } = store.verification;
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.SellDoctitle}</Subtitle>
        <Edit onClick={(): void => viewModel.handleEditClick()}>Edit</Edit>
      </SubTitleContainer>
      <Row>
        {verificationDetail?.front_of_driver_license_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Field>{viewModel.dlFront}</Field>
          </Info>
        )}

        {verificationDetail?.second_owner_front_of_driver_license_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Field>{viewModel.secondDlFront}</Field>
          </Info>
        )}

        {verificationDetail?.front_of_title_lien_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Field>{viewModel.tiFront}</Field>
          </Info>
        )}
        {verificationDetail?.back_of_title_lien_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Field>{viewModel.tiBack}</Field>
          </Info>
        )}

        {verificationDetail?.current_registration_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Field>{viewModel.registration}</Field>
          </Info>
        )}

        {verificationDetail?.lien_release_letter_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Field>{viewModel.lienRelease}</Field>
          </Info>
        )}

        {verificationDetail?.mileage_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Field>{viewModel.odometer}</Field>
          </Info>
        )}
      </Row>

      <MileContainer>
        <Label>{viewModel.exactMileage}</Label>
        <Field>{displayNumber(verificationDetail?.exact_mileage)}</Field>
      </MileContainer>
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
  flex-wrap: wrap;
  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

const MileContainer = styled(Row)`
  flex-direction: column;
`;

const Label = styled(Typography.Fine)`
  font-size: 13px;
  letter-spacing: 0.35px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  > :first-child {
    margin-right: 10px;
  }
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const Field = styled(Typography.Body.Regular)`
  font-size: 18px;
  line-height: 25px;
  word-wrap: break-word;
`;

const Edit = styled(Typography.Title.Three)`
  margin-left: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: normal;
  line-height: 22px;
  letter-spacing: 0.25px;
  color: #e7131a;
  padding-top: 4px;
`;

export default observer(SellDocumentsReview);
