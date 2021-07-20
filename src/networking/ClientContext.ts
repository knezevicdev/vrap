import { Client } from '@vroom-web/networking';
import getConfig from 'next/config';
import { createContext } from 'react';

const interchangeUrl =
  getConfig().publicRuntimeConfig.NEXT_PUBLIC_INTERCHANGE_URL || '';
const gqlUrl = interchangeUrl !== '' ? `${interchangeUrl}/gql` : '';

export const ClientContext = createContext<Client>(new Client(gqlUrl));
