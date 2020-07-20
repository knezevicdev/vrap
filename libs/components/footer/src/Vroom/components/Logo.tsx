/* eslint-disable @typescript-eslint/camelcase */
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { parse, stringify } from 'qs';
import React, { useEffect, useState } from 'react';

import { ReactComponent as LogoSvg } from '../svg/logo.svg';

const StyledAnchor = styled('a')(() => ({
  color: 'inherit',
  display: 'inline-flex',
}));

const StyledLogoSvg = styled(LogoSvg)(({ theme }) => ({
  width: '140px',
  height: '24px',
  color: theme.palette.text.secondary,
}));

interface Props {
  className?: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
}

const Logo: React.FC<Props> = ({ className, href, onClick, style }) => {
  // FIT-566
  // As a stopgap, the we persist certain query params across navigation.
  // This is so that vlassic attribution works until we build a better system.
  const [queryString, setQueryString] = useState('');
  useEffect(() => {
    const query = parse(window.location.search, { ignoreQueryPrefix: true });
    const picked = (({
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }): any => ({
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
    }))(query);
    const newQueryString = stringify(picked, { addQueryPrefix: true });
    setQueryString(newQueryString);
  }, []);

  return (
    <StyledAnchor
      className={className}
      href={href ? href : `/${queryString}`}
      onClick={onClick}
      style={style}
    >
      <StyledLogoSvg />
      <Typography variant="srOnly">Home</Typography>
    </StyledAnchor>
  );
};

export default Logo;
