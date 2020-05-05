import { styled } from '@material-ui/core/styles';
import React from 'react';

import ThemeProvider from './ThemeProvider';
import Typography from './Typography';

export default { title: 'Typography' };

const StyledDiv = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const allTypography: React.FC = () => {
  return (
    <ThemeProvider>
      <StyledDiv>
        <Typography>Default</Typography>
        <Typography variant="h1">h1</Typography>
        <Typography variant="h2">h2</Typography>
        <Typography variant="body1">body1</Typography>
        <Typography variant="button">button</Typography>
        <Typography variant="caption">caption</Typography>

        <Typography fontStyle="italic">italic</Typography>

        <Typography fontWeight="fontWeightBold">bold font weight</Typography>
        <Typography fontWeight="fontWeightSemibold">
          semibold font weight
        </Typography>
        <Typography fontWeight="fontWeightMedium">
          medium font weight
        </Typography>
        <Typography fontWeight="fontWeightRegular">
          regular font weight (default)
        </Typography>
        <Typography fontWeight="fontWeightLight">light font weight</Typography>

        <Typography color="primary.main">primary theme color</Typography>
        <Typography color="secondary.main">secondary theme color</Typography>
        <Typography color="grey.500">grey.500 theme color</Typography>
        <Typography color="grey.A100">grey.A100 theme color</Typography>
        <Typography color="text.primary">
          text.primary theme color (default)
        </Typography>
        <Typography color="text.secondary">
          text.secondary theme color
        </Typography>

        <Typography letterSpacing="12px">custom letter spacing</Typography>

        <Typography lineHeight="50px">custom line height</Typography>

        <Typography textAlign="center">custom text align</Typography>
      </StyledDiv>
    </ThemeProvider>
  );
};
