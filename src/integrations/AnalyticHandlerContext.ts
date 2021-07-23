import { createContext } from 'react';

import AnalyticsHandler from './AnalyticsHandler';

export const AnalyticsHandlerContext = createContext<AnalyticsHandler>(
  new AnalyticsHandler()
);
