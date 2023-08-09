import { ActualFileObject } from 'filepond';

const removeFileMetadataAndGenerateBase64 = async (
  file: ActualFileObject
): Promise<string> => {
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

    return canvas.toDataURL('image/jpeg', 1);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    cleanObjectUrl();
    canvas?.remove();
  }
};

export default removeFileMetadataAndGenerateBase64;
