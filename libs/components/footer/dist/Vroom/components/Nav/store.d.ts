import { CatData } from '@vroom-web/cat-sdk';
declare class NavStore {
    private readonly catSDK;
    catData: CatData | undefined;
    get phoneNumber(): string | undefined;
    queryString: string;
    private initQueryStringClientSide;
    setCatData: (catData: CatData) => void;
    private catDataEventListener;
    initClientSide: () => void;
    tearDownClientSide: () => void;
}
export default NavStore;
