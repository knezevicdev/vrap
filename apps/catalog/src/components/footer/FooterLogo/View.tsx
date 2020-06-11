import Box from '@material-ui/core/Box';
import React from 'react';

import FooterLogoViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

interface FooterLogoViewProps {
  viewModel: FooterLogoViewModel;
}

const FooterNavView: React.FC<FooterLogoViewProps> = ({ viewModel }) => {
  const { title, links } = viewModel;
  return (
    <Box pb={6}>
      <Box pb={4}>
        <Typography variant="body1" fontWeight="fontWeightBold">
          {title}
        </Typography>
      </Box>
      {links.map((link, index, array) => {
        const { Icon, height, text, href } = link;
        const last = index === array.length - 1;
        return (
          <Box
            display="flex"
            flexDirection="column"
            key={index}
            pb={last ? 0 : 5}
          >
            <Box flex="0 1 100%">
              <a href={href}>
                <Icon height={`${height}px`} />
              </a>
            </Box>
            <Box flex="0 1 100%" width="232px">
              <Typography variant="overline" fontWeight="fontWeightLight">
                {text}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default FooterNavView;
