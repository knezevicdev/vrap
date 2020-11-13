import Store from './store';
interface Link {
    linkToVroom: boolean;
    href?: string;
    label?: string;
    target?: string;
    rel?: string;
    handleAnalytics: () => void;
}
declare class ViewModel {
    private readonly store;
    private analyticsHandler;
    constructor(store: Store, vroomUrl?: string);
    readonly TDAQueryString: string;
    readonly logoLink: Link;
    readonly navLinks: Link[];
    isDrawerOpen: () => boolean;
    onDrawerClick: () => void;
    private closeDrawer;
    private openDrawer;
}
export default ViewModel;
