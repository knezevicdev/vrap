import { FilePondInitialFile } from 'filepond';

import { DocumentInfo } from 'src/networking/models/Verification';

export const getUploaded = (document: DocumentInfo): FilePondInitialFile[] => {
  const { originalFileName, fileExtension, fileSize, fileURL } = document;
  return [
    {
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
    },
  ];
};
