import { CatSDK } from '@vroom-web/cat-sdk';
import React, { createContext, useContext } from 'react';

export const CatSDKContext = createContext<CatSDK>(new CatSDK());
