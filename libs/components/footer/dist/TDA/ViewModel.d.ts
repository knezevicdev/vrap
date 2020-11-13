interface Link {
    linkToVroom: boolean;
    href?: string;
    label: string;
    target?: string;
    rel?: string;
    handleAnalytics: () => void;
}
declare class ViewModel {
    constructor(vroomUrl?: string);
    readonly TDAQueryString: string;
    private analyticsHandler;
    readonly links: Link[];
    readonly disclaimer = "Copyright \u00A9 2020 Vroom.";
}
export default ViewModel;
