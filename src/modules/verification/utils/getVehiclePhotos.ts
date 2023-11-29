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
  const apiOverride = publicRuntimeConfig.ICO_DASH_OVERRIDE;
  const url = `${
    publicRuntimeConfig.ICO_DASH_URL
  }/api/appraisal-photos?vin=${vin}${
    apiOverride ? `&apiOverride=${apiOverride}` : ''
  }`;
  const headers: Record<string, string> = {
    accept: 'application/json, text/plain, */*',
    authorization: publicRuntimeConfig.ICO_DASH_AUTH,
  };

  let data: ImagesResponse;

  try {
    const response = await fetch(url, {
      headers,
      body: null,
      method: 'POST',
      mode: 'cors',
    });
    data = await response.json();
  } catch (e) {
    return {};
  }

  return data
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
