import { isErrorResponse } from '@vroom-web/networking';

import { getGradeCheck } from '../../../../../networking/request';
import useAppraisalStore from '../../../../../store/appraisalStore';

const useGradeCheck = () => {
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

      useAppraisalStore.getState().setGradeCheck(response.data);

      return response.data;
    } catch (error) {
      return error;
    }
  };
};

export default useGradeCheck;
