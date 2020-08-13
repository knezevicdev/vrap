interface Link {
    href?: string;
    label: string;
    target?: string;
    rel?: string;
}
interface Section {
    title: Link;
    links: Link[];
}
declare class ViewModel {
    readonly sections: Section[];
    readonly copyrightLabel = "\u00A9 2020 Santander Consumer USA Inc. and its Licensors. All Rights Reserved.";
    readonly copyrightLink: {
        label: string;
        href: string;
        target: string;
    };
    readonly trademark = "Chrysler Capital is a registered trademark of FCA US LLC and licensed to Santander Consumer USA Inc. Chrysler, Dodge, Jeep, Ram, Mopar and SRT are registered trademarks of FCA US LLC. ALFA ROMEO and FIAT are registered trademarks of FCA Group Marketing S.p.A., used with permission.";
    readonly poweredBy = "Powered by";
}
export default ViewModel;
