import { isErrorResponse } from '@vroom-web/networking';

import { getCarstoryVinDecode } from '../../../../../networking/request';
import { AppraisalStore } from '../../../../../store/appraisalStore';

const useGetVinDecode = (appraisalStore: AppraisalStore) => {
  return async (vehicleId: string, captchaToken: string): Promise<any> => {
    try {
      const response = await getCarstoryVinDecode(vehicleId, captchaToken);

      if (isErrorResponse(response)) throw response;
      let alternatives = [];
      let features = [];
      let id = null;
      let style = null;
      const { dataProviderInfo, vehicleInfo } = response.data;

      if (dataProviderInfo.carstory) {
        alternatives = dataProviderInfo.carstory.alternatives || [];
        features = dataProviderInfo.carstory.features || [];
        id = dataProviderInfo.carstory.id || null;
        style = dataProviderInfo.carstory.style || null;
      } else if (dataProviderInfo.nada) {
        alternatives = dataProviderInfo.nada.alternatives || [];
        features = dataProviderInfo.nada.features || [];
        id = dataProviderInfo.nada.id || null;
      }

      appraisalStore.setVehicleData({
        ...response.data.vehicleInfo,
        alternatives,
        features,
        style,
      });

      return {
        alternatives,
        features,
        style,
        exteriorColor: vehicleInfo.exteriorColor,
        year: vehicleInfo.year,
        make: vehicleInfo.make,
        model: vehicleInfo.model,
        trim: vehicleInfo.trim,
        subTrim: vehicleInfo.subTrim,
        vin: vehicleInfo.vin,
        id,
      };
    } catch (error) {
      return error;
    }
  };
};

export default useGetVinDecode;
