import React, { FC } from 'react';
import styled from 'styled-components';

const SuccessIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 13 13"
    id="checkmark-circle"
    width="13"
    height="13"
    fill="rgb(48, 132, 6)"
  >
    <g fillRule="evenodd">
      <path d="M6.5 1A5.506 5.506 0 0 0 1 6.5C1 9.532 3.467 12 6.5 12S12 9.532 12 6.5 9.533 1 6.5 1m0 12A6.508 6.508 0 0 1 0 6.5C0 2.916 2.916 0 6.5 0S13 2.916 13 6.5 10.084 13 6.5 13"></path>
      <path d="M6.017 9.56l-2.87-2.87.707-.707 2.13 2.13 3.147-3.45.739.673z"></path>
    </g>
  </svg>
);
interface WrappedSuccessIcon {
  label: string;
}
const WrappedSuccessIcon = styled(SuccessIcon)<WrappedSuccessIcon>`
  position: absolute;
  right: 10px;
  top: ${({ label }): string => (label ? '37px' : '15px')};
`;

export default WrappedSuccessIcon;
