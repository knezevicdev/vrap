import axios from 'axios';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import useVerificationStore from '../../../../../store/store';

const { publicRuntimeConfig } = getConfig();

const useSubmitDropoffConfirmation = () => {
  const router = useRouter();

  const shouldCallZapier = useMemo(() => {
    return publicRuntimeConfig.SHOULD_CALL_ZAPIER || router.query.callZapier;
  }, [router.query.callZapier]);

  return () => {
    if (!shouldCallZapier) return;

    const {
      pickupContactFirstName,
      pickupContactLastName,
      pickupCity,
      pickupState,
      pickupContactEmail,
      pickupContactPhoneNumber,
      priceId,
      vin,
    } = useVerificationStore.getState();

    const currentDate = new Date();
    const formattedDate = `${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')}-${currentDate.getFullYear()}`;

    axios
      .post('/appraisal/api/zapier-suyc', {
        vin: vin,
        firstName: pickupContactFirstName,
        lastName: pickupContactLastName,
        email: pickupContactEmail,
        phone: pickupContactPhoneNumber,
        city: pickupCity,
        state: pickupState,
        priceId: priceId,
        date: formattedDate,
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export default useSubmitDropoffConfirmation;
