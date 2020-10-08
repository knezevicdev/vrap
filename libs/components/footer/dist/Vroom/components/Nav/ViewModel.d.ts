import NavStore from './store';
interface Link {
    href: string;
    label: string;
    target?: string;
    rel?: string;
}
interface Section {
    title: string;
    links: Link[];
}
declare class NavigationViewModel {
    private store;
    constructor(store: NavStore);
    private getPhoneNumberLinkData;
    links(): Section[];
}
export default NavigationViewModel;
