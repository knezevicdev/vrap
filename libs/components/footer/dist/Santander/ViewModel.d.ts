interface Link {
    href?: string;
    label: string;
    target?: string;
    rel?: string;
    handleAnalytics: () => void;
}
interface Section {
    title: Link;
    links: Link[];
}
declare class ViewModel {
    private analyticsHandler;
    readonly vroomUrl: string;
    readonly sections: Section[];
    readonly utmParams: string;
    constructor(vroomUrl?: string);
    readonly copyrightLabel = "\u00A9 2020 Santander Consumer USA Inc. and its Licensors. All Rights Reserved.";
    readonly copyrightLink: Link;
    readonly poweredBy = "Powered by";
    readonly disclaimer = "Vehicle marketing, inventory, sales and the car-buying transaction are performed, hosted, managed and/or coordinated by Vroom. Santander Consumer USA Inc., its subsidiaries or affiliates are not responsible for the transaction, the outcome of the transaction or any information provided therein, provided that if Santander Consumer is chosen as the lender to finance the vehicle purchase, the financing will be performed by Santander Consumer.";
}
export default ViewModel;
