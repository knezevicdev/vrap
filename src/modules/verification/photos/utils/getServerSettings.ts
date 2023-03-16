import {
  ActualFileObject,
  ProcessServerConfigFunction,
  RemoveServerConfigFunction,
} from 'filepond';

import { DocumentFileType } from './uploadVehiclePhoto';

export const getServerSettings = (
  addDocument: (
    file: ActualFileObject,
    type: DocumentFileType
  ) => Promise<boolean>,
  deleteDocument: (type: DocumentFileType) => Promise<boolean>,
  fileType: DocumentFileType
): {
  url: string;
  timeout: number;
  process: ProcessServerConfigFunction;
  remove: RemoveServerConfigFunction;
} => {
  return {
    url: './',
    timeout: 15000,
    process: async (_fieldName, file, _metadata, load, error) => {
      const isOk = await addDocument(file, fileType);

      if (!isOk) {
        error('Failed to upload photo');
      } else {
        load(file);
      }
    },
    remove: async (_uniqueFileId, load, error) => {
      const isOk = await deleteDocument(fileType);

      if (!isOk) {
        error('Failed to delete photo');
      } else {
        load();
      }
    },
  };
};
