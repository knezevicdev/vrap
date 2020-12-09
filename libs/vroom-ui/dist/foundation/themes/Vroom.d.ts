import { ThemeProps } from './types';
export declare const getVroomTheme: (fontPath: string) => ThemeProps;
export declare const addStyleForMobile: (injectedCss: string) => import("styled-components").FlattenSimpleInterpolation;
export declare const addStyleForTablet: (injectedCss: string) => import("styled-components").FlattenSimpleInterpolation;
export declare const addStyleForDesktop: (injectedCss: string) => import("styled-components").FlattenSimpleInterpolation;
export declare const GlobalStyle: import("styled-components").GlobalStyleComponent<{
    theme: ThemeProps;
}, import("styled-components").DefaultTheme>;
