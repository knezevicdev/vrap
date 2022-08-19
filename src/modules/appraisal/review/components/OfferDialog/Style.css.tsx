import { Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  z-index: 97;
`;

export const DialogContainer = styled.div`
  font-family: Calibre, serif;
  display: flex;
  flex-direction: column;
  background: #fff;
  z-index: 1;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
  width: 580px;

  b {
    font-weight: 600;
  }

  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
  }
`;

export const DialogTitle = styled(Typography.Heading.Three)<{
  hasValidPrice?: boolean;
}>`
  text-transform: lowercase;
  font-family: 'Vroom-Sans', cursive;
  padding: 25px 141px 0px;
  text-align: center;

  ${({ hasValidPrice }) =>
    !hasValidPrice &&
    `
    padding: 30px 100px 0px;
  `}

  @media (max-width: 600px) {
    padding: 25px 0px 0px 0px;
  }
`;

export const Content = styled.div<{
  freeForm?: boolean;
}>`
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  margin: 5px 50px;
  width: 480px;
  height: 78px;
  text-align: center;

  ul {
    margin-top: 0;
    margin-bottom: 40px;
    padding: 0;
  }

  ${({ freeForm }) =>
    freeForm &&
    `
    text-align: left;
    height: unset;
    
    b {
      text-align: center;
      display: block;
    }
  `}

  @media (max-width: 600px) {
    width: 300px;
    height: unset;
    margin: 5px auto 10px;
  }
`;

export const AcceptButton = styled.button<{
  hasValidPrice?: boolean;
}>`
  border: 0;
  display: inline-flex;
  cursor: pointer;
  min-height: 45px;
  height: 45px;
  padding: 0 18px;
  white-space: nowrap;
  font-family: Calibre-Semibold, serif;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 1.75px;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  transition: color 0.1s, background-color 0.1s;
  color: #ffffff !important;
  background-color: #e7131a;
  margin: 0px 100px;
  width: 380px;

  ${({ hasValidPrice }) =>
    !hasValidPrice &&
    `
    margin-bottom: 40px;
  `}

  @media (max-width: 600px) {
    width: 300px;
    margin: 0px auto;
  }
`;

export const Price = styled(Typography.Heading.One)`
  font-family: Calibre-Semibold, serif;
  margin-bottom: 20px;
  text-align: center;
`;

export const Cancel = styled.div`
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  color: ${(props) => props.theme.colors.primary.brand};
  cursor: pointer;
  text-align: center;
  margin: 20px 0px 20px 0px;
`;

export const LegalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Legal = styled.div`
  text-align: center;
  font-size: 10px;
  line-height: 12px;
  width: 100%;
  max-width: 340px;
  margin-bottom: 32px;
`;
