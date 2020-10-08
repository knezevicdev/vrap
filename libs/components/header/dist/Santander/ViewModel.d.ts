import Store from './store';
interface Link {
    href?: string;
    label?: string;
    target?: string;
    rel?: string;
    handleAnalytics: () => void;
}
declare class ViewModel {
    private readonly store;
    private analyticsHandler;
    constructor(store: Store);
    readonly shopNow: Link;
    readonly logoLink: Link;
    readonly financeCalculators: Link;
    readonly learningCenterLabel: string;
    readonly learningCenterLinks: Link[];
    readonly contactUs: Link;
    readonly backToCorporate: Link;
    readonly poweredBy = "Powered by";
    isDropdownOpen: () => boolean;
    isDrawerOpen: () => boolean;
    onDrawerClick: () => void;
    onDropdownClick: () => void;
    onClickAway: () => void;
    private closeDrawer;
    private openDrawer;
    private closeDropdown;
    private openDropdown;
}
export default ViewModel;
