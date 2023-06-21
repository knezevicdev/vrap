import React from 'react';

import DocumentUpload from '../../components/DocumentUpload';
import {
  DocUploadDesc,
  FilesInfo,
  FilesInfoTitle,
} from '../DocumentsVerification/Styled.css';
import { Wrapper } from './Styled.css';
import useGetPhotosUploadProps from './utils/useGetPhotosUploadProps';

import { Col } from 'src/styled/grid';

const VehiclePhotosStep = () => {
  const getUploadProps = useGetPhotosUploadProps();

  return (
    <div>
      <DocUploadDesc>
        We&apos;ll need you to upload some vehicle photos.
      </DocUploadDesc>
      <FilesInfoTitle>Upload PNG or JPG files.</FilesInfoTitle>
      <FilesInfo>✔ Max file size 25MB</FilesInfo>
      <Wrapper wrap="wrap" gap="20px">
        <Col size={2 / 5}>
          <DocumentUpload {...getUploadProps('photosDriverSide')} />
        </Col>
        <Col size={2 / 5}>
          <DocumentUpload {...getUploadProps('photosPassengerSide')} />
        </Col>
        <Col size={2 / 5}>
          <DocumentUpload {...getUploadProps('photosFront')} />
        </Col>
        <Col size={2 / 5}>
          <DocumentUpload {...getUploadProps('photosBack')} />
        </Col>
        <Col size={2 / 5}>
          <DocumentUpload {...getUploadProps('photosDash')} />
        </Col>
        <Col size={2 / 5}>
          <DocumentUpload {...getUploadProps('photosFrontSeat')} />
        </Col>
      </Wrapper>
    </div>
  );
};

export default VehiclePhotosStep;
