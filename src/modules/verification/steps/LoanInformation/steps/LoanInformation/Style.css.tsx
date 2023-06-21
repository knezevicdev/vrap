import { Icon } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const LabelContainer = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 18px;
`;

export const Label = styled.label`
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0.3px;
  margin-bottom: 10px;
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
