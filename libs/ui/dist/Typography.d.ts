import React from 'react';
export declare type Variant = 'inherit' | 'h1' | 'h2' | 'body1' | 'button' | 'caption' | 'srOnly';
declare type WhiteSpace = 'inherit' | 'nowrap' | 'pre' | 'preline' | 'prewrap';
interface TypographyProps {
    children: React.ReactNode;
    className?: string;
    color?: string | object;
    component?: React.ElementType;
    display?: string | object;
    fontStyle?: string | object;
    fontWeight?: number | string | object;
    letterSpacing?: string | object;
    lineHeight?: string | object;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    textAlign?: string | object;
    variant?: Variant;
    whiteSpace?: WhiteSpace;
}
declare const Typography: React.FC<TypographyProps>;
export default Typography;
