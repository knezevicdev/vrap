import React from 'react';
export interface Link extends Props {
    type: 'link';
}
interface Props {
    href: string;
    IconComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
declare const LinkView: React.FC<Props>;
export default LinkView;
