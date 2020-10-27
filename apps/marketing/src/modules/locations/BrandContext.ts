import { Brand } from '@vroom-web/ui';
import { createContext } from 'react';

export const BrandContext = createContext<Brand>(Brand.TDA);
