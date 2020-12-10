import React from 'react';
import { Link } from '../../../../foundation/Typography';
interface Link {
    href: string;
    name: string;
}
interface Section {
    title: string;
    links: Link[];
}
interface Props {
    sections: Section[];
}
export declare const MobileLinks: React.FC<Props>;
export {};
