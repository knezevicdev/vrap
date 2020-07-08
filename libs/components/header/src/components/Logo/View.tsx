/* eslint-disable @typescript-eslint/camelcase */
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { parse, stringify } from 'qs';
import React, { useEffect, useState } from 'react';

import { ReactComponent as LogoSvg } from '../../svg/logo.svg';
import ViewModel from './ViewModel';

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
  viewModel: ViewModel;
}

const Logo: React.FC<Props> = ({ viewModel }) => {
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

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    viewModel.handleLogoClick(event);
  };

  return (
    <StyledAnchor
      className={viewModel.className}
      href={`${viewModel.href}${queryString}`}
      onClick={handleClick}
    >
      <StyledLogoSvg />
      <Typography variant="srOnly">Home</Typography>
    </StyledAnchor>
  );
};

export default Logo;
