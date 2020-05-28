import Box from '@material-ui/core/Box';
import React from 'react';

import FooterNavViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';
import InternalLink from 'src/ui/InternalLink';
import Typography from 'src/ui/Typography';

interface FooterNavViewProps {
  viewModel: FooterNavViewModel;
}

const FooterNavView: React.FC<FooterNavViewProps> = ({ viewModel }) => {
  const { title, links } = viewModel;
  return (
    <Box pb={6}>
      <Box pb={4}>
        <Typography variant="body1" fontWeight="fontWeightBold">
          {title}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        {links.map((link, index, array) => {
          const last = index === array.length - 1;
          const { external, href, target, label } = link;
          return (
            <Box key={index} flex="0 1 100%" pb={last ? 0 : 2}>
              {external ? (
                <ExternalLink
                  color="secondary"
                  href={href}
                  target={target}
                  variant="body1"
                >
                  {label}
                </ExternalLink>
              ) : (
                <InternalLink color="secondary" href={href} variant="body1">
                  {label}
                </InternalLink>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default FooterNavView;
