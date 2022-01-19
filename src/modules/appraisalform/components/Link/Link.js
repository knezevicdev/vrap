import React from 'react';
import { NavLink } from 'react-router-dom';

import { PATHS } from '../../constants/routes';
import { trackSearch } from '../../lib/analytics/search';
import { track } from '../../lib/AnalyticsLib';
import { appRouteExists } from '../../routes';

const Link = (props) => {
  const {
    activeClassName,
    className,
    children,
    href,
    linkAnalytics,
    onClick,
    to,
    label,
    ...other
  } = props;

  const onNavLinkClick = (e) => {
    window.scrollTo(0, 0);
    handleClick(e);
  };

  const handleClick = (e) => {
    const linkLabel =
      label || typeof children === 'string' ? children.toLowerCase() : '';
    const analyticsData = {
      linkLabel,
      ...linkAnalytics,
    };
    const { action } = linkAnalytics;
    if (action === 'Autocomplete' || action === 'Free Form') {
      trackSearch({ eventName: 'interaction - Search', ...analyticsData });
    } else if (Object.keys(linkAnalytics).length > 0) {
      track({ ...analyticsData });
    }
    onClick(e);
  };

  // Extract pathname from whichever prop was passed.
  // The "to" prop can be either a string or an object.
  // If the object form of "to" was passed, pathname will
  // become the string passed as "to.pathname".
  const pathname = href || (to && to.pathname) || to;
  if (
    pathname != null &&
    appRouteExists(pathname) &&
    pathname !== PATHS.home.prefix
  ) {
    // Note: "pathname" is NOT what we want to pass as the "to" prop for the NavLink.
    // In the step above, we lost any extra data passed as part of the
    // object form of the "to" prop.
    const navLinkTo = href || to;
    return (
      <NavLink
        activeClassName={activeClassName}
        className={className}
        onClick={onNavLinkClick}
        to={navLinkTo}
        name="LinkComponent"
        {...other}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <a
      className={className}
      href={pathname}
      onClick={handleClick}
      name="LinkComponent"
      {...other}
    >
      {children}
    </a>
  );
};

export default Link;
