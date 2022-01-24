import { useRouter } from 'next/router';
import React from 'react';

import LicenseStateInput from './LicenseStateInput';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const LicenseToVin: React.FC = () => {
  const router = useRouter();
  const analyticsHandler = new AnalyticsHandler();

  return (
    <LicenseStateInput router={router} analyticsHandler={analyticsHandler} />
  );
};

export default LicenseToVin;
