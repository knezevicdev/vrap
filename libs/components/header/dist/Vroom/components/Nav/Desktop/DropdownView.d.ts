import React from 'react';
export interface DropdownLink {
    href: string;
    IconComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
export interface Dropdown extends Props {
    type: 'dropdown';
}
interface Props {
    IconComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    label: string;
    links: DropdownLink[];
}
declare const DropdownView: React.FC<Props>;
export default DropdownView;
