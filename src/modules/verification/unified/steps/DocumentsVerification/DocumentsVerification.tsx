import { Input } from '@vroom-web/ui-lib';
import React from 'react';

import { Icons } from '../../../../../core/Icon';
import DocumentUpload from '../../components/DocumentUpload';
import useVerificationStore from '../../store/store';
import useRequiredDocuments from '../../utils/useRequiredDocuments';
import {
  DocUploadDesc,
  FilesInfo,
  FilesInfoTitle,
  SecureInfo,
  SecurityLogo,
  Wrapper,
} from './Styled.css';
import useGetDocumentUploadProps from './useGetDocumentUploadProps';

import { Col, Row } from 'src/styled/grid';

const DocumentsVerificationStep = () => {
  const mileage = useVerificationStore((state) => state.documentMileageValue);
  const setMileage = useVerificationStore((state) => state.setMileage);
  const getUploadProps = useGetDocumentUploadProps();
  const requiredDocuments = useRequiredDocuments();

  return (
    <div>
      <DocUploadDesc>
        We&apos;ll need you to upload some documents for us.
      </DocUploadDesc>
      <FilesInfoTitle>
        Upload PNG, JPG, or PDF files. Please make sure all information is
        clear.
      </FilesInfoTitle>
      <FilesInfo>✔ Max file size 25MB</FilesInfo>
      <FilesInfo>✔ All 4 corners must be visible</FilesInfo>
      <FilesInfo>✔ Color image only</FilesInfo>
      <SecureInfo>
        <SecurityLogo icon={Icons.SECURE_LOCK_GREEN} />
        Don&apos;t worry, your information is safe and secure with us.
      </SecureInfo>
      <Wrapper wrap="wrap" gap="20px">
        <Col size={{ default: 2 / 5, mobile: 1 }}>
          <DocumentUpload {...getUploadProps('documentDriverLicenseFront')} />
        </Col>
        {requiredDocuments.firstDriverLicenseBack && (
          <Col size={{ default: 2 / 5, mobile: 1 }}>
            <DocumentUpload {...getUploadProps('documentDriverLicenseBack')} />
          </Col>
        )}
        {requiredDocuments.secondDriverLicense && (
          <Col size={{ default: 2 / 5, mobile: 1 }}>
            <DocumentUpload
              {...getUploadProps('documentSecondDriverLicenseFront')}
            />
          </Col>
        )}
        {requiredDocuments.secondDriverLicenseBack && (
          <Col size={{ default: 2 / 5, mobile: 1 }}>
            <DocumentUpload
              {...getUploadProps('documentSecondDriverLicenseBack')}
            />
          </Col>
        )}
        {requiredDocuments.titleInfo && (
          <>
            <Col size={{ default: 2 / 5, mobile: 1 }}>
              <DocumentUpload {...getUploadProps('documentTitleFront')} />
            </Col>
            <Col size={{ default: 2 / 5, mobile: 1 }}>
              <DocumentUpload {...getUploadProps('documentTitleBack')} />
            </Col>
          </>
        )}
        {requiredDocuments.lienInfo && (
          <Col size={{ default: 2 / 5, mobile: 1 }}>
            <DocumentUpload {...getUploadProps('documentReleaseLetter')} />
          </Col>
        )}
        <Col size={{ default: 2 / 5, mobile: 1 }}>
          <DocumentUpload {...getUploadProps('documentVehicleRegistration')} />
        </Col>
        <Col size={{ default: 2 / 5, mobile: 1 }}>
          <DocumentUpload {...getUploadProps('documentOdometer')} />
        </Col>
        <Col size={1}>
          <Row>
            <Col size={{ default: 1 / 2, mobile: 1 }}>
              <Input
                placeholder="Mileage"
                label="Mileage shown on the odometer"
                type="number"
                value={mileage || ''}
                onChange={(e) => {
                  setMileage(Number(e.target.value.replace(/\D/g, '')) || 0);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Wrapper>
    </div>
  );
};

export default DocumentsVerificationStep;
