import Collapse from '@material-ui/core/Collapse';
import { styled } from '@material-ui/core/styles';
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

const StyledDiv = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  cursor: 'pointer',
}));

const IconLabelAndArrow = styled('span')(() => ({
  display: 'flex',
  alignItems: 'baseline',
  '& > svg:not(.dropdown-arrow)': {
    alignSelf: 'center',
    width: '16px',
    height: '16px',
    marginRight: '4px',
  },
  '& > svg.dropdown-arrow': {
    marginLeft: 'auto',
  },
}));

const StyledArrowSvg = styled(ArrowSvg)(({ theme }) => ({
  width: '12px',
  height: '12px',
  marginLeft: '4px',
  color: theme.palette.grey[800],
}));

const StyledAnchor = styled('a')(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginTop: theme.spacing(2),
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
  const [expanded, setExpaned] = React.useState<boolean>(false);
  const handleClick = (): void => {
    setExpaned(!expanded);
  };
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
    <StyledDiv onClick={handleClick}>
      <IconLabelAndArrow>
        {IconComponent && <IconComponent />}
        <Typography
          letterSpacing="1.25px"
          variant="button"
          fontWeight="fontWeightSemibold"
        >
          {label}
        </Typography>
        <StyledArrowSvg
          className="dropdown-arrow"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
        />
      </IconLabelAndArrow>
      <Collapse in={expanded}>{linksJsx}</Collapse>
    </StyledDiv>
  );
};

export default DropdownView;
