import styled from 'styled-components';

import { Row } from '../../../../../styled/grid';

export const Uploader = styled.div`
  button {
    padding: 8px 12px;
    min-height: 40px;
  }

  span {
    font-size: 18px;
  }

  svg {
    max-width: 24px;
    max-height: 24px;
    min-width: 24px;
    min-height: 24px;
  }
`;

export const Wrapper = styled(Row)`
  margin-top: 30px;
`;
