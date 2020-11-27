import React, { FC } from 'react';
import styled from 'styled-components';

const ErrorIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 13 13"
    id="error"
    width="13"
    height="13"
    fill="#58595b"
  >
    <g fill="none" fillRule="evenodd">
      <circle cx="6.5" cy="6.5" r="6" stroke="#f26900"></circle>
      <path
        fill="#f26900"
        d="M5.611 10.235h1.766V8.373H5.611v1.862zM7.01 7.443l-.997.215-.53-4.893h2.036l-.51 4.678z"
      ></path>
    </g>
  </svg>
);

interface WrappedErrorIcon {
  label: string;
}

const WrappedErrorIcon = styled(ErrorIcon)<WrappedErrorIcon>`
  position: absolute;
  right: 10px;
  top: ${({ label }): string => (label ? '37px' : '15px')};
`;

export default WrappedErrorIcon;
