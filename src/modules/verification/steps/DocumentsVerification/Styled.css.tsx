import { Button, Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const DocUploadDesc = styled.p`
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  margin: 0 0 20px;
`;

export const FilesInfo = styled.p`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.25px;
  margin: 0;
`;

export const FilesInfoTitle = styled(FilesInfo)`
  margin-bottom: 5px;
`;

export const Container = styled.div``;

export const Row = styled.div`
  display: flex;
  margin-top: 15px;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

export const Label = styled(Typography.Fine)`
  font-size: 13px;
  letter-spacing: 0.35px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  > :first-child {
    margin-right: 10px;
  }
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const Field = styled(Typography.Body.Regular)`
  word-wrap: break-word;
`;

export const IconWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled(Button.Primary)`
  margin-top: 32px;
  :disabled {
    color: #ffffff;
  }
  @media (max-width: 1020px) {
    margin-top: 20px;
    width: 100%;
  }
`;

export const Bold = styled.span`
  font-family: 'Calibre-SemiBold';
`;

export const Paragraph = styled.p`
  margin: 0;
`;
