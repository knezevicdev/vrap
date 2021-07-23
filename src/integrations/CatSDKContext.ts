import { CatSDK } from '@vroom-web/cat-sdk';
import { createContext } from 'react';

export const CatSDKContext = createContext<CatSDK>(new CatSDK());
