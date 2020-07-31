import React from 'react';
import { Links as InnerDesktopLinks } from './Desktop';
import { Links as InnerMobileLinks } from './Mobile';
export declare type DesktopLinks = InnerDesktopLinks;
export declare type MobileLinks = InnerMobileLinks;
interface Props {
    desktopLinks: DesktopLinks;
    mobileAnchor?: 'bottom' | 'left' | 'right' | 'top';
    mobileLinks?: MobileLinks;
    mobileOpen?: boolean;
    onMobileOpen?: () => void;
    onMobileClose?: () => void;
}
declare const Nav: React.FC<Props>;
export default Nav;
