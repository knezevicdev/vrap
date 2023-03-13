import { ActualFileObject, FilePondInitialFile } from 'filepond';
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
import { DocumentFileType } from '../../utils/uploadVehiclePhoto';
import {
  FilePondContainer,
  Image,
  ImageOverlay,
  Title,
  TitleWrapper,
  ViewImageButton,
  Wrapper,
} from './Style.css';

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
  vehiclePhoto: string | undefined;
  fileType: DocumentFileType;
  handleUpload: (file: ActualFileObject) => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
}

const DocumentUpload = ({
  title,
  vehiclePhoto,
  handleUpload,
  handleDelete,
}: DocumentUploadProps): ReactElement => {
  const [showImage, setShowImage] = useState(false);
  const [files, setFiles] = useState<FilePondInitialFile[]>([]);

  useEffect(() => {
    if (vehiclePhoto) {
      setFiles(getUploaded(vehiclePhoto));
    } else {
      setFiles([]);
    }
  }, [vehiclePhoto]);

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
          server={getServerSettings(handleUpload, handleDelete)}
          labelIdle={`Choose a file or drag it here <div class="filepond--label-action"></div>`}
          labelFileLoadError="The file type is not a supported."
          maxFileSize="25MB"
          labelMaxFileSizeExceeded="The uploaded file is too large."
          labelMaxFileSize="Max file size 25MB."
          imageValidateSizeMinResolution={100000}
          imageValidateSizeLabelImageResolutionTooLow="The file resolution is too low."
          imageValidateSizeLabelExpectedMinResolution="Min file resolution 300 x 300px."
          acceptedFileTypes={['image/png', 'image/jpeg']}
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
};

export default DocumentUpload;