import {
  ActualFileObject,
  FilePondErrorDescription,
  FilePondInitialFile,
} from 'filepond';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import React, { ReactElement, useEffect, useState } from 'react';
import { registerPlugin } from 'react-filepond';

import { getServerSettings } from '../../utils/getServerSettings';
import { getUploaded } from '../../utils/getUploaded';
import { DocumentFileType } from '../../utils/uploadVerificationDocument';
import {
  FilePondContainer,
  Image,
  ImageOverlay,
  Title,
  TitleWrapper,
  ViewImageButton,
  Wrapper,
} from './Style.css';

import { DocumentInfo } from 'src/networking/models/Verification';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFilePoster,
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateType
);

export interface DocumentUploadProps {
  title: string;
  verificationDocument?: DocumentInfo;
  fileType: DocumentFileType;
  handleUpload: (
    file: ActualFileObject,
    type: DocumentFileType
  ) => Promise<boolean>;
  handleDelete: (type: DocumentFileType) => Promise<boolean>;
  handleError: (e: FilePondErrorDescription, type: DocumentFileType) => void;
}

const DocumentUpload = React.memo(
  ({
    fileType,
    title,
    verificationDocument,
    handleUpload,
    handleDelete,
    handleError,
  }: DocumentUploadProps): ReactElement => {
    const [showImage, setShowImage] = useState(false);
    const [files, setFiles] = useState<FilePondInitialFile[]>([]);

    useEffect(() => {
      if (verificationDocument) {
        setFiles(getUploaded(verificationDocument));
      } else {
        setFiles([]);
      }
    }, [verificationDocument]);

    return (
      <>
        <Wrapper>
          <TitleWrapper>
            <Title>{title}</Title>
            {files.length > 0 && (
              <ViewImageButton onClick={() => setShowImage(!showImage)}>
                View Image
              </ViewImageButton>
            )}
          </TitleWrapper>
          <FilePondContainer
            files={files}
            allowMultiple={false}
            allowFilePoster={true}
            maxParallelUploads={1}
            maxFiles={1}
            checkValidity={true}
            allowImageExifOrientation={true}
            imagePreviewMaxHeight={1024}
            server={getServerSettings(handleUpload, handleDelete, fileType)}
            labelIdle={`Choose a file or drag it here <div class="filepond--label-action"></div>`}
            labelFileLoadError="The file type is not a supported."
            maxFileSize="25MB"
            onerror={(e: FilePondErrorDescription) => handleError(e, fileType)}
            labelMaxFileSizeExceeded="The uploaded file is too large."
            labelMaxFileSize="Max file size 25MB."
            imageValidateSizeMinResolution={100000}
            imageValidateSizeLabelImageResolutionTooLow="The file resolution is too low."
            imageValidateSizeLabelExpectedMinResolution="Min file resolution 300 x 300px."
            acceptedFileTypes={['image/png', 'image/jpeg', 'application/pdf']}
            labelFileTypeNotAllowed="The file type is not a supported."
            fileValidateTypeLabelExpectedTypes="Please upload a {allButLastType}"
          />
        </Wrapper>
        {showImage && (
          <ImageOverlay onClick={() => setShowImage(false)}>
            <Image src={files[0].source} alt="document image" />
          </ImageOverlay>
        )}
      </>
    );
  }
);

DocumentUpload.displayName = 'DocumentUpload';

export default DocumentUpload;
