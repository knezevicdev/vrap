import { isErrorResponse } from '@vroom-web/networking';

import { getCarstoryTrimFeatures } from '../../../../../networking/request';
import { AppraisalStore } from '../../../../../store/appraisalStore';

const useGetTrimFeatures = (appraisalStore: AppraisalStore) => {
  return async (trimId: number, captchaToken: string | null): Promise<any> => {
    try {
      const response = await getCarstoryTrimFeatures(trimId, captchaToken);
      if (isErrorResponse(response)) throw response;
      const { dataProviderInfo } = response.data;

      const features = dataProviderInfo.carstory
        ? dataProviderInfo.carstory.features
        : [];

      appraisalStore.setVehicleFeatureData({
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
