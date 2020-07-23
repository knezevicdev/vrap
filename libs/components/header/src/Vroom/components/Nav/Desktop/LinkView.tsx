import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

export interface Link extends Props {
  type: 'link';
}

interface Props {
  href: string;
  IconComponent?: React.ComponentType;
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const StyledAnchor = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  color: 'inherit',
  textDecoration: 'none',
  '&:visited': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '&:hover': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '&:active': {
    color: 'inherit',
    textDecoration: 'none',
  },
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

const IconAndLabel = styled('div')(() => ({
  display: 'flex',
  alignItems: 'baseline',
  '& > svg': {
    alignSelf: 'center',
    width: '16px',
    height: '16px',
  },
  '& > :not(:first-child)': {
    marginLeft: '4px',
  },
}));

const LinkView: React.FC<Props> = ({ href, IconComponent, label, onClick }) => {
  return (
    <StyledAnchor href={href} onClick={onClick}>
      <IconAndLabel>
        {IconComponent && <IconComponent />}
        {label && (
          <Typography
            letterSpacing="1.25px"
            variant="button"
            fontWeight="fontWeightSemibold"
          >
            {label}
          </Typography>
        )}
      </IconAndLabel>
    </StyledAnchor>
  );
};

export default LinkView;
