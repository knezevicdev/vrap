import { default as MuiButton } from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

import { Theme } from './theme';

const Button = styled(MuiButton)(({ theme }) => ({
  letterSpacing: '1.75px',
  fontWeight: (theme as Theme).typography.fontWeightSemibold,
  [theme.breakpoints.only('xs')]: {
    flexGrow: 1,
  },
  minWidth: '120px',
  minHeight: '48px',
  borderRadius: 0,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
  textTransform: 'uppercase',
}));

export default Button;
