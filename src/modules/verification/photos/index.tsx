import { observer } from 'mobx-react';
import React, { useState } from 'react';

import { useAppStore } from '../../../context';
import { Container, Title } from '../shared/Style.css';
import DocumentUpload, {
  DocumentUploadProps,
} from './components/DocumentUpload';
import useFetchVerificationData from './hooks/useFetchVerificationData';
import useGetVehiclePhotos from './hooks/useGetVehiclePhotos';
import useHandleUpload from './hooks/useHandleUpload';
import {
  Button,
  DocUploadDesc,
  FilesInfo,
  FilesInfoTitle,
  Line,
  SectionTitle,
} from './Style.css';
import { deleteVehiclePhoto } from './utils/deleteVehiclePhoto';
import { DocumentFileType } from './utils/uploadVehiclePhoto';

import { Col, Row } from 'src/styled/grid';

interface Props {
  priceId: string;
}

const VerificationPhotosViewDetail: React.FC<Props> = ({ priceId }) => {
  const { store } = useAppStore();
  const vin = useFetchVerificationData(priceId);
  const { data: vehiclePhotos } = useGetVehiclePhotos(priceId, vin);
  const [localVehiclePhotos, setLocalVehiclePhotos] = useState<
    Partial<Record<DocumentFileType, boolean>>
  >({});
  const { handleUpload } = useHandleUpload(
    vin || '',
    priceId,
    setLocalVehiclePhotos
  );

  const photosValid = [
    DocumentFileType.BACK,
    DocumentFileType.DASH_INSTRUMENT_CLUSTER,
    DocumentFileType.DRIVER_SIDE_EXTERIOR,
    DocumentFileType.DRIVER_SIDE_FRONT_SEAT,
    DocumentFileType.FRONT,
    DocumentFileType.PASSENGER_SIDE_EXTERIOR,
  ].reduce((res, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (localVehiclePhotos.hasOwnProperty(key))
      return Boolean(res && localVehiclePhotos[key]);
    return Boolean(res && vehiclePhotos[key]);
  }, true);

  const docUploadProps = (
    fileType: DocumentFileType,
    title: string
  ): DocumentUploadProps & { key: string } => ({
    fileType,
    handleUpload: handleUpload(fileType),
    handleDelete: async () => {
      if (!vin) return false;
      if (!(await deleteVehiclePhoto(vin, priceId, fileType))) return false;
      setLocalVehiclePhotos((localVehiclePhotos) => ({
        ...localVehiclePhotos,
        [fileType]: false,
      }));
      return true;
    },
    title,
    vehiclePhoto:
      typeof localVehiclePhotos[fileType] !== 'undefined'
        ? undefined
        : vehiclePhotos[fileType],
    key: fileType,
  });

  console.log(localVehiclePhotos, vehiclePhotos);

  const onSubmit = async (): Promise<void> => {
    if (
      localStorage.getItem('review_edit_photos') ||
      !store.absmart.isInExperiment('ac-payment-required')
    ) {
      localStorage.removeItem('review_edit_photos');
      window.location.href = `/appraisal/verification/review?priceId=${priceId}`;
    } else {
      window.location.href = `/appraisal/paymentmethod?priceId=${priceId}`;
    }
  };

  return (
    <Container>
      <Title>photos upload</Title>
      <Line />
      <DocUploadDesc>
        We&apos;ll need you to upload some vehicle photos.
      </DocUploadDesc>
      <FilesInfoTitle>Upload PNG, JPG, or PDF files.</FilesInfoTitle>
      <FilesInfo>✔ Max file size 25MB</FilesInfo>
      <Line />
      <SectionTitle />
      <DocumentUpload
        {...docUploadProps(
          DocumentFileType.DRIVER_SIDE_EXTERIOR,
          'Driver Side - Exterior'
        )}
      />
      <Line />
      <SectionTitle />
      <DocumentUpload
        {...docUploadProps(
          DocumentFileType.PASSENGER_SIDE_EXTERIOR,
          'Passenger Side - Exterior'
        )}
      />
      <Line />
      <SectionTitle>Frond and Back</SectionTitle>
      <Row gap="15px" wrap="wrap">
        <Col
          size={{
            default: 1 / 2,
            mobile: 1,
          }}
        >
          <DocumentUpload
            {...docUploadProps(DocumentFileType.FRONT, 'Front')}
          />
        </Col>
        <Col
          size={{
            default: 1 / 2,
            mobile: 1,
          }}
        >
          <DocumentUpload {...docUploadProps(DocumentFileType.BACK, 'Back')} />
        </Col>
      </Row>
      <Line />
      <SectionTitle />
      <DocumentUpload
        {...docUploadProps(
          DocumentFileType.DASH_INSTRUMENT_CLUSTER,
          'Dash/Instrument Cluster'
        )}
      />
      <Line />
      <SectionTitle />
      <DocumentUpload
        {...docUploadProps(
          DocumentFileType.DRIVER_SIDE_FRONT_SEAT,
          'Driver Side - Front Seat'
        )}
      />
      <Line />
      <Button disabled={!photosValid} onClick={onSubmit}>
        Next
      </Button>
    </Container>
  );
};

export default observer(VerificationPhotosViewDetail);
