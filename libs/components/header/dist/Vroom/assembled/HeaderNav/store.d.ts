declare class HeaderNavStore {
    private static authTokenCookieName;
    private static phoneNumberCookieName;
    phoneNumber?: string;
    loggedIn: boolean;
    name?: string;
    queryString: string;
    private initQueryStringClientSide;
    private initAuthTokenClientSide;
    private initPhoneNumberClientSide;
    initClientSide: () => void;
    signOut: () => void;
}
export default HeaderNavStore;
