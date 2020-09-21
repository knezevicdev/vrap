import React from 'react';
import { ThemeProps } from '../themes/types';
interface Props {
    theme: ThemeProps;
}
export declare class Hero {
    static One: import("styled-components").StyledComponent<"h1", any, Props, never>;
    static Two: import("styled-components").StyledComponent<"h2", any, Props, never>;
    static Three: import("styled-components").StyledComponent<"h3", any, Props, never>;
    static Four: import("styled-components").StyledComponent<"h4", any, Props, never>;
}
export declare class Title {
    static One: import("styled-components").StyledComponent<"span", any, Props, never>;
    static Two: import("styled-components").StyledComponent<"span", any, Props, never>;
    static Three: import("styled-components").StyledComponent<"span", any, Props, never>;
}
export declare class Body {
    static Regular: import("styled-components").StyledComponent<"span", any, Props, never>;
    static Small: import("styled-components").StyledComponent<"span", any, Props, never>;
    static Fine: import("styled-components").StyledComponent<"span", any, Props, never>;
}
export interface LinkProps {
    className?: string;
    children: string;
    href: string;
    blank?: boolean;
}
export declare const Link: React.FC<LinkProps>;
export {};
