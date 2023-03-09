import { FilePondInitialFile } from 'filepond';

export const getUploaded = (photo: string): FilePondInitialFile[] => {
  if (photo) {
    return [
      {
        source: photo,
        options: {
          type: 'local',
          file: {
            name: photo.split('/').pop(),
            size: 1000000,
            type: photo.split('.').pop(),
          },
          metadata: {
            poster: photo,
          },
        },
      },
    ];
  }

  return [];
};
