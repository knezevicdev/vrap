import { ParsedUrlQuery } from 'querystring';
import { createContext } from 'react';

export const QueryContext = createContext<ParsedUrlQuery>({});
