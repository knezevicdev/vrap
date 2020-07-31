import React from 'react';
import { Dropdown } from './DropdownView';
import { Link } from './LinkView';
export declare type Links = (Dropdown | Link)[];
interface Props {
    links?: Links;
}
declare const DrawerContentView: React.FC<Props>;
export default DrawerContentView;
