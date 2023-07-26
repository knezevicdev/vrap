import axios from 'axios';
import getConfig from 'next/config';

import { DocumentFileType } from '../steps/VehiclePhotos/utils/uploadVehiclePhoto';

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
  const url = `${publicRuntimeConfig.ICO_DASH_URL}/api/appraisal-photos?vin=${vin}`;
  const headers: Record<string, string> = {};
  if (publicRuntimeConfig.ICO_DASH_AUTH) {
    headers.Authorization = publicRuntimeConfig.ICO_DASH_AUTH;
  }
  const response = await axios.post<ImagesResponse>(url, undefined, {
    headers,
  });

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
