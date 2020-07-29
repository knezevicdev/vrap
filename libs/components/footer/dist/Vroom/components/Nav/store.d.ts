declare class NavStore {
    private static phoneNumberCookieName;
    phoneNumber?: string;
    queryString: string;
    private initQueryStringClientSide;
    private initPhoneNumberClientSide;
    initClientSide: () => void;
}
export default NavStore;
