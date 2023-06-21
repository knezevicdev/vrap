import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.698);
  z-index: 5;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const Modal = styled.div`
  max-width: 600px;
  max-height: 100%;
  width: 100%;
  padding: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-bottom: 4px solid #e7131a;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 0;
  align-items: center;
  overflow: auto;
  flex-direction: column;
  display: flex;
`;

export const CloseButton = styled.button`
  position: fixed;
  top: 8px;
  right: 8px;
  padding: 0;
  min-width: 44px;
  min-height: 44px;
  border: none;
  cursor: pointer;
  background: transparent;
`;
