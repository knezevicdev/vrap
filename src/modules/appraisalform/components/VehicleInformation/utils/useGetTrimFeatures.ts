import { isErrorResponse } from '@vroom-web/networking';

import { getCarstoryTrimFeatures } from '../../../../../networking/request';
import useAppraisalStore from '../../../../../store/appraisalStore';

const useGetTrimFeatures = () => {
  return async (trimId: number, captchaToken: string | null): Promise<any> => {
    try {
      const response = await getCarstoryTrimFeatures(trimId, captchaToken);
      if (isErrorResponse(response)) throw response;
      const { dataProviderInfo } = response.data;

      const features = dataProviderInfo.carstory
        ? dataProviderInfo.carstory.features
        : [];

      useAppraisalStore.getState().setVehicleFeatureData({
        features,
      });

      return {
        features,
      };
    } catch (error) {
      return error;
    }
  };
};

export default useGetTrimFeatures;
