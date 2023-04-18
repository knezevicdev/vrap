import axios from 'axios';
import getConfig from 'next/config';

import { DocumentFileType } from '../../photos/utils/uploadVehiclePhoto';

const { publicRuntimeConfig } = getConfig();

type ImagesResponse = {
  name: string;
  timestamp: number;
  uploaderType: 'verification' | 'vip';
}[];

const getVehiclePhotos = async (
  vin: string,
  priceId: string
): Promise<Partial<Record<DocumentFileType, string>>> => {
  const url = `/appraisal/api/photos/${vin}`;
  const response = await axios.post<ImagesResponse>(url);

  return response.data
    .filter((image) => image.name.startsWith(priceId))
    .reduce((res, image) => {
      const type = image.name.replace(/\.[^/.]+$/, '').split('-')[1];

      return {
        ...res,
        [type]: `${publicRuntimeConfig.VAST_IMAGE_PROXY_URL}/${vin}/verification/${image.name}`,
      };
    }, {}) as Partial<Record<DocumentFileType, string>>;
};

export default getVehiclePhotos;
