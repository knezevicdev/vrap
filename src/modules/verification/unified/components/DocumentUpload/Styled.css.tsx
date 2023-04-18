import { Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const UploaderButton = styled.button`
  padding: 8px 12px;
  min-height: 40px;
  display: flex;
  width: 100%;
  max-width: 416px;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  box-shadow: 0 4px 24px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
`;

export const UploaderButtonText = styled.span`
  font-family: Calibre, sans-serif;
  font-weight: 600;
  letter-spacing: 0.25px;
  color: #041022;
  line-height: 32px;
  font-size: 18px;
`;

export const DialogContent = styled.div`
  max-width: 368px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled(Typography.Title.Three)``;
export const Subtitle = styled(Typography.Body.Regular)``;

export const ExamplePhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-top: 24px;
`;

export const UploadFeedback = styled.div`
  visibility: visible;
  min-height: 48px;
  color: #f26900;
  margin: 18px 0;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.25px;
  font-family: Calibre, sans-serif;
  font-weight: normal;
`;

export const UploadButton = styled.label`
  width: 100%;
  letter-spacing: 1.25px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  background: #e7131a;
  min-height: 48px;
  max-height: 48px;
  padding: 0 32px;
  border: none;
  cursor: pointer;
  font-family: Calibre, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FileUpload = styled.input`
  display: none;
`;
