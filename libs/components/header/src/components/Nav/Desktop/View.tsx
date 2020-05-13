import { styled } from '@material-ui/core/styles';
import React from 'react';

import DropdownView, { Dropdown } from './DropdownView';
import LinkView, { Link } from './LinkView';

export type Links = (Dropdown | Link)[];

interface Props {
  links?: Links;
}

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  '& > *:not(:first-child)': {
    marginLeft: theme.spacing(3),
  },
}));

const DesktopView: React.FC<Props> = ({ links }) => {
  if (!links) {
    return null;
  }
  const linksJsx = links.map((link, index) => {
    if (link.type === 'link') {
      const { href, IconComponent, label, onClick } = link as Link;
      return (
        <LinkView
          key={index}
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
          key={index}
          IconComponent={IconComponent}
          label={label}
          links={links}
        />
      );
    }
    return null;
  });
  return <StyledDiv>{linksJsx}</StyledDiv>;
};

export default DesktopView;
