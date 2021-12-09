import styled from 'styled-components';
import Tippy from '@tippy.js/react';

// For more information, see:
// https://github.com/atomiks/tippy.js-react
// https://atomiks.github.io/tippyjs/getting-started/

const ToolTip = styled(Tippy)`
  width: 100%;
  font-family: ${props => props.theme.fonts.regular};
  font-size: 13px;
  line-height: 1.23;
  letter-spacing: 0.3px;
  padding: 12px;
  border-radius: 0;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.dark};
  margin: 5px;

  &[x-placement^='top'] .tippy-arrow {
    border-top-color: ${props => props.theme.colors.dark};
  }
  &[x-placement^='bottom'] .tippy-arrow {
    border-bottom-color: ${props => props.theme.colors.dark};
  }
  &[x-placement^='left'] .tippy-arrow {
    border-left-color: ${props => props.theme.colors.dark};
  }
  &[x-placement^='right'] .tippy-arrow {
    border-right-color: ${props => props.theme.colors.dark};
  }
`;

ToolTip.displayName = 'ToolTip';

export default ToolTip;
