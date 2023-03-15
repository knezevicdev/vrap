import { useABSmartly } from '@vroom-web/analytics-integration';
import { noop } from 'lodash';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';

import { Container, Title } from '../shared/Style.css';
import DocumentUpload, {
  DocumentUploadProps,
} from './components/DocumentUpload';
import useHandleDelete from './hooks/useHandleDelete';
import useHandleError from './hooks/useHandleError';
import useHandleUpload from './hooks/useHandleUpload';
import useVerificationDetails from './hooks/useVerificationDetails';
import {
  Button,
  DocUploadDesc,
  FilesInfo,
  FilesInfoTitle,
  Info,
  Line,
  SectionTitle,
  SecureInfo,
  SecurityLogo,
} from './Style.css';
import { DocumentFileType } from './utils/uploadVerificationDocument';

import { useAppStore } from 'src/context';
import { Icons } from 'src/core/Icon';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { GenericObject } from 'src/interfaces.d';
import { FormField } from 'src/modules/appraisalform/components/componentInterfaces.d';
import ExactMileageInput from 'src/modules/appraisalform/components/forminputs/ExactMileageInput';
import { updateVerification } from 'src/networking/request';
import { Col, Row } from 'src/styled/grid';

interface Props {
  priceId: string;
}

const VerificationDocumentsViewDetail: React.FC<Props> = ({ priceId }) => {
  const { store } = useAppStore();
  const absmartly = useABSmartly();
  const [mileage, setMileage] = useState<number | ''>('');
  const { handleUpload } = useHandleUpload(priceId);
  const { handleDelete } = useHandleDelete(priceId);
  const { handleError } = useHandleError(priceId);
  const {
    verificationDetails,
    verificationDocuments,
    documentsValid,
    requiredDocuments,
  } = useVerificationDetails(priceId);
  const analyticsHandler = useRef(new AnalyticsHandler());
  const mileageSet = useRef(false);
  const lastPriceId = useRef<undefined | string>();

  useEffect(() => {
    if (lastPriceId.current !== priceId) {
      lastPriceId.current = priceId;
      store.verification.setWhereIsVehicleRegistered(
        localStorage.getItem('whereIsVehicleRegistered') || ''
      );
    }
  }, [priceId, store]);

  useEffect(() => {
    if (!mileageSet.current && verificationDetails) {
      mileageSet.current = true;
      setMileage(verificationDetails.exact_mileage || '');
    }
  }, [verificationDetails, setMileage, mileageSet]);

  useEffect(() => {
    analyticsHandler.current.trackVerificationDocumentsViewed();
  }, []);

  const docUploadProps = (
    fileType: DocumentFileType,
    title: string
  ): DocumentUploadProps => ({
    fileType,
    handleUpload: handleUpload(fileType),
    handleDelete: handleDelete(fileType),
    handleError: handleError(fileType),
    title,
    verificationDocument: verificationDocuments?.find(
      (verificationDocument) => verificationDocument.fileType === fileType
    ),
  });

  const onSubmit = async (): Promise<void> => {
    store.verification.setLoading(true);
    await updateVerification(
      {
        exact_mileage: Number(mileage),
      },
      priceId
    );
    store.verification.setLoading(false);

    let url;
    if (
      !localStorage.getItem('review_doc_section') &&
      absmartly.isInExperiment('ac-payment-required') &&
      !absmartly.isInExperiment('verification-form-vehicle-photo-upload')
    ) {
      url = `/appraisal/paymentmethod?priceId=${priceId}`;
    } else if (
      localStorage.getItem('review_doc_section') ||
      !absmartly.isInExperiment('verification-form-vehicle-photo-upload')
    ) {
      url = `/appraisal/verification/review?priceId=${priceId}`;
    } else {
      url = `/appraisal/verification/photos?priceId=${priceId}`;
    }

    if (localStorage.getItem('review_doc_section')) {
      localStorage.removeItem('review_doc_section');
    }
    window.location.href = url;
  };

  return (
    <Container>
      <Title>document upload</Title>
      <Line />
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
      <Line />
      <SectionTitle>Primary Owner&apos;s Identification</SectionTitle>
      <Info>
        Upload the primary owner&apos;s government-issued photo ID (such as a
        driver&apos;s license or passport)
      </Info>
      <DocumentUpload
        {...docUploadProps(
          DocumentFileType.DRIVERS_LICENSE_FRONT,
          'Front of Photo ID'
        )}
        key={DocumentFileType.DRIVERS_LICENSE_FRONT}
      />
      <Line />
      {requiredDocuments.secondDriverLicense && (
        <>
          <SectionTitle>Second Owner&apos;s Identification</SectionTitle>
          <Info>
            Upload the second owner&apos;s government-issued photo ID (such as a
            driver&apos;s license or passport)
          </Info>
          <DocumentUpload
            {...docUploadProps(
              DocumentFileType.CO_BUYER_FRONT,
              'Front of Photo ID'
            )}
            key={DocumentFileType.CO_BUYER_FRONT}
          />
          <Line />
        </>
      )}
      <SectionTitle>Registration</SectionTitle>
      <Info>
        Registration must be in your name for us to be able to purchase the
        vehicle.
      </Info>
      <DocumentUpload
        {...docUploadProps(
          DocumentFileType.VEHICLE_REGISTRATION,
          'Current Registration'
        )}
        key={DocumentFileType.VEHICLE_REGISTRATION}
      />
      <Line />
      {requiredDocuments.titleInfo && (
        <>
          <SectionTitle>Title Information</SectionTitle>
          <Info>
            Title must be in your name for us to be able to purchase the
            vehicle.
          </Info>
          <Row gap="15px" wrap="wrap">
            <Col
              size={{
                default: 1 / 2,
                mobile: 1,
              }}
            >
              <DocumentUpload
                {...docUploadProps(
                  DocumentFileType.TRADE_TITLE_FRONT,
                  'Front of Title'
                )}
                key={DocumentFileType.TRADE_TITLE_FRONT}
              />
            </Col>
            <Col
              size={{
                default: 1 / 2,
                mobile: 1,
              }}
            >
              <DocumentUpload
                {...docUploadProps(
                  DocumentFileType.TRADE_TITLE_BACK,
                  'Back of Title'
                )}
                key={DocumentFileType.TRADE_TITLE_BACK}
              />
            </Col>
          </Row>
          <Line />
        </>
      )}
      {requiredDocuments.lienInfo && (
        <>
          <SectionTitle>Lien Release Letter</SectionTitle>
          <Info>
            If you previously had a lien, please upload a copy of the lien
            release letter here.
          </Info>
          <DocumentUpload
            {...docUploadProps(DocumentFileType.LETTER, 'Letter')}
            key={DocumentFileType.LETTER}
          />
          <Line />
        </>
      )}
      <SectionTitle>Odometer Information</SectionTitle>
      <Info>Please upload a picture of your odometer.</Info>
      <DocumentUpload
        {...docUploadProps(DocumentFileType.TRADE_ODOMETER, 'Exact Mileage')}
        key={DocumentFileType.TRADE_ODOMETER}
      />
      <DocUploadDesc>
        What is your exact mileage as shown on the odometer?
      </DocUploadDesc>
      <Row>
        <Col
          size={{
            default: 1 / 2,
            mobile: 1,
          }}
        >
          <ExactMileageInput
            field={{
              onChange: ((field: FormField) => {
                setMileage(field.value);
              }) as (event: GenericObject) => void,
              value: mileage,
            }}
            handleOnBlur={noop}
          />
        </Col>
      </Row>
      <Line />
      <Button disabled={!documentsValid || mileage === ''} onClick={onSubmit}>
        Next
      </Button>
    </Container>
  );
};

export default observer(VerificationDocumentsViewDetail);
