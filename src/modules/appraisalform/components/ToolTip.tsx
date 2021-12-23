import Tippy from '@tippy.js/react';
import styled from 'styled-components';

// For more information, see:
// https://github.com/atomiks/tippy.js-react
// https://atomiks.github.io/tippyjs/getting-started/

const ToolTip = styled(Tippy)`
  width: 100%;
  font-family: Calibre;
  font-size: 13px;
  line-height: 1.23;
  letter-spacing: 0.3px;
  padding: 12px;
  border-radius: 0;
  color: #ffffff;
  background: #041022;
  margin: 5px;

  &[x-placement^='top'] .tippy-arrow {
    border-top-color: #041022;
  }
  &[x-placement^='bottom'] .tippy-arrow {
    border-bottom-color: #041022;
  }
  &[x-placement^='left'] .tippy-arrow {
    border-left-color: #041022;
  }
  &[x-placement^='right'] .tippy-arrow {
    border-right-color: #041022;
  }
`;

ToolTip.displayName = 'ToolTip';

export default ToolTip;
