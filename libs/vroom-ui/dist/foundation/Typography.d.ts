import React from 'react';
export declare const Heading: {
    One: import("styled-components").StyledComponent<"h1", any, {}, never>;
    Two: import("styled-components").StyledComponent<"h2", any, {}, never>;
    Three: import("styled-components").StyledComponent<"h3", any, {}, never>;
    Four: import("styled-components").StyledComponent<"h4", any, {}, never>;
};
export declare const Title: {
    One: import("styled-components").StyledComponent<"span", any, {}, never>;
    Two: import("styled-components").StyledComponent<"span", any, {}, never>;
    Three: import("styled-components").StyledComponent<"span", any, {}, never>;
};
export declare const Body: {
    Regular: import("styled-components").StyledComponent<"span", any, {
        bold?: boolean | undefined;
    }, never>;
    Small: import("styled-components").StyledComponent<"span", any, {
        bold?: boolean | undefined;
    }, never>;
};
export declare const Fine: import("styled-components").StyledComponent<"span", any, {
    bold?: boolean | undefined;
}, never>;
export interface LinkProps {
    className?: string;
    children: string | JSX.Element;
    href: string;
    blank?: boolean;
}
export declare const Link: React.FC<LinkProps>;
declare const Typography: {
    Heading: {
        One: import("styled-components").StyledComponent<"h1", any, {}, never>;
        Two: import("styled-components").StyledComponent<"h2", any, {}, never>;
        Three: import("styled-components").StyledComponent<"h3", any, {}, never>;
        Four: import("styled-components").StyledComponent<"h4", any, {}, never>;
    };
    Title: {
        One: import("styled-components").StyledComponent<"span", any, {}, never>;
        Two: import("styled-components").StyledComponent<"span", any, {}, never>;
        Three: import("styled-components").StyledComponent<"span", any, {}, never>;
    };
    Body: {
        Regular: import("styled-components").StyledComponent<"span", any, {
            bold?: boolean | undefined;
        }, never>;
        Small: import("styled-components").StyledComponent<"span", any, {
            bold?: boolean | undefined;
        }, never>;
    };
    Fine: import("styled-components").StyledComponent<"span", any, {
        bold?: boolean | undefined;
    }, never>;
    Link: React.FC<LinkProps>;
};
export default Typography;
