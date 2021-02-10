import { Link } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

interface Props {
  href: string;
}

const StyledLink = styled(Link)`
  font-size: inherit;
  line-height: inherit;
  color: #fff;
`;

const ToolTipLink = ({ href }: Props): JSX.Element => {
  return (
    <>
      For more details, <StyledLink href={href}>Check here.</StyledLink>
    </>
  );
};

export default ToolTipLink;
