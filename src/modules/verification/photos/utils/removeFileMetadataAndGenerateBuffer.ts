import { ActualFileObject } from 'filepond';

/**
 * Removes EXIF metadata from an image file and returns its contents as an ArrayBuffer.
 *
 * EXIF metadata can include a variety of fields such as camera settings, location
 * data, and image editing software information. Some applications, such as AWS WAF, may reject image files
 * that contain certain types of EXIF metadata.
 */
const removeFileMetadataAndGenerateBuffer = async (
  file: ActualFileObject
): Promise<ArrayBuffer> => {
  const arrayBuffer = await file.arrayBuffer();
  const dataView = new DataView(arrayBuffer);

  let offset = 0;
  while (offset < dataView.byteLength) {
    const marker = dataView.getUint16(offset, false);
    offset += 2;

    if (marker === 0xffe1) {
      const length = dataView.getUint16(offset, false);
      offset += 2;

      if (offset + length > dataView.byteLength) {
        break;
      }

      if (
        String.fromCharCode(dataView.getUint8(offset)) === 'E' &&
        String.fromCharCode(dataView.getUint8(offset + 1)) === 'x' &&
        String.fromCharCode(dataView.getUint8(offset + 2)) === 'if' &&
        String.fromCharCode(dataView.getUint8(offset + 3)) === '\0'
      ) {
        return new ArrayBuffer(offset + 2 + length - 10);
      }

      offset += length - 2;
    } else {
      const length = dataView.getUint16(offset, false);
      offset += length - 2;
    }
  }

  return arrayBuffer;
};

export default removeFileMetadataAndGenerateBuffer;
