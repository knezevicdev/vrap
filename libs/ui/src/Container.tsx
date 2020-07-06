import MuiContainer from '@material-ui/core/Container';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import React from 'react';

interface Props {
  className?: string;
  disableDefaultPadding?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const StyledMuiContainer = styled(MuiContainer)(({ theme }) => ({
  '&.default-padding-top-and-bottom': {
    [theme.breakpoints.between('xs', 'md')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
  },
}));

const Container: React.FC<Props> = ({
  className,
  children,
  disableDefaultPadding,
  maxWidth,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  let defaultMaxWidth: 'sm' | 'lg' | undefined;
  if (smDown) {
    defaultMaxWidth = 'sm';
  } else if (mdUp) {
    defaultMaxWidth = 'lg';
  }

  return (
    <StyledMuiContainer
      className={clsx(
        {
          'default-padding-top-and-bottom': !disableDefaultPadding,
        },
        className
      )}
      disableGutters={disableDefaultPadding}
      maxWidth={maxWidth ? maxWidth : defaultMaxWidth}
    >
      {children}
    </StyledMuiContainer>
  );
};

export default Container;
