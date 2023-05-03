import { Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(1fr, 3);
  gap: 16px;
  justify-items: center;
  align-items: center;
  text-align: center;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InformationAccent = styled(Typography.Body.Regular)`
  color: #e7131a;
  font-weight: 600;
`;
