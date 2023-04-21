import React, { useState } from 'react';

import Dialog from '../Dialog';
import { uploadPending, uploadSuccess } from './icons';
import {
  DialogContent,
  ExamplePhoto,
  FileUpload,
  Subtitle,
  Title,
  UploadButton,
  UploaderButton,
  UploaderButtonText,
  UploadFeedback,
} from './Styled.css';

import Spinner from 'src/components/Spinner';

export interface DocumentUploadProps {
  label: string;
  description: string;
  example?: string;
  handleUpload: (file: File) => Promise<boolean>;
  disallowPdf?: boolean;
  uploaded: boolean;
  buttonLabel?: string;
}

const DocumentUpload = ({
  label,
  description,
  example,
  disallowPdf,
  handleUpload,
  uploaded,
  buttonLabel = 'Upload document',
}: DocumentUploadProps) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError('');
    const file = event.target.files?.[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'].slice(
      0,
      disallowPdf ? 1 : 2
    );

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setError(
        'Unsupported File format. Please upload a JPG' +
          (disallowPdf ? ' or PNG.' : ', PNG, or PDF.')
      );
      return;
    }

    setIsLoading(true);
    if (!(await handleUpload(file))) {
      setError('Something went wrong. Please try again.');
    } else {
      setShowModal(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <UploaderButton
        onClick={() => {
          setError('');
          setShowModal(true);
        }}
      >
        <UploaderButtonText>{label}</UploaderButtonText>
        {uploaded ? uploadSuccess : uploadPending}
      </UploaderButton>
      {showModal && (
        <Dialog onClose={() => !isLoading && setShowModal(false)}>
          <DialogContent>
            <Title>{label}</Title>
            <Subtitle>{description}</Subtitle>
            {example && <ExamplePhoto src={example} alt="example" />}
            <UploadFeedback>{error}</UploadFeedback>
            <UploadButton>
              <FileUpload
                onChange={handleFileSelect}
                type="file"
                accept={['.jpg', '.jpeg', '.png', '.pdf']
                  .slice(0, disallowPdf ? 2 : 3)
                  .join(',')}
                disabled={isLoading}
              />
              {isLoading ? <Spinner /> : buttonLabel}
            </UploadButton>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DocumentUpload;
