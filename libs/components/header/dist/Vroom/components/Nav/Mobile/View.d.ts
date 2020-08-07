import React from 'react';
import { Links as DrawerContentViewLinks } from './DrawerContentView';
export declare type Links = DrawerContentViewLinks;
interface Props {
    anchor?: 'bottom' | 'left' | 'right' | 'top';
    links?: Links;
    onClose?: () => void;
    onOpen?: () => void;
    open?: boolean;
}
declare const MobileView: React.FC<Props>;
export default MobileView;
