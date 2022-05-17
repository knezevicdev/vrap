import { Icon, Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';
import { Row } from 'src/styled/grid';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  max-width: 780px;
  padding: 0 24px 30px 24px;
  border: solid 1px #d6d7da;
  margin-bottom: 20px;
  @media (max-width: 1020px) {
    max-width: 100%;
    padding: 30px 24px;
    margin: 0 10px;
  }

  @media (max-width: 720px) {
    margin: 0;
  }
`;

export const Title = styled(Typography.Heading.Three)`
  font-style: italic;
  font-family: Vroom-Sans;
  font-weight: 800;
  padding: 30px 0;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d6d7da;
`;

export const SecurityLogo = styled(Icon)`
  margin-right: 7px;
  height: 100%;
  max-height: unset;
  max-width: unset;
  width: 44px;
`;

export const SecurityMessage = styled.div`
  color: #308406;
  display: flex;
  height: 50px;
  align-items: flex-end;
  font-family: 'Calibre-Regular';
  font-size: 16px;
  line-height: 1.5rem;
`;

export const FormStepWrapper = styled(Row)`
  font-family: 'Calibre-Regular', sans-serif;
  margin-top: 0.625rem;
`;
