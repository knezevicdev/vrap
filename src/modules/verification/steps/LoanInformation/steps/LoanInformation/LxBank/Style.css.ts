import { Typography } from '@vroom-web/ui-lib';
import AsyncSelect from 'react-select/async-creatable';
import styled from 'styled-components';

export const Autocomplete = styled(AsyncSelect)`
  .rs__control {
    border: 1px solid #999da3;
    border-radius: 0;
    min-height: 48px;
  }

  .rs__indicator-separator,
  .rs__indicator {
    display: none;
  }

  .rs__menu {
    border: 1px solid #999da3;
    border-radius: 0;
    margin-top: 4px;
  }

  .rs__menu-list {
    padding-top: 0;
    padding-bottom: 0;
  }

  font-size: 18px;
`;

export const Label = styled(Typography.Fine)`
  font-size: 13px;
  letter-spacing: 0.35px;
  margin-bottom: 2px;
  text-overflow: ellipsis;
`;

export const Tooltip = styled.div`
  display: flex;
`;

export const TooltipBold = styled.div`
  padding-left: 10px;
  font-weight: bold;
`;
