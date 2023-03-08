import { Icon, Link } from '@vroom-web/ui-lib';
import React, { ReactElement } from 'react';

import { Icons } from '../../../../../core/Icon';
import useGetVehiclePhotos from '../../../photos/hooks/useGetVehiclePhotos';
import {
  Container,
  Field,
  IconWrapper,
  Info,
  LinkWrap,
  Row,
  Subtitle,
  SubTitleContainer,
} from './Style.css';

interface Props {
  priceId: string;
  vin: string;
}

const VehiclePhotosReview = ({ priceId, vin }: Props): ReactElement => {
  const { data: vehiclePhotos } = useGetVehiclePhotos(priceId, vin);

  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>Vehicle Photos</Subtitle>
        <LinkWrap>
          <Link.Text
            href={`/sell/verification/photos?priceId=${priceId}`}
            onClick={(e): void => {
              e.preventDefault();
              localStorage.setItem('review_edit_photos', '1');
              window.location.href = `/sell/verification/photos?priceId=${priceId}`;
            }}
          >
            Edit
          </Link.Text>
        </LinkWrap>
      </SubTitleContainer>
      <Row>
        {vehiclePhotos.driverSideExterior && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>
            <Field>Driver Side - Exterior</Field>
          </Info>
        )}
        {vehiclePhotos.passengerSideExterior && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>
            <Field>Passenger Side - Exterior</Field>
          </Info>
        )}
        {vehiclePhotos.front && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>
            <Field>Front</Field>
          </Info>
        )}
        {vehiclePhotos.back && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>
            <Field>Back</Field>
          </Info>
        )}
        {vehiclePhotos.dashCluster && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>
            <Field>Dash/Instrument Cluster</Field>
          </Info>
        )}
        {vehiclePhotos.driverSideFrontSeat && (
          <Info>
            <IconWrapper>
              <Icon icon={Icons.CHECK_MARK_GREEN_DOCS} />
            </IconWrapper>
            <Field>Driver Side - Front Seat</Field>
          </Info>
        )}
      </Row>
    </Container>
  );
};

export default VehiclePhotosReview;
