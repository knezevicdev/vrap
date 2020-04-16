import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import reactStringReplace from 'react-string-replace';

import { ReactComponent as CircleCheckmark } from './svg/circle-checkmark.svg';
import { Option } from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';
import Typography from 'src/ui/Typography';

interface Props {
  option: Option;
}

const ContactOptionView: React.FC<Props> = ({ option }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const variant = mdUp ? 'h2' : 'h3';

  return (
    <Box display="flex" alignItems="center">
      <CircleCheckmark
        style={{
          flex: '0 0 32px',
          marginRight: theme.spacing(2),
        }}
      />
      <Typography fontWeight="fontWeightLight" variant={variant}>
        {reactStringReplace(
          option.text,
          /<link>(.*)<\/link>/,
          (match, index) => (
            <ExternalLink key={index} href={option.href} target={option.target}>
              <Typography
                color="secondary.main"
                component="span"
                fontWeight="fontWeightLight"
                variant={variant}
              >
                {match}
              </Typography>
            </ExternalLink>
          )
        )}
      </Typography>
    </Box>
  );
};

export default ContactOptionView;
