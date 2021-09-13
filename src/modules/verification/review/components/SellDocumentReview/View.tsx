import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon';
import Store from 'src/store';

interface Props {
  viewModel: ViewModel;
  store: Store;
}

const SellDocumentsReview: React.FC<Props> = ({ viewModel, store }) => {
  const { verificationDetail } = store.verification;
  return (
    <>
      <Subtitle>
        {viewModel.SellDoctitle}{' '}
        <Edit onClick={() => console.log('verificationDocUpload')}>Edit</Edit>
      </Subtitle>
      <Row>
        {verificationDetail?.front_of_driver_license_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Title>{viewModel.dlFront}</Title>
          </Info>
        )}

        {verificationDetail?.second_owner_front_of_driver_license_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Title>{viewModel.secondDlFront}</Title>
          </Info>
        )}

        {verificationDetail?.front_of_title_lien_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Title>{viewModel.tiFront}</Title>
          </Info>
        )}
        {verificationDetail?.back_of_title_lien_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Title>{viewModel.tiBack}</Title>
          </Info>
        )}

        {verificationDetail?.current_registration_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Title>{viewModel.registration}</Title>
          </Info>
        )}

        {verificationDetail?.lien_release_letter_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Title>{viewModel.lienRelease}</Title>
          </Info>
        )}

        {verificationDetail?.mileage_file_id && (
          <Info>
            <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            <Title>{viewModel.odometer}</Title>
          </Info>
        )}
      </Row>

      <Row>
        <SpanInfo>
          <SpanLabel>{viewModel.exactMileage}</SpanLabel>
          <SpanField>{verificationDetail?.exact_mileage}</SpanField>
        </SpanInfo>
      </Row>
    </>
  );
};

const Subtitle = styled.h2`
  /* ${(props) => props.theme.typography.sectionTitleSemi3} */
  text-align: left;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;
  /* ${(props) => props.theme.media.lte('mobile')} {
    flex-direction: column;
    margin-bottom: 0;
  } */
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  /* ${(props) => props.theme.media.lte('mobile')} {
    width: 100%;
    padding-bottom: 10px;
  } */
`;

const Title = styled.span`
  /* ${(props) => props.theme.typography.body} */
  margin-left: 10px;
`;

// const CheckmarkIcon = styled.img``;

const SpanInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  /* ${(props) => props.theme.media.lte('mobile')} {
    width: 100%;
    padding-bottom: 10px;
  } */
`;

const SpanLabel = styled.span`
  /* ${(props) => props.theme.typography.h14()}
  color: ${(props) => props.theme.colors.dark}; */
`;

const SpanField = styled.span`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.25px;
`;

const Edit = styled.span`
  /* ${(props) => props.theme.typography.h10()}
  color: ${(props) => props.theme.colors.vroomRed}; */
  cursor: pointer;
`;

export default observer(SellDocumentsReview);
