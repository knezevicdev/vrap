import { styled } from '@material-ui/core/styles';
import React from 'react';

import { ReactComponent as LogoSvg } from '../svg/logo.svg';

const StyledAnchor = styled('a')(() => ({
  color: 'inherit',
  display: 'inline-flex',
}));

const StyledLogoSvg = styled(LogoSvg)(({ theme }) => ({
  width: '104px',
  height: '17px',
  [theme.breakpoints.up('md')]: {
    width: '116px',
    height: '20px',
  },
}));

interface Props {
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
}

const Logo: React.FC<Props> = ({ className, href, onClick, style }) => {
  return (
    <StyledAnchor
      className={className}
      href={href ? href : '/'}
      onClick={onClick}
      style={style}
    >
      <StyledLogoSvg />
    </StyledAnchor>
  );
};

export default Logo;
