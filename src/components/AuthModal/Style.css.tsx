import { addStyleForMobile, Body, Button, Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

import { ThemeProps } from '../../core/themes/Vroom';

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const secondaryError = (props: { theme: ThemeProps }): string =>
  props.theme.colors.secondary.error;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  padding: 30px;
  overflow-y: auto;

  ${addStyleForMobile(`
    padding: 0;
  `)}
`;

export const OverlayInner = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  min-height: 100%;
  align-items: center;
`;

export const Modal = styled.div`
  background-color: white;
  z-index: 11;
  padding: 40px;
  width: 420px;
  max-width: 100%;

  ${addStyleForMobile(`
    padding: 16px;
    min-height: 100vh;
  `)}
`;

export const Form = styled.form`
  & > *:not(:first-child) {
    margin-top: 16px;
  }
`;

export const ModalTitle = styled(Typography.Title.Two)`
  font-size: 2.5rem;
  text-align: center;
  font-family: Vroom-Sans, sans-serif;
  display: block;

  @media (max-width: 600px) {
    padding: 1rem;
    font-size: 1.5rem;
  }
`;

export const PrimaryButton = styled(Button.Primary)`
  width: 100%;
`;

export const Divider = styled.hr`
  height: 1px;
  border-width: 0;
  background-color: rgb(214, 215, 218);
  margin: 26px 0;
  overflow: visible;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;

  &::after {
    content: 'or';
    font-family: Calibre, sans-serif;
    padding: 0 16px;
    background-color: rgb(255, 255, 255);
    color: rgb(153, 157, 163);
  }
`;

export const SecondaryButton = styled(Button.Secondary)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 5px;
`;

export const LegalContent = styled(Typography.Body.Small)`
  text-align: start;
  margin-top: 16px;
  display: block;
`;

export const LegalList = styled.ul`
  padding: 0;
  margin-left: 1em;
  color: rgb(108, 113, 122);
`;

export const LegalListItem = styled.li`
  margin: 10px 0;
`;

export const Link = styled.a`
  font-size: inherit;
  color: rgb(231, 19, 26);
  text-decoration: none;
`;

export const LinkSecondary = styled.a`
  font-size: inherit;
  text-decoration: underline;
  width: fit-content;
  color: rgb(153, 157, 163);
  cursor: pointer;
  display: inline-block;
  font-family: Calibre, sans-serif;

  &:hover {
    color: rgb(231, 19, 26);
  }
`;

export const ButtonLink = styled.button`
  font-size: inherit;
  color: rgb(231, 19, 26);
  text-decoration: none;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const FooterContent = styled(Typography.Body.Small)`
  text-align: center;
  margin-top: 8px;
  margin-bottom: 0;
  display: block;
`;

export const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;

  ${addStyleForMobile(`
    display: block;
    
    & > *:not(:first-child) {
      margin-top: 16px;
    }
  `)}
`;

export const ErrorWrapper = styled.span`
  display: flex;
  text-align: center;
  background-color: ${secondaryError};
  padding: 8px;
  justify-content: center;

  margin-bottom: 16px;
`;

export const ErrorMessage = styled(Body.Regular)`
  color: ${primaryWhite} !important;
  padding: 8px 16px;
`;
