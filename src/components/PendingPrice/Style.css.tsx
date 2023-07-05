import { Button, Icon } from '@vroom-web/ui-lib';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 100%;
  text-align: center;
`;

export const StyledBody = styled.div`
  max-width: 410px;
  margin: auto;
`;

export const StyledIcon = styled(Icon)`
  padding: 20px;
`;

export const StyledButton = styled(Button.Primary)`
  margin: 30px 0;
  width: 100%;
  max-width: 300px;
`;
