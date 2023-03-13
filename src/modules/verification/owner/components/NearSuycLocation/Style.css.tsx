import {
  Button as UIButton,
  Link as UILink,
  Typography,
} from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  z-index: 9999999;
`;

export const Dialog = styled.div`
  width: calc(100% - 64px);
  max-width: 600px;
  display: flex;
  max-height: calc(100% - 64px);
  flex-direction: column;
  margin: 32px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  border-radius: 4px;
  color: #041022;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
`;

export const DialogTitle = styled(Typography.Title.Two)`
  padding: 2rem;
  font-size: 2.5rem;
  text-align: center;
  font-family: Vroom-Sans, sans-serif;

  @media (max-width: 600px) {
    padding: 1rem;
    font-size: 1.5rem;
  }
`;

export const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
`;

export const DialogText = styled.p`
  margin: 0 0 0.5rem;
`;

export const Link = styled(UILink.Text)`
  :hover {
    text-decoration-color: red;
  }
`;

export const Button = styled(UIButton.Outline)`
  width: 50%;
  font-size: 16px;
  font-family: Calibre, Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  margin: 0 auto 1rem;

  @media (max-width: 600px) {
    width: 80%;
  }
`;
