import { Icon } from '@vroom-web/ui-lib';
import { Link } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';

import {
  Container,
  Field,
  IconWrapper,
  Info,
  Label,
  LinkWrap,
  MileContainer,
  Row,
  Subtitle,
  SubTitleContainer,
} from './Style.css';

import { useAppStore } from 'src/context';
import { Icons } from 'src/core/Icon';
import { displayNumber } from 'src/utils';

const SellDocumentsReview = () => {
  const { store } = useAppStore();

  const { verificationDetail } = store.verification;
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>Document Upload</Subtitle>
        <LinkWrap>
          <Link.Text
            href={`/sell/verification/documents/${store.verification.offerId}`}
            onClick={(e): void => {
              e.preventDefault();
              window.location.href = `/sell/verification/documents/${store.verification.offerId}`;
            }}
          >
            Edit
          </Link.Text>
        </LinkWrap>
      </SubTitleContainer>
      <Row>
        {verificationDetail?.front_of_driver_license_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>
            <Field>Front of Driver&apos;s License</Field>
          </Info>
        )}
        {verificationDetail?.back_of_driver_license_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>
            <Field>Back of Driver&apos;s License</Field>
          </Info>
        )}

        {verificationDetail?.second_owner_front_of_driver_license_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>Front of Second Owner&apos;s Driver&apos;s License</Field>
          </Info>
        )}

        {verificationDetail?.second_owner_back_of_driver_license_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>Back of Second Owner&apos;s Driver&apos;s License</Field>
          </Info>
        )}

        {verificationDetail?.front_of_title_lien_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>Front of Title Information</Field>
          </Info>
        )}
        {verificationDetail?.back_of_title_lien_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>Back of Title Information</Field>
          </Info>
        )}

        {verificationDetail?.current_registration_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>Registration</Field>
          </Info>
        )}

        {verificationDetail?.lien_release_letter_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>Lien Release Letter</Field>
          </Info>
        )}

        {verificationDetail?.mileage_file_id && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>{' '}
            <Field>Odometer Picture</Field>
          </Info>
        )}
      </Row>

      <MileContainer>
        <Label>Exact Mileage</Label>
        <Field>{displayNumber(verificationDetail?.exact_mileage)}</Field>
      </MileContainer>
    </Container>
  );
};

export default observer(SellDocumentsReview);
