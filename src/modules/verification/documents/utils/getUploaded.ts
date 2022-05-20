import { FilePondInitialFile } from 'filepond';

import { DocumentInfo } from 'src/networking/models/Verification';

export const getUploaded = (
  documents: DocumentInfo[],
  currentFileType: string
): FilePondInitialFile[] => {
  return documents
    .filter(
      ({ fileType, fileURL }) =>
        fileType === currentFileType && fileURL !== 'None'
    )
    .map(({ originalFileName, fileExtension, fileSize, fileURL }) => ({
      source: fileURL,
      options: {
        type: 'local',
        file: {
          name: originalFileName,
          size: fileSize,
          type: fileExtension,
        },
        metadata: {
          poster: fileURL,
        },
      },
    }));
};
