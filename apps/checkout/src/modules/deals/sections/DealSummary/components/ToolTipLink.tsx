import { Link } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import { dealSummaryAnalyticsHandler } from 'src/integrations/dealSummary/DealSummaryAnalyticsHandler';

interface Props {
  href: string;
  label: string;
}

const StyledLink = styled(Link)`
  font-size: inherit;
  line-height: inherit;
  color: #fff;
`;

const ToolTipLink = ({ href, label }: Props): JSX.Element => {
  const handleClick = (): void => {
    dealSummaryAnalyticsHandler.trackDealSummaryToolTipsLinkClicked(label);
  };

  return (
    <>
      For more details,{' '}
      <StyledLink href={href} onClick={handleClick}>
        Check here.
      </StyledLink>
    </>
  );
};

export default ToolTipLink;
