export interface Link {
    href: string;
    name: string;
}
export interface Section {
    title: string;
    links: Link[];
}
export interface FooterProps {
    sections: Section[];
}
