interface Link {
    href?: string;
    label: string;
    target?: string;
    rel?: string;
    handleAnalytics: () => void;
}
declare class ViewModel {
    private analyticsHandler;
    readonly disclaimer = "Copyright \u00A9 2020 Vroom.";
    readonly links: Link[];
}
export default ViewModel;
