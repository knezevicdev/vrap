import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { ReactComponent as ThumbsUpIcon } from './svg/thumbs-up.svg';
import ViewModel from './ViewModel';

import InternalLink from 'src/ui/InternalLink';
import Typography from 'src/ui/Typography';

const StyledInternalLink = styled(InternalLink)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
}));

interface Props {
  viewModel: ViewModel;
}

const SuccessView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Box
      bgcolor="background.paper"
      border={1}
      borderColor="grey.A100"
      p={{ xs: 2, md: 4 }}
    >
      <Box
        border={1}
        borderTop={0}
        borderLeft={0}
        borderRight={0}
        borderColor="grey.A100"
        pb={{ xs: 2, md: 5 }}
        mb={{ xs: 2, md: 3 }}
        display="flex"
        alignItems="center"
      >
        <Box mr={2}>
          <SvgIcon
            component={ThumbsUpIcon}
            style={{ fontSize: 40 }}
            viewBox="0 0 32 32"
          />
        </Box>
        <Typography fontWeight="fontWeightMedium" variant="h2">
          {viewModel.title}
        </Typography>
      </Box>
      <Box mb={{ xs: 2, md: 3 }}>
        <Typography fontWeight="fontWeightLight" lineHeight="1.25" variant="h2">
          {viewModel.description}
        </Typography>
      </Box>
      <Box mb={{ xs: 2, md: 3 }}>
        <Typography
          fontWeight="fontWeightLight"
          lineHeight="1.5"
          variant="body1"
        >
          {viewModel.explaination}
        </Typography>
      </Box>
      <StyledInternalLink
        color="secondary"
        href={viewModel.link.href}
        variant="button"
      >
        {viewModel.link.label}
      </StyledInternalLink>
    </Box>
  );
};

export default SuccessView;
