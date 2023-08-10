import { ActualFileObject } from 'filepond';

const removeFileMetadataAndGenerateBuffer = async (
  file: ActualFileObject
): Promise<ArrayBuffer> => {
  let canvas: HTMLCanvasElement | undefined = undefined;
  let cleanObjectUrl: () => void = () => {
    // nothing
  };
  try {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    cleanObjectUrl = () => URL.revokeObjectURL(img.src);
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    ctx.drawImage(img, 0, 0);

    const newBlob = (await new Promise((resolve) => {
      if (!canvas) {
        resolve(null);
        return;
      }
      canvas.toBlob(resolve, 'image/jpeg', 1);
    })) as Blob | null;
    if (!newBlob) throw new Error('Could not generate new blob');

    return newBlob.arrayBuffer();
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    cleanObjectUrl();
    canvas?.remove();
  }
};

export default removeFileMetadataAndGenerateBuffer;
