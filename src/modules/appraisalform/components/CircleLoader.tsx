import { addStyleForMobile } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

interface Props {
  isLoading: boolean;
  className?: string;
}

export const CircleLoader: React.FC<Props> = ({
  isLoading = false,
  className,
}) => {
  return (
    <CirlceLoader
      className={['circle-loader', className, isLoading ? '' : 'load-complete']
        .filter((el) => el)
        .join(' ')}
      data-qa="CircleLoaderComponent"
    >
      <div className="checkmark draw" />
    </CirlceLoader>
  );
};

const CirlceLoader = styled.div`
  width: 18px;
  height: 18px;
  margin-bottom: 18px/2;
  display: inline-block;
  position: absolute;
  top: 33px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-left-color: #00a34c;
  animation: loader-spin 1s infinite cubic-bezier(0.35, 0.81, 0.83, 0.67);
  vertical-align: top;
  border-radius: 50%;

  &.vin-input {
    right: 7px;

    ${addStyleForMobile(`
      right: 17px;
    `)}
  }

  &.trim-input {
    right: 32px;

    ${addStyleForMobile(`
      right: 43px;
    `)}
  }

  .checkmark {
    display: none;

    &.draw:after {
      animation-duration: 800ms;
      animation-timing-function: ease;
      animation-name: checkmark;
      transform: scaleX(-1) rotate(135deg);
    }

    &:after {
      height: 8px;
      width: 5px;
      position: absolute;
      top: 8px;
      left: 3.5px;
      border-right: 1px solid #00a34c;
      border-top: 1px solid #00a34c;
      content: '';
      transform-origin: left top;
      opacity: 1;
    }
  }

  &.load-complete {
    animation: none;
    border-color: #00a34c;
    transition: border 500ms ease-in-out;

    .checkmark {
      display: inline-block;
    }
  }

  @keyframes loader-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes checkmark {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }

    20% {
      width: 5px;
      height: 0;
      opacity: 1;
    }

    40% {
      width: 5px;
      height: 8px;
      opacity: 1;
    }

    100% {
      width: 5px;
      height: 8px;
      opacity: 1;
    }
  }
`;

export default CircleLoader;
