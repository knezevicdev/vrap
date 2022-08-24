import { isErrorResponse } from '@vroom-web/networking';
import { useEffect, useRef } from 'react';

import calculateRequiredDocuments, {
  CalculateRequiredDocuments,
} from '../../shared/utils/calculateRequiredDocuments';

import { useAppStore } from 'src/context';
import { Verification } from 'src/networking/models/Price';
import { DocumentInfo } from 'src/networking/models/Verification';
import { getVerificationDetails } from 'src/networking/request';

interface UseVerificationDetails {
  verificationDetails?: Verification;
  verificationDocuments?: DocumentInfo[];
  requiredDocuments: CalculateRequiredDocuments;
  documentsValid: boolean;
}

const useVerificationDetails = (priceId: string): UseVerificationDetails => {
  const { store } = useAppStore();
  const lastPriceId = useRef<string>();

  useEffect(() => {
    if (lastPriceId.current !== priceId) {
      store.verification.setLoading(true);
      lastPriceId.current = priceId;
      getVerificationDetails(priceId)
        .then((response) => {
          if (isErrorResponse(response)) {
            store.verification.setIsExpiredOrErrored(true);
            return;
          }
          store.verification.getVerificationDetail(
            response.data.data,
            localStorage.getItem('lastFour') || store.verification.lastFourSSN
          );
        })
        .catch((e) => console.error('Error while fetching verification', e))
        .finally(() => {
          store.verification.setLoading(false);
        });
    }
  }, [priceId, store.verification]);

  const verificationDetails = store.verification.verificationDetail;
  const requiredDocuments = calculateRequiredDocuments(
    verificationDetails,
    store.verification.whereIsVehicleRegistered
  );

  const documentsValid = Boolean(
    verificationDetails?.front_of_driver_license_file_id &&
      verificationDetails.current_registration_file_id &&
      verificationDetails.mileage_file_id &&
      (requiredDocuments.secondDriverLicense
        ? verificationDetails.second_owner_front_of_driver_license_file_id
        : true) &&
      (requiredDocuments.titleInfo
        ? verificationDetails.front_of_title_lien_file_id &&
          verificationDetails.back_of_title_lien_file_id
        : true)
  );

  return {
    verificationDetails,
    verificationDocuments: store.verification.documents,
    requiredDocuments,
    documentsValid,
  };
};

export default useVerificationDetails;
