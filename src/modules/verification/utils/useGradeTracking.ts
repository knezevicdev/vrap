import { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import AnalyticsHandler from '../../../integrations/AnalyticsHandler';
import useVerificationStore from '../store/store';

function useGradeTracking(analyticsHandler: AnalyticsHandler) {
  const { vin, email, grade } = useVerificationStore(
    (state) => ({
      vin: state.vin,
      email: state.offerEmail,
      grade: state.offerGrade,
    }),
    shallow
  );

  useEffect(() => {
    if (!grade) return;

    if (grade.toLowerCase() === 'retail') {
      analyticsHandler.trackRetailVerification(vin, email);
    }

    if (grade.toLowerCase() === 'wholesale') {
      analyticsHandler.trackWholesaleVerification(vin, email);
    }
  }, [analyticsHandler, email, grade, vin]);
}

export default useGradeTracking;
