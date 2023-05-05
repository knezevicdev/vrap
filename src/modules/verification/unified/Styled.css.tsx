import {
  addStyleForMobile,
  addStyleForTablet,
  Typography,
} from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const SectionTitle = styled(Typography.Title.Three)`
  text-align: left;
  margin: 20px 0;
  font-size: 16px;
`;

export const Row = styled.div`
  display: flex;
  margin-top: 15px;
  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const FullInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled(Typography.Fine)`
  font-size: 13px;
  letter-spacing: 0.35px;
`;

export const Field = styled(Typography.Body.Regular)`
  word-wrap: break-word;
`;

export const StepperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 74px;
  z-index: 5;

  @media (max-width: 959px) {
    margin-bottom: 20px;
    top: 52px;
  }
`;

export const StepperContainer = styled.div`
  font-family: 'Calibre-Regular', sans-serif;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  max-width: 780px;
  padding: 20px 24px;
  border: solid 1px #d6d7da;
  margin-bottom: 20px;
  height: max-content;
  overflow: hidden;

  @media (max-width: 1020px) {
    margin: 0 10px;
  }

  @media (max-width: 720px) {
    margin: 0;
  }
`;

export const ModuleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${addStyleForTablet(`
    flex-direction: column-reverse;
    align-items: center;
  `)}

  ${addStyleForMobile(`
    flex-direction: column-reverse;
    align-items: center;
  `)}
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
`;

export const DialogTitle = styled(Typography.Heading.Three)`
  margin-bottom: 20px;
`;

export const DialogText = styled(Typography.Body.Regular)`
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;
