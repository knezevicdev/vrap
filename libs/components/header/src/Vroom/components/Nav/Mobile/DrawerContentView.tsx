import React from 'react';

import DropdownView, { Dropdown } from './DropdownView';
import LinkView, { Link } from './LinkView';

export type Links = (Dropdown | Link)[];

interface Props {
  links?: Links;
}

const DrawerContentView: React.FC<Props> = ({ links }) => {
  if (!links) {
    return null;
  }
  const linksJsx = links.map((link) => {
    if (link.type === 'link') {
      const { href, IconComponent, label, onClick } = link as Link;
      return (
        <LinkView
          key={label}
          href={href}
          IconComponent={IconComponent}
          label={label}
          onClick={onClick}
        />
      );
    } else if (link.type === 'dropdown') {
      const { IconComponent, label, links } = link as Dropdown;
      return (
        <DropdownView
          key={label}
          IconComponent={IconComponent}
          label={label}
          links={links}
        />
      );
    }
    return null;
  });
  return <>{linksJsx}</>;
};

export default DrawerContentView;
