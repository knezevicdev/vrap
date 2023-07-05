import { Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px 0 20px 0;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;
`;

export const Subtitle = styled(Typography.Title.Three)`
  line-height: 26px;
`;

export const SmallSubtitle = styled(Typography.Title.Three)`
  font-size: 17px;
`;

export const Row = styled.div`
  display: flex;
  :not(:last-child) {
    margin-bottom: 32px;
  }
  @media (max-width: 767px) {
    margin-top: 0;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
`;

export const Label = styled(Typography.Fine)`
  font-size: 13px;
  letter-spacing: 0.35px;
  margin-bottom: 2px;
`;

export const Field = styled(Typography.Body.Regular)`
  word-wrap: break-word;
`;

export const Edit = styled(Typography.Body.Regular)`
  margin-left: 5px;
  cursor: pointer;
  font-size: 16px;
  line-height: 22px;
  color: #e7131a;
  padding-top: 4px;
`;
