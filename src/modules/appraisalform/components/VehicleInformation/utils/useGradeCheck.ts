import { isErrorResponse } from '@vroom-web/networking';

import { getGradeCheck } from '../../../../../networking/request';
import { AppraisalStore } from '../../../../../store/appraisalStore';

const useGradeCheck = (appraisalStore: AppraisalStore) => {
  return async (
    make: string,
    model: string,
    trim: string,
    miles: number,
    vin: string
  ): Promise<any> => {
    try {
      const response = await getGradeCheck(make, model, trim, miles, vin);
      if (isErrorResponse(response)) throw response;

      appraisalStore.setGradeCheck(response.data);

      return response.data;
    } catch (error) {
      return error;
    }
  };
};

export default useGradeCheck;
