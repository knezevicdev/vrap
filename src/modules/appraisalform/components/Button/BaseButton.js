import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from '../Link';

const BaseButtonLink = ({
  isStickyOnMobile,
  isHiddenOnMobile,
  disabled,
  buttonColor,
  ...other
}) => {
  return <Link {...other} />;
};

const BaseButton = styled(BaseButtonLink)`
  display: inline-flex;
  cursor: pointer;
  min-height: 45px;
  height: 45px; /* additional height to fix known bug with IE11 vertical align, FED-374 */
  padding: 0 18px;
  white-space: nowrap;
  ${(props) => props.theme.typography.h10('semibold')};
  letter-spacing: 1.75px;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  transition: color 0.1s, background-color 0.1s;
  ${(props) =>
    props.disabled &&
    `
      pointer-events: none;
      user-select: none;
  `};

  ${(props) =>
    props.isStickyOnMobile &&
    props.theme.addStylesFor({
      mobile: stickyButtonStyles,
    })}

  ${(props) =>
    props.isHiddenOnMobile &&
    props.theme.addStylesFor({
      mobile: 'display: none;',
    })}
`;

const stickyButtonStyles = `
  width: calc(100% - 40px);
  position: fixed;
  z-index: 1;
  bottom: 20px;
`;

BaseButtonLink.propTypes = {
  isStickyOnMobile: PropTypes.bool,
  isHiddenOnMobile: PropTypes.bool,
  buttonColor: PropTypes.string,
  disabled: PropTypes.bool,
};

export default BaseButton;
