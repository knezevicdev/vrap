import styled from 'styled-components';

interface WrapperProps {
  checked: boolean;
  hasDescription?: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  > span {
    width: 100%;
  }

  label {
    display: flex;
    width: 100%;
    border: 1px solid #979797;
    border-radius: 4px;
    padding: 14px;
    position: relative;
  }

  label span {
    font-family: Calibre-Semibold, sans-serif;
    font-size: 16px;
    position: relative;
    ${({ hasDescription }) =>
      hasDescription &&
      `
      top: -7px;
    `}
    z-index: 1;
  }

  label::before {
    background-color: ${({ checked }) => (checked ? '#E71321' : '#f5f5f5')};
    border-color: #979797;
    border-radius: 4px;
    min-width: 22px;
    min-height: 22px;
    max-width: 22px;
    max-height: 22px;
  }
`;

export const Description = styled.p`
  color: #737373;
  font-family: Calibre, sans-serif;
  margin: 0;
  font-size: 14px;
  text-align: left;
  line-height: 1.71;
  letter-spacing: 0.3px;
  position: absolute;
  left: 44px;
  bottom: 6px;
  z-index: 0;
  user-select: none;
`;
