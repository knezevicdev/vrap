import { default as MuiButton } from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const Button = styled(MuiButton)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
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
}));

export default Button;
