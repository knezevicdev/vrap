/// <reference types="node" />
import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';
export declare enum Brand {
    VROOM = "vroom",
    SANTANDER = "santander",
    TDA = "tda"
}
export interface RequestContext {
    req?: IncomingMessage;
    query: ParsedUrlQuery;
}
export declare const determineWhitelabel: (ctx: RequestContext) => Brand;
