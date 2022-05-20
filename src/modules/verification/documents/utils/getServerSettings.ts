import {
  ActualFileObject,
  ProcessServerConfigFunction,
  RemoveServerConfigFunction,
} from 'filepond';

export const getServerSettings = (
  addDocument: (file: ActualFileObject) => Promise<boolean>,
  deleteDocument: () => Promise<boolean>
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
      const isOk = await addDocument(file);

      if (!isOk) {
        error('Failed to upload document');
      } else {
        load(file);
      }
    },
    remove: async (_uniqueFileId, load, error) => {
      const isOk = await deleteDocument();

      if (!isOk) {
        error('Failed to delete document');
      } else {
        load();
      }
    },
  };
};
