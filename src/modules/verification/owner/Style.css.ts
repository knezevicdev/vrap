import { Icon } from '@vroom-web/ui-lib';
import styled from 'styled-components';

import { Row } from 'src/styled/grid';

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
