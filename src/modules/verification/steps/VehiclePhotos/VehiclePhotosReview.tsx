import { Icon } from '@vroom-web/ui-lib';
import React from 'react';

import { VehiclePhotosKey } from '../../store/photosVerification';
import useVerificationStore from '../../store/store';
import {
  Container,
  Field,
  IconWrapper,
  Info,
  Row,
} from '../DocumentsVerification/Styled.css';
import { photosUploadProps } from './utils/useGetPhotosUploadProps';

import { Icons } from 'src/core/Icon';

const VehiclePhotosReview = () => {
  const state = useVerificationStore((store) => ({
    photosDriverSide: store.photosDriverSide,
    photosPassengerSide: store.photosPassengerSide,
    photosFront: store.photosFront,
    photosBack: store.photosBack,
    photosDash: store.photosDash,
    photosFrontSeat: store.photosFrontSeat,
  }));

  return (
    <Container>
      <Row>
        {(
          [
            'photosDriverSide',
            'photosPassengerSide',
            'photosFront',
            'photosBack',
            'photosDash',
            'photosFrontSeat',
          ] as VehiclePhotosKey[]
        )
          .filter((key) => state[key])
          .map((key) => (
            <Info key={key}>
              <IconWrapper>
                <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
              </IconWrapper>
              <Field>{photosUploadProps[key].label}</Field>
            </Info>
          ))}
      </Row>
    </Container>
  );
};

export default VehiclePhotosReview;
