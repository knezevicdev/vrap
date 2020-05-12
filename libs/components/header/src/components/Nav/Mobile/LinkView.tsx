import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';
export interface Link extends Props {
  type: 'link';
}

interface Props {
  href: string;
  IconComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const StyledAnchor = styled('a')(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  // TODO: style based on the MUI theme.
  color: 'inherit',
  textDecoration: 'none',
  display: 'flex',
  '&:visited': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  '&:active': {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

const LinkView: React.FC<Props> = ({ href, IconComponent, label, onClick }) => {
  return (
    <StyledAnchor href={href} onClick={onClick}>
      {IconComponent && <IconComponent />}
      <Typography variant="caption" fontWeight="fontWeightSemibold">
        {label}
      </Typography>
    </StyledAnchor>
  );
};

export default LinkView;
