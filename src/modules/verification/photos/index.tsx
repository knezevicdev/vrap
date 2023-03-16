import { useABSmartly } from '@vroom-web/analytics-integration';
import { observer } from 'mobx-react';
import React, { useCallback, useRef } from 'react';

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
  const absmartly = useABSmartly();
  const vin = useFetchVerificationData(priceId);
  const { data: vehiclePhotos, refetch } = useGetVehiclePhotos(priceId, vin);
  const processingFiles = useRef<DocumentFileType[]>([]);

  const refetchImages = useCallback(() => {
    if (processingFiles.current?.length) return;
    refetch();
  }, [refetch]);

  const { handleUpload } = useHandleUpload(
    vin || '',
    priceId,
    processingFiles,
    refetchImages
  );

  const photosValid = [
    DocumentFileType.BACK,
    DocumentFileType.DASH_INSTRUMENT_CLUSTER,
    DocumentFileType.DRIVER_SIDE_EXTERIOR,
    DocumentFileType.DRIVER_SIDE_FRONT_SEAT,
    DocumentFileType.FRONT,
    DocumentFileType.PASSENGER_SIDE_EXTERIOR,
  ].reduce((res, key) => {
    return Boolean(res && vehiclePhotos[key]);
  }, true);

  const handleDelete = useCallback(
    async (fileType: DocumentFileType) => {
      if (!vin) return false;
      if (!(await deleteVehiclePhoto(vin, priceId, fileType))) return false;
      refetchImages();
      return true;
    },
    [priceId, refetchImages, vin]
  );

  const docUploadProps = (
    fileType: DocumentFileType,
    title: string
  ): DocumentUploadProps & { key: string } => ({
    fileType,
    handleUpload,
    handleDelete,
    title,
    vehiclePhoto: vehiclePhotos[fileType],
    key: fileType,
  });

  const onSubmit = async (): Promise<void> => {
    if (
      localStorage.getItem('review_edit_photos') ||
      !absmartly.isInExperiment('ac-payment-required')
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
