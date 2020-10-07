import { CatData } from './types';
declare const CAT_DATA_EVENT_KEY = "oncatdata";
declare const WINDOW_CAT_DATA_KEY = "__CAT_DATA__";
declare global {
    interface Window {
        [WINDOW_CAT_DATA_KEY]: CatData;
    }
    interface WindowEventMap {
        [CAT_DATA_EVENT_KEY]: CustomEvent<CatData>;
    }
}
interface CatSDKOptions {
    serviceBasePath?: string;
}
declare class CatSDK {
    private serviceBasePath;
    constructor(options?: CatSDKOptions);
    private initUUID;
    getUUID(): string;
    initCatData(): Promise<void>;
    observeCatData(listener: (catDataEvent: CustomEvent<CatData>) => void): void;
    unobserveCatData(listener: (catDataEvent: CustomEvent<CatData>) => void): void;
}
export default CatSDK;
