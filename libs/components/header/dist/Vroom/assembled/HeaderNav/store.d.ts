import { CatData } from '@vroom-web/cat-sdk';
declare class HeaderNavStore {
    private static authTokenCookieName;
    private readonly catSDK;
    catData: CatData | undefined;
    get phoneNumber(): string | undefined;
    loggedIn: boolean;
    name?: string;
    queryString: string;
    private initQueryStringClientSide;
    private initAuthTokenClientSide;
    setCatData: (catData: CatData) => void;
    catDataEventListener: (catDataEvent: CustomEvent<CatData>) => void;
    initClientSide: () => void;
    tearDownClientSide: () => void;
    signOut: () => void;
}
export default HeaderNavStore;
