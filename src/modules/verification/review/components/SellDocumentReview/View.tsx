import { Icon, Typography } from '@vroom-web/ui-lib';
import { Link } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { Icons } from 'src/core/Icon';
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
        <Link.Text
          href="/some-url"
          onClick={(e): void => {
            e.preventDefault();
            viewModel.handleEditClick();
          }}
        >
          {viewModel.edit}
        </Link.Text>
      </SubTitleContainer>
      <Row>
        {verificationDetail?.front_of_driver_license_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>
            <Field>{viewModel.dlFront}</Field>
          </Info>
        )}

        {verificationDetail?.second_owner_front_of_driver_license_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>{viewModel.secondDlFront}</Field>
          </Info>
        )}

        {verificationDetail?.front_of_title_lien_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>{viewModel.tiFront}</Field>
          </Info>
        )}
        {verificationDetail?.back_of_title_lien_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>{viewModel.tiBack}</Field>
          </Info>
        )}

        {verificationDetail?.current_registration_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>{viewModel.registration}</Field>
          </Info>
        )}

        {verificationDetail?.lien_release_letter_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>{viewModel.lienRelease}</Field>
          </Info>
        )}

        {verificationDetail?.mileage_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
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
  word-wrap: break-word;
`;

const IconWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default observer(SellDocumentsReview);
