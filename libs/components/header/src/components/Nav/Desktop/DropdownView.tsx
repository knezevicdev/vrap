import { styled, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import { ReactComponent as ArrowSvg } from '../../../svg/arrow.svg';

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

const LabelAndArrow = styled('span')(() => ({
  display: 'flex',
  alignItems: 'baseline',
  '& > svg:not(.dropdown-arrow)': {
    alignSelf: 'center',
    width: '16px',
    height: '16px',
    marginRight: '4px',
  },
}));

const StyledArrowSvg = styled(ArrowSvg)(({ theme }) => ({
  width: '8px',
  height: '8px',
  marginLeft: '4px',
  color: theme.palette.grey[800],
}));

const StyledSpan = styled('span')(({ theme }) => ({
  cursor: 'default',
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  '&:after': {
    content: '""',
    display: 'flex',
    width: '0px',
    height: '2px',
    margin: 'auto',
    marginTop: '4px',
    background: theme.palette.primary.main,
    transition: 'width 250ms ease, background-color 250ms ease',
  },
  '&:hover:after': {
    width: '100%',
  },
}));

const StyledTooltip = withStyles((theme) => ({
  arrow: {
    color: theme.palette.background.paper,
    '&::before': {
      position: 'absolute',
      top: '0',
      color: theme.palette.grey[400],
    },
    '&::after': {
      position: 'absolute',
      top: '1px',
      borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      borderWidth: '0 1em 1em 1em',
      width: '0',
      height: '0',
      margin: 'auto',
      content: '""',
      display: 'block',
      borderStyle: 'solid',
    },
  },
  tooltip: {
    borderRadius: '0px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: theme.spacing(3),
    '& > a:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
  },
}))(Tooltip);

const StyledAnchor = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  color: theme.palette.grey[600],
  textDecoration: 'none',
  '&:visited': {
    color: theme.palette.grey[600],
    textDecoration: 'none',
  },
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
  '&:active': {
    color: theme.palette.grey[600],
    textDecoration: 'none',
  },
  '& > svg': {
    width: '12px',
    height: '12px',
    marginRight: '4px',
    color: theme.palette.primary.main,
  },
}));

const DropdownView: React.FC<Props> = ({ IconComponent, label, links }) => {
  const linksJsx = links.map((link) => {
    const { href, IconComponent, label, onClick } = link;
    return (
      <StyledAnchor key={label} href={href} onClick={onClick}>
        {IconComponent && <IconComponent />}
        <Typography variant="button">{label}</Typography>
      </StyledAnchor>
    );
  });
  return (
    <StyledTooltip
      arrow
      interactive
      placement="bottom"
      // TODO: figure out how to keep tooltip mounted correctly.
      // This allows bots to more easily crawl the site,
      // but it does cause the dropdown to pop if you hover over the HIDDEN dropdown.
      // PopperProps={{
      //   keepMounted: true,
      // }}
      title={linksJsx} // "title" is oddly named, it means the tooltip content.
    >
      <StyledSpan>
        <LabelAndArrow>
          {IconComponent && <IconComponent />}
          <Typography variant="caption" fontWeight="fontWeightSemibold">
            {label}
          </Typography>
          <StyledArrowSvg className="dropdown-arrow" />
        </LabelAndArrow>
      </StyledSpan>
    </StyledTooltip>
  );
};

export default DropdownView;
