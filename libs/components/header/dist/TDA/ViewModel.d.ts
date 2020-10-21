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
    readonly logoLink: Link;
    readonly navLinks: Link[];
    isDrawerOpen: () => boolean;
    onDrawerClick: () => void;
    private closeDrawer;
    private openDrawer;
}
export default ViewModel;
