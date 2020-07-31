import React from 'react';
interface Props {
    className?: string;
    href?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    style?: React.CSSProperties;
}
declare const Logo: React.FC<Props>;
export default Logo;
