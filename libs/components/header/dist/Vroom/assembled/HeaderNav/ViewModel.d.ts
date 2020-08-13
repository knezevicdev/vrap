import { DesktopLinks, MobileLinks } from '../../components/Nav';
import HeaderNavStore from './store';
declare class HeaderNavViewModel {
    private store;
    private analyticsHandler;
    constructor(store: HeaderNavStore);
    handleMount(): void;
    private handleSignOutClick;
    private getPhoneNumberLinkData;
    private getAccountLabel;
    desktopLinks(): DesktopLinks;
    mobileLinks(): MobileLinks;
}
export default HeaderNavViewModel;
