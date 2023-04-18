import { Icon } from '@vroom-web/ui-lib';
import React from 'react';

import { VerificationDocumentKey } from '../../store/documentsVerification';
import useVerificationStore from '../../store/store';
import {
  Container,
  Field,
  IconWrapper,
  Info,
  Label,
  MileContainer,
  Row,
} from './Styled.css';
import { documentUploadProps } from './useGetDocumentUploadProps';

import { Icons } from 'src/core/Icon';
import { displayNumber } from 'src/utils';

const DocumentsVerificationReview = () => {
  const { documentMileageValue, ...state } = useVerificationStore((store) => ({
    documentDriverLicenseFront: store.documentDriverLicenseFront,
    documentSecondDriverLicenseFront: store.documentSecondDriverLicenseFront,
    documentVehicleRegistration: store.documentVehicleRegistration,
    documentTitleFront: store.documentTitleFront,
    documentTitleBack: store.documentTitleBack,
    documentOdometer: store.documentOdometer,
    documentReleaseLetter: store.documentReleaseLetter,
    documentMileageValue: store.documentMileageValue,
  }));

  return (
    <Container>
      <Row>
        {(
          [
            'documentDriverLicenseFront',
            'documentSecondDriverLicenseFront',
            'documentVehicleRegistration',
            'documentTitleFront',
            'documentTitleBack',
            'documentOdometer',
            'documentReleaseLetter',
          ] as VerificationDocumentKey[]
        )
          .filter((key) => state[key])
          .map((key) => (
            <Info key={key}>
              <IconWrapper>
                <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
              </IconWrapper>
              <Field>{documentUploadProps[key].label}</Field>
            </Info>
          ))}
      </Row>

      <MileContainer>
        <Label>Exact Mileage</Label>
        <Field>{displayNumber(documentMileageValue)}</Field>
      </MileContainer>
    </Container>
  );
};

export default DocumentsVerificationReview;
