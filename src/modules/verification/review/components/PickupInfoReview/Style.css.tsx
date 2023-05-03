import { Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 0 30px 0;
`;

export const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 26px;
`;

export const Subtitle = styled(Typography.Title.Three)`
  line-height: 26px;
`;

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
  width: 50%;
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

export const LinkWrap = styled.span`
  margin-left: 5px;
`;
