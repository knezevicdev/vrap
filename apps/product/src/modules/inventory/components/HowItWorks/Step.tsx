import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@vroom-web/ui';
import React from 'react';

interface StepProps {
  description: string;
  title: string;
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconViewBox: string;
}

const Step: React.FC<StepProps> = ({
  description,
  title,
  IconComponent,
  iconViewBox,
}) => {
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box display="flex" color="secondary.contrastText">
      <SvgIcon
        component={IconComponent}
        viewBox={iconViewBox}
        style={{ fontSize: mdAndUp ? 72 : 52 }}
      />
      <Box ml={2} textAlign="left">
        <Box mt={{ xs: 1 }} mb={{ xs: 1 }}>
          <Typography fontWeight="fontWeightMedium" variant="body1">
            {title}
          </Typography>
        </Box>
        <Typography
          fontWeight="fontWeightLight"
          lineHeight="1.5"
          variant="body1"
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default Step;
