import React from 'react';

const Link = (props) => {
  const { className, children, href, onClick, to, ...other } = props;

  const handleClick = (e) => {
    onClick(e);
  };

  // Extract pathname from whichever prop was passed.
  // The "to" prop can be either a string or an object.
  // If the object form of "to" was passed, pathname will
  // become the string passed as "to.pathname".
  const pathname = href || (to && to.pathname) || to;

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
